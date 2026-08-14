import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://www.italianoservito.it',
  // Adapter Cloudflare: il sito è deployato come Cloudflare Worker (Workers
  // Builds), non come Cloudflare Pages classiche. Con output "hybrid" le
  // pagine restano statiche per default — solo le route con
  // "export const prerender = false" (es. src/pages/api/iscrizione.js)
  // vengono renderizzate on-demand dal Worker a ogni richiesta.
  output: 'hybrid',
  adapter: cloudflare(),
  // i18n nativo Astro: IT come lingua di default, PL lingua di conversione, EN vetrina
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'pl', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
