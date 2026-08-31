// Site Key pubblica di Cloudflare Turnstile (widget "Managed" configurato per
// italianoservito.it). Non è un segreto: è pensata per stare nell'HTML
// pubblico, esattamente come una chiave "publishable". La Secret Key invece
// NON va mai messa nel codice: vive solo come variabile d'ambiente del
// Worker (TURNSTILE_SECRET_KEY, impostata su Cloudflare, Settings →
// Variables and Secrets) ed è usata solo lato server in
// src/pages/api/iscrizione.js per verificare il token.
//
// Un'unica costante importata da tutti i form (SignupForm.astro,
// contatti.astro IT/EN/PL) così va aggiornata in un solo posto.
export const TURNSTILE_SITE_KEY = '0x4AAAAAAEjRcGFaLlzO_c8P';
