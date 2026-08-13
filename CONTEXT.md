# Contesto progetto — L'Italiano è Servito

> Leggimi prima di iniziare qualsiasi lavoro su questa cartella. Riassume tutte le decisioni prese in una lunga sessione di progettazione con Claude su claude.ai, così non serve rispiegare da capo.

## Chi è il cliente
Sito web per "L'Italiano è Servito", scuola di italiano online di Giada Longo (insegnante certificata, ex 7 anni a Cracovia, 6 anni all'Istituto Italiano di Cultura). Target: prevalentemente persone polacche innamorate dell'Italia. Stefano (chi legge questo file) è lo sviluppatore/consulente che segue il progetto per conto di Giada.

## Stack tecnico (deciso, non negoziabile senza motivo forte)
- **Framework**: Astro (output statico)
- **Hosting**: Cloudflare Pages (NON Vercel — piano gratuito Vercel vieta uso commerciale; NON Netlify — modello a crediti troppo rigido per traffico a raffica da ads; Cloudflare Pages ha banda illimitata gratis anche per siti commerciali)
- **Backend/DB**: Supabase, usato SOLO per i lead dei form (tabella `leads`, schema in `supabase/schema.sql`) — non per contenuti/CMS
- **Email transazionali**: Resend, tramite `functions/api/iscrizione.js` (Cloudflare Pages Function) — invia conferma alla persona iscritta + notifica a Giada
- **Niente WordPress, niente Divi, niente Polylang** — multilingua IT/PL/EN gestita nativamente da Astro (i18n configurato in `astro.config.mjs`, ma i contenuti PL/EN non sono ancora scritti)
- **Perché niente CMS headless**: il sito si aggiorna ~2 volte l'anno, un CMS sarebbe complessità non necessaria

## Design system (blindato, non cambiare senza motivo)
- **Font**: Piazzolla (titoli/serif), Sora (testo/sans), Caveat (accenti a mano) — variabili CSS in `src/styles/global.css`
- **Palette**: parchment/crema caldo, verde foresta, rosso mattone, oro/ocra. **Il rosso è riservato SOLO alle CTA** (principio UX deliberato: un solo colore-azione, per non disperdere l'attenzione — non usarlo su badge/decorazioni)
- **Elemento firma**: il "francobollo conviviale" — tag tricolore ruotato ispirato a una cartolina dall'Italia, classe `.stamp`
- **Foto**: bordi "strappati" (clip-path, classi `.torn-top`/`.torn-bottom`), crop con priorità al volto (`object-position: center 15%`)
- **Metafora dei percorsi**: i corsi sono presentati come portate di un pasto — Antipasto (Base/A1), Primo (Intermedio/A2-B1), Secondo (Avanzato/B1-B2), Dolce (Club del Libro e club tematici, NON un livello)
- **Animazioni**: reveal-on-scroll via IntersectionObserver (classe `.reveal`, script in `MainLayout.astro`), rispettano `prefers-reduced-motion`
- **Linguaggio neutro**: evitare forme tipo "persa/o" — riformulare per evitare l'accordo di genere (es. "senza mai perderti" invece di "senza sentirti persa/o")

## Architettura del sito
- **Menu**: Home · Chi Sono · I Percorsi (dropdown: 3 corsi + Club del Libro) · Approfondimenti · Contatti, più una voce evidenziata a bottone che punta a `/landing-ads` (oggi "Corsi I semestre 2026/27" — da aggiornare ogni campagna)
- **`/landing-ads`**: pagina FUORI dal menu, punto di atterraggio per le sponsorizzate social. Molto ispirata a una pagina reale del vecchio sito (italianoservito.it/corsi-di-italiano-estate-2026...). Contiene ancora placeholder tra `[parentesi quadre]` per date/orari/prezzi del prossimo semestre — vanno riempiti con i dati veri di Giada prima del lancio
- **Approfondimenti**: in stile "news" (categorie, tag, card), NON un blog attivo — 9 articoli evergreen pensati, i testi completi sono nel documento Word consegnato a Giada, non ancora nel sito

## Cosa manca prima del lancio (in ordine di priorità)
1. Dati veri della landing ads (prezzi, orari, date, scadenza iscrizioni — oggi placeholder)
2. Collegare davvero Supabase + Resend (creare progetto Supabase, eseguire `supabase/schema.sql`, configurare dominio su Resend, impostare le variabili d'ambiente su Cloudflare Pages — dettagli in `README.md`)
3. Foto reali mancanti (segnaposto testurizzati ancora presenti in alcune sezioni, es. "tavola imbandita")
4. Testi completi dei 9 articoli di Approfondimenti (già scritti nel Word doc consegnato a Giada, da trasferire nel sito)
5. Traduzioni PL/EN
6. Revisione di Giada sui testi (le è stato consegnato un .docx separato con tutti i contenuti)
7. Deploy vero su Cloudflare Pages + collegamento dominio

## Cose esplicitamente scartate (per non riproporle)
- WordPress/Divi — abbandonato in favore di Astro
- Vercel — problema di licenza commerciale sul piano gratuito
- Netlify — modello a crediti rischioso per traffico a raffica da ads
- Un CMS headless (Decap/Sanity/Contentful) — inutile per 2 aggiornamenti/anno
- Dashboard/area riservata/login — idea futura (membership a pagamento), ESPLICITAMENTE rimandata: non costruire login/dashboard finché non c'è un bisogno reale confermato
