# Adesso parla tu

Pagina compagna del libro *Sapere di Non Sapere* di Alessio Lerede.

Il lettore scrive una riflessione sull'intelligenza artificiale e la vede
tornare formattata nello stile spezzato e aforistico del capitolo 8 del
libro ("Adesso parla lei"). Tutto gira lato client: nessun backend,
nessun dato inviato altrove — le bozze restano solo nel browser
dell'utente (`localStorage`).

## File

- `index.html` — struttura della pagina
- `style.css` — impaginazione, tipografia, animazioni
- `app.js` — algoritmo di formattazione, salvataggio locale, copia, export immagine
- `config.js` — parametri (soglie, chiavi di storage, testi)
