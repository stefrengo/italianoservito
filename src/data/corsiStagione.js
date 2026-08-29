// Corsi attivi nella stagione in corso — fonte unica condivisa da /offerta-formativa
// e dalle singole pagine /percorsi/*, così il calendario è definito in un solo
// posto e non rischia di disallinearsi tra le pagine.
//
// Dati reali del I semestre 2026/27, confermati da Stefano e verificati contro
// il documento "Offerta1Semestre 26-27" su Google Drive (fonte di Giada).
//
// Ogni corso indica sia il "pasto" (Antipasto/Primo/Secondo, la categoria del
// percorso) sia il livello CEFR specifico di quell'edizione — perché in una
// stessa categoria possono convivere più corsi a livelli diversi (es. due
// edizioni di Antipasto, una A1 e una A2). Mappa livelli: Antipasto = A1-A2,
// Primo = B1-B2, Secondo = C1-C2. In questo semestre non c'è nessun corso B2
// attivo: è normale, non tutti i livelli sono offerti a ogni edizione.
//
// tag deve corrispondere esattamente al `title` del percorso in src/data/corsi.js
// (es. "Sbloccati adesso"), è la chiave usata per filtrare i corsi di quella
// pagina nel form di iscrizione.

export const STAGIONE = 'I semestre | 2026/27'; // <- aggiorna a ogni campagna
export const PERIODO = '21 settembre 2026 – 28 gennaio 2027'; // <- dal primo al ultimo corso della stagione
export const SCADENZA_LABEL = '14 settembre 2026';
export const SCADENZA_ISO = '2026-09-14T23:59:59'; // <- data reale per il countdown

// tipoPl/tipoEn: traduzione dell'etichetta "tipo" per le pagine /pl e /en di
// Offerta Formativa (vedi tabella "Etichette e testi delle card corso" nella
// bozza traduzioni). tagPl/tagEn: nome tradotto del percorso, stessa
// traduzione già usata in src/pages/pl/faq.astro e src/pages/en/faq.astro
// (Q1), usata SOLO per il testo mostrato — il valore inviato al form/a
// Supabase resta sempre "tag" in italiano, per non disallineare i dati coi
// lead già raccolti. Date/orari (giorni della settimana, mesi) restano in
// italiano nei dati e vengono tradotti a runtime da src/lib/traduciData.js
// sulle pagine /pl e /en, per lo stesso motivo (fonte unica, niente
// duplicazione a rischio di disallineamento).
export const corsiStagione = [
  {
    pasto: 'Antipasto', tag: 'Sbloccati adesso', tagPl: 'Odblokuj się teraz', tagEn: 'Unlock Now', livello: 'A1',
    orario: 'Martedì, 16:05 – 17:05',
    prezzo: 600,
    tipo: 'Corso base da zero', tipoPl: 'Kurs podstawowy od zera', tipoEn: 'Basic course from zero',
    lezioni: '15 lezioni da 60 minuti (22.09.26 – 19.01.27).',
    giornoLibero: '10 novembre, 29 dicembre, 5 gennaio',
  },
  {
    pasto: 'Antipasto', tag: 'Sbloccati adesso', tagPl: 'Odblokuj się teraz', tagEn: 'Unlock Now', livello: 'A2',
    orario: 'Lunedì, 16:00 – 17:00',
    prezzo: 600,
    tipo: 'Corso di consolidamento delle basi', tipoPl: 'Kurs utrwalający podstawy', tipoEn: 'Foundations consolidation course',
    lezioni: '15 lezioni da 60 minuti (21.09.26 – 18.01.27).',
    giornoLibero: '9 novembre, 28 dicembre, 4 gennaio',
  },
  {
    pasto: 'Primo', tag: 'Trova la tua Voce', tagPl: 'Znajdź swój głos', tagEn: 'Find Your Voice', livello: 'B1',
    orario: 'Giovedì, 17:00 – 18:00',
    prezzo: 600,
    tipo: 'Corso di gruppo', tipoPl: 'Kurs grupowy', tipoEn: 'Group course',
    lezioni: '15 lezioni da 60 minuti (24.09.26 – 28.01.27).',
    giornoLibero: '12 novembre, 24 e 31 dicembre, 7 gennaio',
  },
  {
    pasto: 'Secondo', tag: 'Esplora la Lingua', tagPl: 'Odkryj język', tagEn: 'Explore the Language', livello: 'C1',
    orario: 'Lunedì, 18:15 – 19:45',
    prezzo: 800,
    tipo: 'Corso di approfondimento avanzato', tipoPl: 'Kurs zaawansowany', tipoEn: 'Advanced in-depth course',
    lezioni: '15 lezioni da 90 minuti (21.09.26 – 18.01.27).',
    giornoLibero: '9 novembre, 28 dicembre, 4 gennaio',
  },
  {
    pasto: 'Secondo', tag: 'Esplora la Lingua', tagPl: 'Odkryj język', tagEn: 'Explore the Language', livello: 'C1/C2',
    orario: 'Lunedì, 8:00 – 9:00',
    prezzo: 600,
    tipo: 'Corso di approfondimento avanzato', tipoPl: 'Kurs zaawansowany', tipoEn: 'Advanced in-depth course',
    lezioni: '15 lezioni da 60 minuti (21.09.26 – 18.01.27).',
    giornoLibero: '9 novembre, 28 dicembre, 4 gennaio',
  },
  {
    pasto: 'Secondo', tag: 'Esplora la Lingua', tagPl: 'Odkryj język', tagEn: 'Explore the Language', livello: 'C2',
    orario: 'Giovedì, 18:00 – 19:00',
    prezzo: 600,
    tipo: 'Corso di approfondimento avanzato', tipoPl: 'Kurs zaawansowany', tipoEn: 'Advanced in-depth course',
    lezioni: '15 lezioni da 60 minuti (24.09.26 – 28.01.27).',
    giornoLibero: '12 novembre, 24 e 31 dicembre, 7 gennaio',
  },
];

