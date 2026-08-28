# Contesto progetto — L'Italiano è Servito

> Leggimi prima di iniziare qualsiasi lavoro su questa cartella. Riassume tutte le decisioni prese in una lunga sessione di progettazione con Claude su claude.ai, così non serve rispiegare da capo.

## Chi è il cliente
Sito web per "L'Italiano è Servito", scuola di italiano online di Giada Longo (insegnante certificata, ex 7 anni a Cracovia, 6 anni all'Istituto Italiano di Cultura). Target: prevalentemente persone polacche innamorate dell'Italia. Stefano (chi legge questo file) è lo sviluppatore/consulente che segue il progetto per conto di Giada.

## Stack tecnico (deciso, non negoziabile senza motivo forte)
- **Framework**: Astro, output `hybrid` — pagine statiche per default, solo `/api/iscrizione` è on-demand (`export const prerender = false`)
- **Hosting**: Cloudflare, come **Worker** (via Workers Builds, Git integration su questo repo), adapter `@astrojs/cloudflare` — NON Cloudflare Pages classiche: il progetto compare in Cloudflare come "Worker" (dominio `*.workers.dev` di default), e la convenzione `functions/` delle Pages Functions NON viene letta da questo tipo di deploy. Le route dinamiche vanno scritte come endpoint Astro in `src/pages/api/*.js`. (NON Vercel — piano gratuito Vercel vieta uso commerciale; NON Netlify — modello a crediti troppo rigido per traffico a raffica da ads)
- **Backend/DB**: Supabase, usato SOLO per i lead dei form (tabella `leads`, schema in `supabase/schema.sql`) — non per contenuti/CMS
- **Email transazionali**: Resend, tramite `src/pages/api/iscrizione.js` (endpoint Astro on-demand, non una Cloudflare Pages Function) — invia conferma alla persona iscritta + notifica a Giada. Le variabili d'ambiente/secret si leggono da `locals.runtime.env` (convenzione dell'adapter Cloudflare per Astro), impostate nel pannello Cloudflare del Worker → Settings → Variables and Secrets
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
- **Menu**: Home · Chi Sono · I Percorsi (dropdown: 3 corsi + Club del Libro) · FAQ · Contatti, più una voce evidenziata a bottone che punta a `/offerta-formativa` (oggi "Corsi I semestre 2026/27" — da aggiornare ogni campagna)
- **`/offerta-formativa`**: pagina FUORI dal menu, punto di atterraggio per le sponsorizzate social. Si chiamava `/landing-ads`, rinominata ad agosto 2026: il vecchio URL fa redirect 301 permanente via `public/_redirects` (sintassi Cloudflare Workers Static Assets), quindi eventuali ads/link esterni già attivi non si rompono. Molto ispirata a una pagina reale del vecchio sito (italianoservito.it/corsi-di-italiano-estate-2026...). Contiene ancora placeholder tra `[parentesi quadre]` per date/orari/prezzi del prossimo semestre — vanno riempiti con i dati veri di Giada prima del lancio
- **`/faq`**: pagina di FAQ generali (distinta dalle 3 FAQ mostrate in Home, pensate per un taglio più "da campagna"), con FAQPage JSON-LD per la SEO/GEO. Le risposte sono in `src/data/faq.js`
- **Approfondimenti**: sezione rimossa su richiesta di Stefano (le 10 pagine, la voce di menu e tutti i link interni sono stati eliminati) — non riproporla senza una richiesta esplicita

