# Landing Francesco Cassano

Sito personale in React + Vite, con scena 3D in Three.js. Pronto per Netlify.

## Comandi

```bash
npm install      # una volta
npm run dev      # sviluppo su http://localhost:5173
npm run build    # produzione in dist/
npm run preview  # prova la build
```

## Pubblicare su Netlify (gratis)

1. Metti la cartella su GitHub (`git init`, commit, push).
2. Su Netlify: **Add new site → Import an existing project**, scegli il repository.
3. Netlify legge `netlify.toml`: build `npm run build`, cartella `dist`. Non serve altro.
4. Ogni push su `main` ripubblica il sito.

In alternativa, senza GitHub: `npm run build` e trascina la cartella `dist` su https://app.netlify.com/drop.

## Cosa cambiare prima di andare online

Tutto il testo che ti riguarda sta in `src/data/site.js`:

- `WHATSAPP_NUMBER` e `WHATSAPP_DISPLAY`: il tuo numero.
- `PROJECTS`: titoli, testi, link e schermate dei progetti (immagini in `public/img`).
- `MOMENTS`, `SERVICES`, `THREAD`: i testi della sezione "Una giornata", della lista "Cosa faccio" e della chat "Come funziona". Nomi e numeri sono di esempio.

Le risposte dell'assistente demo stanno in `src/data/kb.js`. I prezzi indicativi lì dentro vanno controllati.

## Struttura

```
src/
  App.jsx               compone la pagina, monta scena 3D e comportamenti globali
  styles.css            tutto lo stile (variabili in :root: --blue, --yellow, ...)
  lib/motion.js         stato condiviso per le animazioni (mouse, scroll, tempo)
  lib/scene.js          particelle Three.js: volo iniziale e forme dietro le sezioni
  lib/enhance.js        rivelazioni allo scroll, demo animate, tilt 3D, pulsanti magnetici
  components/
    Curtain.jsx         sipario iniziale con il nome
    Nav.jsx             menu a pillola
    Story.jsx           intro a scorrimento in 5 capitoli
    Day.jsx             "Una giornata": orologio e schermo che cambia forma
    WhatIDo.jsx         lista tipografica con anteprime
    Projects.jsx        progetti con gallerie 3D trascinabili
    About.jsx           chi sono
    Method.jsx          metodo raccontato come chat
    Contact.jsx         contatti e footer
    Bot.jsx             assistente demo
    Demos.jsx           mini mockup animati (sito, gestionale, agente, chat)
    Split.jsx           titoli con parole che salgono una alla volta
  data/site.js          testi e link da personalizzare
  data/kb.js            risposte dell'assistente demo
```
