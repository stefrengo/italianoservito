# L'Italiano è Servito — sito Astro

Sito vetrina statico, costruito con [Astro](https://astro.build), pronto per essere pubblicato su GitHub + Vercel.

## Cosa c'è dentro

- `src/pages/` — tutte le pagine del sito (Home, Chi Sono, i 3 Percorsi, Approfondimenti, Club del Libro, Contatti)
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

1. Crea un repository su GitHub e carica questo progetto (`git init`, `git add .`, `git commit`, `git push`).
2. Collega il repository a [Vercel](https://vercel.com) (framework preset: Astro — lo riconosce da solo).
3. Ogni `git push` sul branch principale pubblica automaticamente.
4. Punta il dominio `italianoservito.it` verso Vercel dalle impostazioni DNS di chi vende il dominio.

## Form, Supabase e notifiche email (Resend)

Il form della landing (`/landing-ads`) e quello di `/contatti` scrivono su Supabase e mandano due email (conferma alla persona + notifica a Giada) tramite Resend.

1. **Supabase**: crea un progetto su supabase.com, poi esegui una volta `supabase/schema.sql` nel loro SQL Editor (crea la tabella `leads` con le policy di sicurezza corrette — il pubblico può solo scrivere, mai leggere).
2. **Resend**: crea un account su resend.com, verifica il dominio `italianoservito.it` (serve per poter mandare da un indirizzo @italianoservito.it), genera una API key.
3. **Variabili d'ambiente**: copia `.env.example` in `.env` per lo sviluppo locale (solo le due chiavi `PUBLIC_*`). Le altre (`SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `GIADA_NOTIFICATION_EMAIL`) vanno impostate **solo** nel pannello Cloudflare Pages → Settings → Environment variables, mai in un file dentro il repository.
4. La logica di invio è in `functions/api/iscrizione.js` — è lì che puoi personalizzare il testo dell'email di conferma.

## Cosa manca ancora (da fare prima del lancio)

- **Prezzi, date e frequenza dei corsi**: sono placeholder `da definire` in `src/data/corsi.js` e in `club-del-libro.astro`.
- **Foto vera di Giada**: al momento c'è un cerchio segnaposto nell'hero (`src/components/Hero.astro`).
- **Form contatti**: punta a `/api/contatto`, che ancora non esiste. Va collegato a una funzione serverless (Vercel Function) che inoltri i dati allo stesso flusso email → Zapier → Google Sheet già in uso, così a valle non cambia nulla per Giada.
- **Traduzioni PL / EN**: la struttura i18n di Astro è già configurata in `astro.config.mjs`, ma i contenuti in polacco e inglese vanno ancora scritti.
- **9 articoli evergreen**: la pagina Approfondimenti mostra già titoli e categorie, i testi completi sono da scrivere.
