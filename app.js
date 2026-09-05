// app.js — logica di "Adesso parla tu"

(function () {
  const input = document.getElementById("input-testo");
  const charCount = document.getElementById("char-count");
  const btnGenera = document.getElementById("btn-genera");
  const btnRiscrivi = document.getElementById("btn-riscrivi");
  const btnCopia = document.getElementById("btn-copia");
  const btnImmagine = document.getElementById("btn-immagine");
  const risultato = document.getElementById("risultato");
  const testoFormattato = document.getElementById("testo-formattato");
  const copyFeedback = document.getElementById("copy-feedback");
  const scriviPanel = document.getElementById("scrivi");

  // --- Ripristino bozza salvata localmente -------------------------------
  try {
    const salvato = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (salvato) input.value = salvato;
  } catch (e) {
    // storage non disponibile (modalità privata, ecc.) — si prosegue senza
  }
  aggiornaContatore();

  input.addEventListener("input", () => {
    aggiornaContatore();
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY, input.value);
    } catch (e) {}
  });

  function aggiornaContatore() {
    const n = input.value.length;
    charCount.textContent = `${n} / ${CONFIG.MAX_CHARS}`;
    btnGenera.disabled = n === 0;
  }

  // --- Generazione del capitolo -------------------------------------------
  btnGenera.addEventListener("click", () => {
    const testo = input.value.trim();
    if (!testo) return;

    const righe = spezzaInStileCapitolo8(testo);
    renderRighe(righe);

    risultato.hidden = false;
    risultato.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  btnRiscrivi.addEventListener("click", () => {
    risultato.hidden = true;
    scriviPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    input.focus();
  });

  // --- Algoritmo di formattazione -------------------------------------------
  // Spezza il testo dell'utente in frasi e le dispone come nel capitolo 8:
  // frasi brevi isolate ed enfatizzate, frasi lunghe normali, respiri periodici.
  function spezzaInStileCapitolo8(testo) {
    const frasiGrezze = testo
      .replace(/\s+/g, " ")
      .split(/(?<=[.!?])\s+/)
      .map((f) => f.trim())
      .filter(Boolean);

    const righe = [];
    let contatoreLunghe = 0;

    frasiGrezze.forEach((frase) => {
      const corta = frase.length <= CONFIG.SOGLIA_FRASE_CORTA;
      righe.push({ testo: frase, corta });

      if (!corta) {
        contatoreLunghe++;
        if (contatoreLunghe % CONFIG.RESPIRO_OGNI === 0) {
          righe.push({ vuota: true });
        }
      }
    });

    return righe;
  }

  function renderRighe(righe) {
    testoFormattato.innerHTML = "";
    righe.forEach((riga, i) => {
      const div = document.createElement("div");
      if (riga.vuota) {
        div.className = "linea vuota";
      } else {
        div.className = "linea" + (riga.corta ? " corta" : "");
        div.textContent = riga.testo;
      }
      div.style.animationDelay = `${i * 0.06}s`;
      testoFormattato.appendChild(div);
    });
  }

  // --- Copia testo ------------------------------------------------------
  btnCopia.addEventListener("click", async () => {
    const testoPiano = Array.from(testoFormattato.querySelectorAll(".linea"))
      .map((el) => el.textContent)
      .join("\n");
    try {
      await navigator.clipboard.writeText(testoPiano);
      mostraFeedbackCopia();
    } catch (e) {
      // fallback: seleziona il testo per la copia manuale
      const range = document.createRange();
      range.selectNodeContents(testoFormattato);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  });

  function mostraFeedbackCopia() {
    copyFeedback.hidden = false;
    setTimeout(() => (copyFeedback.hidden = true), 2000);
  }

  // --- Esporta come immagine ----------------------------------------------
  btnImmagine.addEventListener("click", () => {
    const linee = Array.from(testoFormattato.querySelectorAll(".linea")).map(
      (el) => ({ testo: el.textContent, corta: el.classList.contains("corta") })
    );
    esportaImmagine(linee);
  });

  function esportaImmagine(linee) {
    const canvas = document.getElementById("export-canvas");
    const ctx = canvas.getContext("2d");
    const larghezza = 1080;
    const padding = 90;
    const fontSize = 30;
    const lineHeight = 54;
    const altezza = padding * 2 + linee.length * lineHeight + 160;

    canvas.width = larghezza;
    canvas.height = altezza;

    // sfondo
    ctx.fillStyle = "#141210";
    ctx.fillRect(0, 0, larghezza, altezza);

    // etichetta
    ctx.fillStyle = "#b45a3c";
    ctx.font = "600 20px 'IBM Plex Mono', monospace";
    ctx.fillText("CAPITOLO 8½ — ADESSO PARLA TU", padding, padding);

    // testo
    let y = padding + 60;
    linee.forEach((l) => {
      ctx.fillStyle = l.corta ? "#b45a3c" : "#f6f2ea";
      ctx.font = (l.corta ? "500 " : "400 ") + fontSize + "px 'IBM Plex Mono', monospace";
      wrapText(ctx, l.testo, padding, y, larghezza - padding * 2, lineHeight).forEach(() => {});
      y += testWrappedHeight(ctx, l.testo, larghezza - padding * 2, lineHeight);
    });

    // firma
    ctx.fillStyle = "#928c7f";
    ctx.font = "italic 18px 'Source Serif 4', serif";
    ctx.fillText(`Da ${CONFIG.BOOK_TITLE}, di ${CONFIG.AUTHOR}`, padding, altezza - 50);

    const link = document.createElement("a");
    link.download = "adesso-parla-tu.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  function wrapText(ctx, testo, x, yStart, maxWidth, lineHeight) {
    const parole = testo.split(" ");
    let riga = "";
    let y = yStart;
    const righeDisegnate = [];
    parole.forEach((parola) => {
      const prova = riga ? riga + " " + parola : parola;
      if (ctx.measureText(prova).width > maxWidth && riga) {
        ctx.fillText(riga, x, y);
        righeDisegnate.push(riga);
        riga = parola;
        y += lineHeight;
      } else {
        riga = prova;
      }
    });
    if (riga) {
      ctx.fillText(riga, x, y);
      righeDisegnate.push(riga);
    }
    return righeDisegnate;
  }

  function testWrappedHeight(ctx, testo, maxWidth, lineHeight) {
    const parole = testo.split(" ");
    let riga = "";
    let righe = 1;
    parole.forEach((parola) => {
      const prova = riga ? riga + " " + parola : parola;
      if (ctx.measureText(prova).width > maxWidth && riga) {
        righe++;
        riga = parola;
      } else {
        riga = prova;
      }
    });
    return righe * lineHeight;
  }
})();
