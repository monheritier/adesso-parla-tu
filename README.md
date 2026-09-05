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

## Pubblicare su GitHub Pages (2 minuti)

1. Crea un repository vuoto su GitHub chiamato `adesso-parla-tu` (pubblico).
2. Carica questi 5 file nella root del repo — dalla pagina del repo su
   github.com: **Add file → Upload files**, trascina i 5 file, poi
   **Commit changes**. (In alternativa, se preferisci da terminale:
   `git init && git add . && git commit -m "Adesso parla tu" && git remote add origin <url-repo> && git push -u origin main`.)
3. Vai su **Settings → Pages**. In *Build and deployment*, sotto *Source*
   seleziona **Deploy from a branch**, branch `main`, cartella `/root`.
   Salva.
4. Dopo 1-2 minuti il sito sarà live su:
   `https://<tuo-username>.github.io/adesso-parla-tu/`

Nessuna build, nessuna dipendenza da installare: sono file statici puri.
