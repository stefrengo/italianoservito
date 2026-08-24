// ID di tracciamento — un solo posto da aggiornare se cambiano.
//
// GA4_MEASUREMENT_ID: NON è il Property ID (quello numerico tipo "296977470"
// che si vede nell'URL di Google Analytics). Serve il "Measurement ID" nel
// formato G-XXXXXXXXXX, che si trova in GA4 → Amministrazione → Origini dati
// → (flusso web del sito) → in alto a destra. Finché non è confermato resta
// un placeholder: il codice controlla che inizi per "G-" prima di caricare
// davvero lo script, quindi con il placeholder semplicemente non parte nulla
// (nessun errore, nessun dato falso inviato).
export const GA4_MEASUREMENT_ID = 'G-XXXXXXXXXX';

// Meta (Facebook/Instagram) Pixel ID — quello dato da Stefano, formato corretto.
export const META_PIXEL_ID = '706095084029883';
