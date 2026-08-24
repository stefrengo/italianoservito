// Endpoint Astro (route: /api/iscrizione) — riceve i dati dal form (landing,
// pagine percorso, contatti), li scrive su Supabase, poi manda le due email
// tramite Resend.
//
// Nota tecnica: il progetto è deployato come Cloudflare Worker (via Workers
// Builds, adapter @astrojs/cloudflare) e NON come Cloudflare Pages classiche
// — quindi le variabili d'ambiente/secret non arrivano tramite un secondo
// argomento "env" come nelle Pages Functions, ma tramite locals.runtime.env,
// secondo la convenzione dell'adapter Cloudflare per Astro.
//
// Variabili d'ambiente richieste (impostate nel pannello Cloudflare del
// progetto Worker, Settings → Variables and Secrets — MAI scritte qui):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   (chiave "service role"/"secret", non quella pubblica: qui siamo lato server)
//   RESEND_API_KEY
//   GIADA_NOTIFICATION_EMAIL    (l'indirizzo dove Giada vuole ricevere le notifiche)

export const prerender = false;

// Involucro grafico per le mail inviate alla persona iscritta: header con
// logo su sfondo verde, corpo bianco, footer con i contatti. Usa solo
// tecniche compatibili con i client email più diffusi (tabelle, stili
// inline, niente CSS esterno/@import) e i colori del sito (vedi
// src/styles/global.css). Il logo è caricato dall'URL pubblico del sito:
// funziona una volta che il sito è online su quel dominio.
function mailConfermaHtml(corpo) {
  return `<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body style="margin:0; padding:0; background-color:#FAF6EF;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6EF; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px; background-color:#ffffff; border-radius:12px; overflow:hidden; border:1px solid #E1D5B8;">
            <tr>
              <td align="center" style="background-color:#2F6B4F; padding:28px 24px;">
                <img src="https://www.italianoservito.it/logo.png" alt="L'Italiano è Servito" width="56" height="56" style="display:block; border-radius:50%; background-color:#ffffff;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px 28px; font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#2B241E; font-size:15px; line-height:1.65;">
                ${corpo}
              </td>
            </tr>
            <tr>
              <td align="center" style="padding:20px 28px; background-color:#F1E9D8; font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; font-size:12px; color:#5A5044;">
                L'Italiano è Servito · Giada Longo<br>
                <a href="https://www.italianoservito.it" style="color:#A63A32; text-decoration:none;">italianoservito.it</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function POST({ request, locals }) {
  try {
    const env = locals?.runtime?.env;
    if (!env) {
      throw new Error(
        `locals.runtime.env non disponibile (locals: ${locals ? Object.keys(locals).join(',') : 'undefined'}; runtime: ${locals?.runtime ? Object.keys(locals.runtime).join(',') : 'undefined'})`
      );
    }
    const data = await request.formData();
    const nome = data.get('nome')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const telefono = data.get('telefono')?.toString().trim() || '';
    const percorso = data.get('percorso')?.toString() || 'non specificato';
    const clubDelLibro = data.get('club_del_libro') === 'si';
    const teERiviste = data.get('te_e_riviste') === 'si';
    const newsletter = data.get('newsletter') === 'si';
    const privacyAccettata = data.get('privacy') === 'on';
    // Solo dal form di /contatti (non presenti nella landing/percorsi):
    const livello = data.get('livello')?.toString().trim() || '';
    const obiettivo = data.get('obiettivo')?.toString().trim() || '';
    // Messaggio libero: sempre presente in /contatti, condizionale nella landing
    // e nelle pagine percorso (si apre solo scegliendo "non ho ancora deciso").
    const messaggio = data.get('messaggio')?.toString().trim() || '';
    // Da quale pagina arriva il lead: ogni form manda un campo nascosto "fonte"
    // (landing-ads, percorso:<slug>, contatti) — vedi SignupForm.astro e contatti.astro.
    const fonte = data.get('fonte')?.toString().trim() || 'sconosciuta';

    if (!nome || !email || !telefono) {
      return new Response(JSON.stringify({ error: 'Nome, email e telefono sono obbligatori.' }), { status: 400 });
    }
    if (!privacyAccettata) {
      return new Response(JSON.stringify({ error: 'Devi accettare la Privacy Policy per iscriverti.' }), { status: 400 });
    }

    // 1) Scrittura su Supabase (tabella "leads")
    const supabaseRes = await fetch(`${env.SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: env.SUPABASE_SERVICE_ROLE_KEY,
        Authorization: `Bearer ${env.SUPABASE_SERVICE_ROLE_KEY}`,
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        nome,
        email,
        telefono,
        percorso,
        club_del_libro: clubDelLibro,
        te_e_riviste: teERiviste,
        fonte,
        newsletter,
        privacy_accettata: privacyAccettata,
        livello,
        obiettivo,
        messaggio,
      }),
    });

    if (!supabaseRes.ok) {
      const errText = await supabaseRes.text();
      console.error('Errore Supabase:', errText);
      return new Response(JSON.stringify({ error: 'Errore nel salvataggio dei dati.' }), { status: 500 });
    }

    // 2) Email di conferma alla persona iscritta (testo personalizzabile qui sotto)
    const emailConfermaRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "L'Italiano è Servito <giada@italianoservito.it>",
        to: email,
        subject: 'Il tuo posto è prenotato! 🇮🇹',
        html: mailConfermaHtml(`
          <p style="margin:0 0 18px; font-family: Georgia, 'Times New Roman', serif; font-size:21px; font-weight:600; color:#2F6B4F;">Ciao ${nome},</p>
          <p style="margin:0 0 14px;">ho ricevuto la tua iscrizione al corso <strong>${percorso}</strong>: il tuo posto è prenotato.</p>
          ${clubDelLibro ? '<p style="margin:0 0 14px;">Hai chiesto di abbinare anche il <strong>Club del Libro</strong>: ti confermo prezzo e dettagli del bundle insieme al resto.</p>' : ''}
          ${teERiviste ? '<p style="margin:0 0 14px;">Hai chiesto di abbinare anche <strong>Tè e Riviste</strong>: ti confermo prezzo e dettagli del bundle insieme al resto.</p>' : ''}
          ${messaggio ? `<p style="margin:0 0 14px;">Ho letto quello che mi hai scritto: <em>"${messaggio}"</em>, ne terrò conto quando ti risponderò.</p>` : ''}
          <p style="margin:0 0 14px;">Un'ultima cosa importante: per bloccare effettivamente il posto ti chiederò una piccola caparra di 100 PLN, che verrà poi scalata dal costo totale del corso. È una scelta nata da un'esperienza concreta dei semestri scorsi, in cui alcuni posti restavano bloccati da persone che poi non si presentavano più, togliendo spazio a chi invece lo desiderava davvero. I gruppi sono piccoli e i posti sono pochi, quindi preferisco che restino a chi è pronto a cominciare: ti spiegherò personalmente come versarla quando ci sentiamo.</p>
          <p style="margin:0 0 14px;">Ti scrivo personalmente entro 24-48 ore, anche su WhatsApp al numero che mi hai lasciato, per confermarti tutti i dettagli e i prossimi passi.</p>
          <p style="margin:24px 0 0; font-family: Georgia, 'Times New Roman', serif; font-size:16px; color:#A63A32;">A presto,<br>Giada</p>
        `),
      }),
    });
    if (!emailConfermaRes.ok) {
      console.error('Errore Resend (email conferma):', emailConfermaRes.status, await emailConfermaRes.text());
    }

    // 3) Notifica a Giada
    const emailNotificaRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Sito L\'Italiano è Servito <notifiche@italianoservito.it>',
        to: env.GIADA_NOTIFICATION_EMAIL,
        subject: `Nuova richiesta: ${nome} · ${percorso}${clubDelLibro ? ' + Club del Libro' : ''}${teERiviste ? ' + Tè e Riviste' : ''}`,
        html: `
          <p>Nuova iscrizione (fonte: ${fonte}):</p>
          <ul>
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telefono:</strong> ${telefono}</li>
            <li><strong>Percorso:</strong> ${percorso}</li>
            <li><strong>Bundle Club del Libro:</strong> ${clubDelLibro ? 'Sì' : 'No'}</li>
            <li><strong>Bundle Tè e Riviste:</strong> ${teERiviste ? 'Sì' : 'No'}</li>
            ${livello ? `<li><strong>Livello attuale:</strong> ${livello}</li>` : ''}
            ${obiettivo ? `<li><strong>Obiettivo:</strong> ${obiettivo}</li>` : ''}
            ${messaggio ? `<li><strong>Messaggio:</strong> ${messaggio}</li>` : ''}
          </ul>
        `,
      }),
    });
    if (!emailNotificaRes.ok) {
      console.error('Errore Resend (email notifica):', emailNotificaRes.status, await emailNotificaRes.text());
    }

    // Il form è un POST nativo (non fetch via JS), quindi qui reindirizziamo
    // il browser alla pagina di ringraziamento invece di restituire JSON
    // grezzo. 303 = "See Other": il browser rifà una GET verso /grazie
    // invece di ripetere la POST (comportamento corretto dopo un form submit).
    return Response.redirect(new URL('/grazie', request.url), 303);
  } catch (err) {
    console.error('Errore imprevisto:', err && err.stack ? err.stack : err);
    return new Response(JSON.stringify({ error: 'Errore imprevisto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
