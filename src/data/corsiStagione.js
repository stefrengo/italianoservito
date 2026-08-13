// Corsi attivi nella stagione in corso — fonte unica condivisa da /landing-ads
// e dalle singole pagine /percorsi/*, così il calendario è definito in un solo
// posto e non rischia di disallinearsi tra le pagine.
//
// Ogni corso indica sia il "pasto" (Antipasto/Primo/Secondo, la categoria del
// percorso) sia il livello CEFR specifico di quell'edizione — perché in una
// stessa categoria possono convivere più corsi a livelli diversi (es. due
// edizioni di Antipasto, una A1 e una A2). Mappa livelli: Antipasto = A1-A2,
// Primo = B1-B2, Secondo = C1-C2.
//
// tag deve corrispondere esattamente al `title` del percorso in src/data/corsi.js
// (es. "Sbloccati da Zero"), è la chiave usata per filtrare i corsi di quella
// pagina nel form di iscrizione.

export const STAGIONE = 'I semestre | 2026/27'; // <- aggiorna a ogni campagna
export const SCADENZA_LABEL = '[data scadenza iscrizioni]';
export const SCADENZA_ISO = '2026-09-30T23:59:59'; // <- data reale per il countdown

export const corsiStagione = [
  {
    pasto: 'Antipasto', tag: 'Sbloccati da Zero', livello: 'A1',
    orario: '[Giorno] dalle [XX.XX] alle [XX.XX]',
    prezzo: '[prezzo]',
    tipo: 'Corso base da zero',
    lezioni: '[N] incontri da [XX] minuti ([dal / al]).',
    giornoLibero: '[—]',
  },
  {
    pasto: 'Antipasto', tag: 'Sbloccati da Zero', livello: 'A2',
    orario: '[Giorno] dalle [XX.XX] alle [XX.XX]',
    prezzo: '[prezzo]',
    tipo: 'Corso di consolidamento delle basi',
    lezioni: '[N] lezioni da [XX] minuti ([dal / al]).',
    giornoLibero: '[—]',
  },
  {
    pasto: 'Primo', tag: 'Trova la tua Voce', livello: 'B1',
    orario: '[Giorno] dalle [XX.XX] alle [XX.XX]',
    prezzo: '[prezzo]',
    tipo: 'Corso di conversazione',
    lezioni: '[N] lezioni da [XX] minuti ([dal / al]).',
    giornoLibero: '[—]',
  },
  {
    pasto: 'Secondo', tag: 'Esplora la Lingua', livello: 'C1',
    orario: '[Giorni] dalle [XX.XX] alle [XX.XX]',
    prezzo: '[prezzo]',
    tipo: 'Corso di conversazione avanzata',
    lezioni: '[N] lezioni da [XX] minuti (2 volte a settimana, [dal / al]).',
    giornoLibero: '[—]',
  },
];
