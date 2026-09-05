// config.js — parametri del sito "Adesso parla tu"
// Nessuna chiave, nessun backend: tutto gira lato client.

const CONFIG = {
  SITE_TITLE: "Adesso parla tu",
  BOOK_TITLE: "Sapere di Non Sapere",
  AUTHOR: "Alessio Lerede",
  MAX_CHARS: 2000,
  STORAGE_KEY: "apt_ultima_riflessione",
  // Sotto questa lunghezza (in caratteri) una frase viene trattata come "corta"
  // e resa in evidenza, come nel capitolo 8 del libro.
  SOGLIA_FRASE_CORTA: 28,
  // Ogni quante frasi "lunghe" inserire una riga vuota di respiro.
  RESPIRO_OGNI: 3
};
