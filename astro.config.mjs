import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://www.italianoservito.it',
  // i18n nativo Astro: IT come lingua di default, PL lingua di conversione, EN vetrina
  i18n: {
    defaultLocale: 'it',
    locales: ['it', 'pl', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  }
});
