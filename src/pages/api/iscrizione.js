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

    // TEMPORANEO: log diagnostico per capire perché Resend rifiuta la chiave
    // (stampa solo lunghezza + primi/ultimi caratteri, mai il valore intero).
    // Da rimuovere una volta risolto.
    {
      const k = env.RESEND_API_KEY || '';
      console.log(
        `Debug RESEND_API_KEY — presente: ${!!k}, lunghezza: ${k.length}, inizio: ${k.slice(0, 8)}, fine: ${k.slice(-4)}`
      );
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
        html: `
          <p>Ciao ${nome},</p>
          <p>ho ricevuto la tua iscrizione al corso <strong>${percorso}</strong> — il tuo posto è prenotato.</p>
          ${clubDelLibro ? '<p>Hai chiesto di abbinare anche il <strong>Club del Libro</strong>: ti confermo prezzo e dettagli del bundle insieme al resto.</p>' : ''}
          ${messaggio ? `<p>Ho letto quello che mi hai scritto: <em>"${messaggio}"</em> — ne terrò conto quando ti risponderò.</p>` : ''}
          <p>Ti scrivo personalmente entro 24-48 ore, anche su WhatsApp al numero che mi hai lasciato, per confermarti tutti i dettagli e i prossimi passi.</p>
          <p>A presto,<br>Giada</p>
        `,
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
        subject: `Nuova richiesta: ${nome} — ${percorso}${clubDelLibro ? ' + Club del Libro' : ''}`,
        html: `
          <p>Nuova iscrizione (fonte: ${fonte}):</p>
          <ul>
            <li><strong>Nome:</strong> ${nome}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Telefono:</strong> ${telefono}</li>
            <li><strong>Percorso:</strong> ${percorso}</li>
            <li><strong>Bundle Club del Libro:</strong> ${clubDelLibro ? 'Sì' : 'No'}</li>
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

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Errore imprevisto:', err && err.stack ? err.stack : err);
    return new Response(JSON.stringify({ error: 'Errore imprevisto.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
