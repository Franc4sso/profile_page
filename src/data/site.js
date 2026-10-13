// Everything you will want to change lives here.
export const WHATSAPP_NUMBER = '393248038782' // digits only, with country code
export const WHATSAPP_DISPLAY = '+39 324 803 8782'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Ciao Francesco, ti scrivo dal sito')}`

export const PROJECTS = [
  {
    eyebrow: 'Fantasy game · Sito + area riservata',
    title: ['Chef ', 'League'],
    text: 'Il fantasy game di MasterChef. Scegli sette concorrenti con cento crediti, sfida gli amici in stanze private e scala la classifica settimana dopo settimana. Tutto gratuito, con un assistente in chat che spiega le regole.',
    tags: ['React', 'Laravel', 'Classifiche', 'Chatbot'],
    url: 'https://www.masterchefleague.com/',
    cta: 'Apri masterchefleague.com',
    glow: 'radial-gradient(60% 60% at 50% 50%,rgba(255,170,60,.3),rgba(79,124,255,.12) 60%,transparent 75%)',
    shots: [
      { src: '/img/chef-1.webp', alt: 'Chef League: pagina iniziale', label: 'Home' },
      { src: '/img/chef-2.webp', alt: 'Chef League: perché giocare e come funziona', label: 'Come funziona' },
      { src: '/img/chef-3.webp', alt: "Chef League: invito a creare l'account", label: 'Iscrizione' },
    ],
  },
  {
    eyebrow: 'Gestionale · Finanze personali',
    title: ['Personal ', 'Wallet'],
    text: 'Entrate, uscite e budget organizzati per ciclo stipendio, non per mese del calendario. Calendario delle spese, categorie, spese fisse e un assistente in chat che risponde sui tuoi conti. Nelle schermate i dati sono di prova.',
    tags: ['Laravel', 'Dashboard', 'Budget', 'Chatbot'],
    url: 'https://personal-wallet-eu.onrender.com/dashboard',
    cta: 'Apri personal-wallet.eu',
    glow: 'radial-gradient(60% 60% at 50% 50%,rgba(79,124,255,.32),rgba(255,207,74,.12) 60%,transparent 75%)',
    shots: [
      { src: '/img/wallet-1.webp', alt: 'Personal Wallet: dashboard con dati di prova', label: 'Dashboard' },
      { src: '/img/wallet-2.webp', alt: 'Personal Wallet: calendario delle spese', label: 'Analisi' },
      { src: '/img/wallet-3.webp', alt: 'Personal Wallet: elenco movimenti', label: 'Movimenti' },
    ],
  },
]

export const MOMENTS = [
  { t: 8.17, pane: 'site', tag: 'Sito web', title: 'Apri il telefono: tre richieste arrivate di notte dal sito.', text: 'Chi ti ha cercato su Google ha trovato una pagina veloce e chiara, e ti ha scritto. Senza che tu facessi nulla.', counts: [3, 0, 0] },
  { t: 9.5, pane: 'agent', tag: 'Agente AI', title: "Arriva un'email. L'agente la legge e prepara il preventivo.", text: 'Cliente, prodotto, quantità, scadenza. Tu lo apri, controlli e firmi. Due minuti invece di venti.', counts: [3, 1, 0] },
  { t: 12.75, pane: 'dash', tag: 'Gestionale', title: 'Un cliente paga. Ordine, magazzino e fattura si aggiornano da soli.', text: 'Niente fogli Excel da tenere allineati a mano. Un pannello solo, fatto sul modo in cui lavori.', counts: [4, 2, 0] },
  { t: 18, pane: 'site2', tag: 'Sito e assistente', title: "Tu chiudi. Il sito e l'assistente restano aperti.", text: 'Orari, prezzi, servizi, come arrivare: le domande di sempre hanno già una risposta.', counts: [5, 2, 1] },
  { t: 27.2, pane: 'chat', tag: 'Chatbot', title: 'Alle 3 di notte qualcuno chiede un tavolo per sei. Prenotato.', text: 'La mattina trovi la prenotazione nel gestionale e un cliente in più. Tu hai dormito.', counts: [7, 3, 4] },
]

export const SERVICES = [
  { pane: 'site', n: '01', title: 'Siti web', who: 'Per chi vuole essere trovato e ricevere richieste, non solo "esserci".', text: 'Pagine veloci sul telefono, pensate per comparire su Google e trasformare una visita in un messaggio. Con animazioni che colpiscono senza distrarre, come questa.', tags: 'React · Next.js · animazioni 3D · SEO' },
  { pane: 'dash', n: '02', title: 'Gestionali', who: 'Per chi tiene ordini, clienti e fatture su fogli Excel che si rompono.', text: 'Clienti, ordini, magazzino, fatture e report in un posto solo, fatto sul modo in cui lavori. Ogni collaboratore vede solo quello che gli serve.', tags: 'Laravel · MySQL · permessi per ruolo · esportazioni' },
  { pane: 'agent', n: '03', title: 'Agenti AI', who: 'Per chi passa ore a copiare dati da email, PDF e fogli.', text: 'Leggono email e documenti, estraggono i dati, compilano preventivi, cercano informazioni. Integrati nel gestionale. Tu controlli e firmi.', tags: 'Claude · OpenAI · integrazioni con email e documenti' },
  { pane: 'chat', n: '04', title: 'Chatbot', who: 'Per chi non riesce a rispondere a tutti, a tutte le ore.', text: 'Sul sito e su WhatsApp. Addestrato sui tuoi contenuti: risponde a domande, prende appuntamenti, raccoglie richieste. Quando serve, passa la conversazione a te.', tags: 'WhatsApp Business · sito web · prenotazioni' },
]

export const THREAD = [
  { pill: 'Lunedì' },
  { who: 'them', text: 'Ciao Francesco, ho una pizzeria e perdo prenotazioni perché la sera non riesco a rispondere a tutti i messaggi. Si può fare qualcosa?', time: '09:12' },
  { who: 'me', text: 'Ciao! Sì. Facciamo una chiamata di 30 minuti, così capisco come lavori e cosa ti serve davvero. Ti dico subito cosa costa, più o meno, prima di iniziare.', time: '09:40' },
  { who: 'them', text: 'Perfetto, domani alle 15?', time: '09:41' },
  { pill: 'Giovedì' },
  { who: 'me', card: { title: 'Anteprima · Pizzeria da Gino', sub: 'aprila dal telefono, è cliccabile' }, text: 'Ecco una prima versione. Niente di definitivo: cambiamo tutto quello che vuoi prima di scrivere il codice vero.', time: '18:05' },
  { who: 'them', text: 'Ma è già così? Il pulsante "Prenota" lo metterei più in alto, per il resto è proprio come lo immaginavo.', time: '18:30' },
  { pill: 'Due settimane dopo' },
  { who: 'me', text: "Siamo online. L'assistente ha già preso 4 prenotazioni stanotte. Domani passo a spiegare il pannello alla tua collaboratrice. Per qualsiasi cosa, scrivimi qui.", time: '08:20' },
  { who: 'them', text: 'Grande. Grazie Francesco!', time: '08:24' },
]