## Cosa manca prima del lancio (in ordine di priorità)
1. Dati veri della landing (prezzi, orari, date, scadenza iscrizioni — oggi placeholder)
2. ~~Collegare davvero Supabase + Resend~~ — fatto: progetto Supabase `italiano-servito` attivo con tabella `leads` (RLS on), dominio `italianoservito.it` verificato su Resend, variabili d'ambiente impostate sul Worker Cloudflare. Endpoint `/api/iscrizione` migrato da Pages Function a route Astro on-demand per essere compatibile col deploy reale (vedi Stack tecnico sopra)
3. Foto reali mancanti (segnaposto testurizzati ancora presenti in alcune sezioni, es. "tavola imbandita")
4. **Traduzioni PL/EN — COSTRUITE (ago 2026)**. Scope deciso con Stefano: NON tutto il sito, ma solo 5 pagine in entrambe le lingue — Home, Chi Sono, FAQ, Offerta Formativa, **Contatti** (aggiunta il 28/08/2026 su richiesta di Stefano; restano fuori solo `/percorsi/*` e `/club-del-libro`). Stessi slug sotto `/pl/` e `/en/` di quelli italiani (`src/pages/pl/*.astro`, `src/pages/en/*.astro`). Workflow seguito: bozza di testo in `traduzioni-pl-en-bozza.md`, poi correzioni di Giada (file `.doc`, guardato solo il polacco), poi propagazione delle modifiche esplicite a IT/EN — comprese alcune correzioni al sito ITALIANO live (vedi commit relativo) — poi costruzione delle pagine. Componenti condivisi resi multilingua con prop `locale`: `Navbar.astro` e `Footer.astro` (menu semplificato in PL/EN: Home, Chi Sono/O mnie/About me, FAQ, Contatti/Kontakt/Contact + CTA, niente dropdown Percorsi), `SignupForm.astro` (etichette tradotte, incluso il nome del corso mostrato nel select), `PromiseCards.astro`/`Testimonials.astro` (accettano items via prop). `corsiStagione.js` ha campi `tipoPl`/`tipoEn`/`tagPl`/`tagEn`/`comeFunzionaPl`/`comeFunzionaEn` accanto a quelli italiani — `tagPl`/`tagEn` sono SOLO per il testo mostrato, il valore inviato al form/a Supabase resta sempre il `tag` italiano. Le parole italiane residue nei dati condivisi (giorni della settimana, mesi, "lezioni"/"minuti", "semestre") vengono tradotte a runtime da `src/lib/traduciData.js` sulle pagine `/pl` e `/en`, così il calendario resta definito in un solo posto (niente rischio di disallineamento se Giada cambia una data). Note operative: (a) le testimonianze di Kamila/Małgosia sono OMESSE in Home PL (servirebbe il testo originale polacco, non ancora recuperato) ma PRESENTI in EN (tradotte con cautela dall'italiano); (b) la sezione "I percorsi" della Home in PL/EN è un blocco unico verso Offerta Formativa, non la griglia CourseCards; (c) `/grazie` resta UNICA per le 3 lingue ma non è più statica (`prerender = false`): legge `?lang=pl|en` (passato da `/api/iscrizione`, che rileva la lingua dall'header Referer della pagina con il form) e mostra il blocco giusto, default italiano; (d) la mail di conferma iscrizione (`src/pages/api/iscrizione.js`) è localizzata allo stesso modo, la notifica interna a Giada resta in italiano con tag `[PL]`/`[EN]` nell'oggetto. Il punto ambiguo sulla FAQ domanda 1 è stato chiarito con Stefano il 28/08/2026 (la nota "DA ELIMINARE IN TUTTE LE LINGUE" riguardava "mai individuali", rimosso su IT/PL/EN — vedi `traduzioni-pl-en-bozza.md`). Restano aperti solo: le testimonianze di Kamila/Małgosia in polacco per la Home PL, e la revisione finale del polacco da parte di una madrelingua prima del lancio pubblico.
5. Revisione di Giada sui testi (le è stato consegnato un .docx separato con tutti i contenuti) — prime due tornate di correzioni già applicate (vedi git log)
6. ~~Rimuovere `.github/workflows/deploy.yml`~~ — fatto: era un residuo di un tentativo precedente su GitHub Pages, non collegato al deploy reale su Cloudflare

## Cose esplicitamente scartate (per non riproporle)
- WordPress/Divi — abbandonato in favore di Astro
- Vercel — problema di licenza commerciale sul piano gratuito
- Netlify — modello a crediti rischioso per traffico a raffica da ads
- Un CMS headless (Decap/Sanity/Contentful) — inutile per 2 aggiornamenti/anno
- Dashboard/area riservata/login — idea futura (membership a pagamento), ESPLICITAMENTE rimandata: non costruire login/dashboard finché non c'è un bisogno reale confermato
