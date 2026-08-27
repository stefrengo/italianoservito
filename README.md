# L'Italiano è Servito — sito Astro

Sito costruito con [Astro](https://astro.build) (output `hybrid`: pagine statiche + un endpoint on-demand per il form), deployato come **Cloudflare Worker** tramite Workers Builds collegato a questo repo GitHub.

## Cosa c'è dentro

- `src/pages/` — tutte le pagine del sito (Home, Chi Sono, i 3 Percorsi, Club del Libro, Contatti)
- `src/components/` — pezzi riutilizzabili (Navbar, Footer, Hero, card corsi/promesse)
- `src/data/corsi.js` — i testi dei 3 percorsi in un unico posto: modifica qui invece che nelle 3 pagine separate
- `src/styles/global.css` — palette, font e l'"anello conviviale" (l'elemento visivo ripreso dal logo)
- `public/logo.png` — il logo del brand

## Come lavorarci

```bash
npm install       # solo la prima volta
npm run dev        # anteprima locale su http://localhost:4321
npm run build       # genera il sito statico dentro dist/
```

## Come pubblicarlo

Il progetto Cloudflare `italianoservito` è un **Worker** (non una Cloudflare Pages classica), collegato a questo repo tramite Workers Builds: ogni `git push` sul branch `main` fa partire automaticamente un nuovo build + deploy. Non serve nessun passaggio manuale — se un deploy non parte da solo, su Cloudflare → Workers & Pages → `italianoservito` → Deployments si può forzare un retry, oppure basta un commit vuoto (`git commit --allow-empty` + `git push`).

Il dominio `italianoservito.it` va puntato (quando si è pronti) verso questo Worker dalle impostazioni DNS di chi gestisce il dominio.

## Form, Supabase e notifiche email (Resend)

Il form della landing (`/landing-ads`), quello delle pagine `/percorsi/*` e quello di `/contatti` scrivono su Supabase e mandano due email (conferma alla persona + notifica a Giada) tramite Resend.

1. **Supabase**: progetto `italiano-servito` già creato, tabella `leads` già presente con le policy di sicurezza corrette (il pubblico può solo scrivere, mai leggere) — schema di riferimento in `supabase/schema.sql`.
2. **Resend**: dominio `italianoservito.it` già verificato, API key già generata.
3. **Variabili d'ambiente**: copia `.env.example` in `.env` per lo sviluppo locale (solo le due chiavi `PUBLIC_*`, quelle pubbliche). Le altre (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `GIADA_NOTIFICATION_EMAIL`) sono impostate **solo** nel pannello Cloudflare del Worker → Settings → Variables and Secrets, mai in un file dentro il repository.
4. La logica di invio è in `src/pages/api/iscrizione.js` — è un endpoint Astro on-demand (`export const prerender = false`), non una Cloudflare Pages Function: legge le variabili d'ambiente da `locals.runtime.env` (convenzione dell'adapter `@astrojs/cloudflare`). È lì che puoi personalizzare il testo delle email.

## Cosa manca ancora (da fare prima del lancio)

- **Prezzi, date e frequenza dei corsi**: sono placeholder in `src/data/corsiStagione.js` e in `club-del-libro.astro`.
- **Traduzioni PL / EN**: la struttura i18n di Astro è già configurata in `astro.config.mjs`, ma i contenuti in polacco e inglese vanno ancora scritti.
- **Revisione di Giada** sui testi definitivi.
- Vedi `CONTEXT.md` per l'elenco completo e aggiornato.
