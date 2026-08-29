// FAQ generali sul metodo, sui corsi e sull'iscrizione (non legate a un singolo
// percorso — quelle sono già in corsi.js). Le risposte sono scritte per rispondere
// bene sia a chi legge sul sito sia a un assistente AI che cerca "come imparare
// l'italiano" per un pubblico polacco: frase diretta, risposta completa in sé.
//
// Le risposte con un link (mailto: o pagine interne) contengono markup HTML e
// vanno renderizzate con set:html, non interpolate come testo semplice — vedi
// src/pages/faq.astro. Il link a "pagina dei corsi attivi" punta a
// /offerta-formativa (ex /landing-ads, ora redirect 301 — vedi public/_redirects).

export const faq = [
  {
    q: "Le lezioni sono individuali o di gruppo?",
    a: "Tutti i corsi de \"L'Italiano è Servito\" sono lezioni di gruppo: piccoli gruppi online, da 3 a un massimo di 6 persone. È una scelta precisa, non un limite: credo nel potere dell'interazione tra le persone. Si impara di più, e più in fretta, parlando con altri che stanno affrontando le tue stesse difficoltà.",
  },
  {
    q: "Perché scegliere un corso di gruppo invece di un'insegnante privata?",
    a: "Perché la lingua si allena parlando con altre persone. In un piccolo gruppo ti confronti, ascolti come si esprimono altri al tuo livello e, soprattutto, ti alleni a sostenere una vera conversazione. È lo stesso principio su cui ho costruito il mio metodo, maturato in anni di insegnamento in Polonia.",
  },
  {
    q: "Come si svolgono i corsi e su quale piattaforma?",
    a: "Le lezioni sono online, in diretta su Zoom, in piccoli gruppi (massimo 6 persone). Non sono videolezioni registrate: si parla, si fanno domande, si conversa davvero fin dalla prima lezione.",
  },
  {
    q: "Che livello di italiano serve per iniziare?",
    a: "Nessuno. \"Sbloccati adesso\" è pensato proprio per chi non ha mai parlato italiano o ha solo provato. Da lì in poi ci sono percorsi per ogni livello, da B1 a C2: \"Trova la tua Voce\" per chi ha le basi ma si blocca a parlare, \"Esplora la Lingua\" per chi vuole cogliere le sfumature culturali più fini. In caso di dubbio, un incontro conoscitivo aiuta a capire da dove partire.",
  },
  {
    q: "Le spiegazioni sono disponibili anche in polacco?",
    a: "Sì. Ho vissuto sette anni in Polonia, di cui sei lavorando all'Istituto Italiano di Cultura di Cracovia, e so esattamente dove la struttura del polacco complica l'apprendimento dell'italiano. Quando serve, spiego la grammatica più ostica partendo proprio da un paragone con il polacco, non da un manuale italiano tradotto.",
  },
  {
    q: "Quanto costano i corsi e quando iniziano?",
    a: 'Prezzi, orari e date cambiano a ogni edizione: li trovi sempre aggiornati nella pagina dei corsi in programma, con posti limitati per garantire gruppi piccoli. Per qualsiasi dubbio si può scrivere direttamente a <a href="mailto:giada@italianoservito.it">giada@italianoservito.it</a>.',
  },
  {
    q: "Cosa succede se sbaglio o ho paura di parlare davanti agli altri?",
    a: "È il punto di partenza più comune, non un ostacolo. I gruppi sono piccoli apposta perché la fiducia si costruisca in fretta, e in ogni lezione sbagliare fa parte del percorso: è la prova che ci si sta provando, non un fallimento.",
  },
  {
    q: "Come mi iscrivo a un corso?",
    a: 'Si compila il modulo nella <a href="/offerta-formativa">pagina dei corsi attivi</a> o nella pagina <a href="/contatti">Contatti</a>: dopo l\'iscrizione arriva una conferma via email con tutti i dettagli per partecipare.',
  },
  {
    q: "Devo versare una caparra per confermare il mio posto?",
    a: "Sì: per bloccare il posto è richiesta una caparra di 100 PLN, che viene poi scalata dal costo totale del corso. È una scelta nata da un'esperienza concreta: in passato alcune persone si sono iscritte prenotando un posto e poi non si sono più presentate, lasciando fuori chi invece lo desiderava davvero. Visto che i gruppi sono piccoli e i posti sono pochi, è giusto che restino a chi è pronto a iniziare. I dettagli su come versarla vengono spiegati personalmente al momento della conferma.",
  },
];