// I corsi "Dolce" — bonus di conversazione, non un livello vero e proprio.
// Calendario a incontri quindicinali (non un range continuo come sopra),
// quindi hanno una forma diversa: "calendario" invece di "giornoLibero",
// e un prezzo scontato ("prezzoBundle") per chi li abbina a un corso standard.
export const corsiDolce = [
  {
    tag: 'Tè e Riviste', tagPl: 'Herbata i Czasopisma', tagEn: 'Tea & Magazines', edizione: '1° edizione', novita: true,
    comeFunziona: "A casa leggi un articolo da una rivista italiana che ti fornisco io; a lezione (circa ogni due settimane) lo analizziamo e commentiamo insieme. Le riviste e gli articoli cambiano ogni volta genere e argomento.",
    comeFunzionaPl: 'W domu czytasz artykuł z włoskiego czasopisma, które Ci dostarczam; na spotkaniu (mniej więcej co dwa tygodnie) analizujemy go i komentujemy razem. Czasopisma i artykuły za każdym razem zmieniają gatunek i temat.',
    comeFunzionaEn: 'At home, you read an article from an Italian magazine that I provide; in the session (roughly every two weeks) we analyze and discuss it together. The magazines and articles change genre and topic each time.',
    livello: 'B1/B2',
    orario: 'Venerdì, 16:15 – 17:15',
    calendario: '25 settembre, 9 e 23 ottobre, 6 e 20 novembre, 4 e 18 dicembre, 15 gennaio',
    lezioni: 8, minuti: 60,
    prezzo: 320, prezzoBundle: 288,
  },
  {
    tag: 'Il Club del Libro', tagPl: 'Klub Książki', tagEn: 'Book Club', edizione: '3° edizione', novita: false,
    comeFunziona: "A casa leggi un brano da un libro italiano che ti fornisco io; a lezione (circa ogni due settimane) lo analizziamo e commentiamo insieme.",
    comeFunzionaPl: 'W domu czytasz fragment włoskiej książki, którą Ci dostarczam; na spotkaniu (mniej więcej co dwa tygodnie) analizujemy go i komentujemy razem.',
    comeFunzionaEn: 'At home, you read a passage from an Italian book that I provide; in the session (roughly every two weeks) we analyze and discuss it together.',
    livello: 'Da B2 a C2',
    orario: 'Venerdì, 17:30 – 18:45',
    calendario: '25 settembre, 9 e 23 ottobre, 6 e 20 novembre, 4 e 18 dicembre, 15 gennaio',
    lezioni: 8, minuti: 75,
    prezzo: 400, prezzoBundle: 360,
  },
];
