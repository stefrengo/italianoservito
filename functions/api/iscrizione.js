// Cloudflare Pages Function — riceve i dati dal form della landing,
// li scrive su Supabase, poi manda le due email tramite Resend.
//
// Variabili d'ambiente richieste (da impostare nel pannello Cloudflare Pages,
// Settings → Environment variables — MAI scritte qui nel codice):
//   SUPABASE_URL
//   SUPABASE_SERVICE_ROLE_KEY   (chiave "service role", non quella pubblica: qui siamo lato server)
//   RESEND_API_KEY
//   GIADA_NOTIFICATION_EMAIL    (l'indirizzo dove Giada vuole ricevere le notifiche)

export async function onRequestPost({ request, env }) {
  try {
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

    // 2) Email di conferma alla persona iscritta (testo personalizzabile qui sotto)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: "L'Italiano è Servito <giada@italianoservito.it>", // da verificare/configurare su Resend
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

    // 3) Notifica a Giada
    await fetch('https://api.resend.com/emails', {
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

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Errore imprevisto:', err);
    return new Response(JSON.stringify({ error: 'Errore imprevisto.' }), { status: 500 });
  }
}
