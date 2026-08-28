// Traduce a runtime le parole italiane (giorni della settimana, mesi,
// "semestre", la congiunzione "e" nelle liste di date, "lezioni"/"minuti"
// nella descrizione del pacchetto di lezioni) presenti nei dati condivisi
// di src/data/corsiStagione.js, per le pagine /pl e /en.
//
// Perché a runtime e non con campi tradotti nei dati: la fonte del
// calendario resta unica e in italiano (vedi commento in corsiStagione.js
// — "così il calendario è definito in un solo posto e non rischia di
// disallinearsi"). Se Giada cambia una data o un orario, le versioni PL/EN
// si aggiornano da sole, senza bisogno di toccare tre posti diversi.
//
// Il dizionario Polacco usa la forma genitiva dei mesi ("14 września",
// non "14 wrzesień"), corretta per il formato data "GG [mese] AAAA".
const PAROLE = {
  pl: {
    Lunedì: 'Poniedziałek', Martedì: 'Wtorek', Mercoledì: 'Środa', Giovedì: 'Czwartek', Venerdì: 'Piątek', Sabato: 'Sobota', Domenica: 'Niedziela',
    gennaio: 'stycznia', febbraio: 'lutego', marzo: 'marca', aprile: 'kwietnia', maggio: 'maja', giugno: 'czerwca', luglio: 'lipca', agosto: 'sierpnia', settembre: 'września', ottobre: 'października', novembre: 'listopada', dicembre: 'grudnia',
    semestre: 'semestr',
    ' e ': ' i ',
    lezioni: 'lekcji', ' da ': ' po ', minuti: 'minut',
  },
  en: {
    Lunedì: 'Monday', Martedì: 'Tuesday', Mercoledì: 'Wednesday', Giovedì: 'Thursday', Venerdì: 'Friday', Sabato: 'Saturday', Domenica: 'Sunday',
    gennaio: 'January', febbraio: 'February', marzo: 'March', aprile: 'April', maggio: 'May', giugno: 'June', luglio: 'July', agosto: 'August', settembre: 'September', ottobre: 'October', novembre: 'November', dicembre: 'December',
    semestre: 'semester',
    ' e ': ' and ',
    lezioni: 'lessons', ' da ': ' of ', minuti: 'minutes',
  },
};

export function traduciData(testo, locale) {
  if (locale === 'it' || !testo) return testo;
  const dizionario = PAROLE[locale];
  if (!dizionario) return testo;
  let out = testo;
  for (const [it, tr] of Object.entries(dizionario)) {
    out = out.split(it).join(tr);
  }
  return out;
}
