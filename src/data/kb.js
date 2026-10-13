// Scripted answers for the demo assistant. Replace with a real backend when you have one.
const WA = '<a href="#contatti">scrivimi su WhatsApp</a>'

export const KB = [
  { k: ['cost', 'prezz', 'quanto', 'budget', 'preventiv', 'euro'], a: `Dipende da cosa serve. Un sito vetrina parte da poche migliaia di euro, un gestionale su misura di più. Ti dico una cifra chiara dopo una chiamata di 30 minuti, prima di iniziare. Se vuoi, ${WA} e ti rispondo entro un giorno.` },
  { k: ['tempo', 'quanto ci', 'giorni', 'settiman', 'mesi', 'quando', 'veloc'], a: "Un sito vetrina: 2-4 settimane. Un gestionale: da 1 a 3 mesi a seconda delle funzioni. In pochi giorni vedi già un'anteprima cliccabile sul telefono." },
  { k: ['sito', 'landing', 'vetrina', 'web'], a: 'Faccio siti in React: veloci su telefono, trovabili su Google e con animazioni come quelle che vedi qui. Guarda <a href="#progetti">Chef League</a> per un esempio online.' },
  { k: ['gestional', 'excel', 'magazzin', 'fattur', 'ordini', 'clienti', 'pannello'], a: 'I gestionali li costruisco con Laravel: clienti, ordini, magazzino, fatture e report in un pannello solo, con permessi per ogni collaboratore. <a href="#progetti">Personal Wallet</a> è un esempio.' },
  { k: ['chatbot', 'assistente', 'chat', 'whatsapp bot', 'bot'], a: "Sono io l'esempio. Un assistente come questo può stare sul tuo sito o su WhatsApp, addestrato sui tuoi contenuti: risponde ai clienti, prende appuntamenti e passa a te quando serve." },
  { k: ['agent', 'ai', 'intelligenza', 'automa', 'email', 'document'], a: 'Gli agenti AI leggono email, compilano documenti e preparano preventivi al posto tuo. Tu controlli e firmi. Li integro nel gestionale che usi già.' },
  { k: ['react', 'laravel', 'tecnolog', 'linguagg', 'stack', 'php', 'javascript'], a: "Uso React per tutto quello che vedi sullo schermo e Laravel per tutto quello che ci sta dietro. Per l'AI lavoro con i modelli Claude e OpenAI." },
  { k: ['chi sei', 'chi è', 'francesco', 'tu'], a: "Francesco Cassano, sviluppatore web. Una persona sola dall'idea al sito online: progetta, sviluppa, pubblica e mantiene. Trovi due righe su di lui <a href=\"#chi-sono\">qui</a>." },
  { k: ['contatt', 'scriv', 'telefon', 'numero', 'mail', 'parl', 'chiam'], a: `Il modo più semplice è WhatsApp: anche un vocale va bene. ${WA}. Risponde entro un giorno lavorativo.` },
  { k: ['dove', 'sede', 'città', 'remoto', 'zona'], a: 'Lavora in Italia, in presenza o da remoto. Per la maggior parte dei progetti basta una videochiamata.' },
  { k: ['ciao', 'salve', 'buongiorno', 'hey', 'ehi'], a: 'Ciao! Chiedimi pure cosa fa Francesco, quanto costa un sito o un gestionale, o quanto tempo ci vuole.' },
  { k: ['grazie'], a: `Di niente! Se vuoi andare sul concreto, ${WA}.` },
]

export const FALLBACK = `Su questo non ho una risposta pronta, ma Francesco sì: ${WA} e ti risponde di persona. Posso dirti cosa fa, quanto costa o quanto tempo ci vuole.`
export const SUGGESTIONS = ['Cosa fai?', 'Quanto costa un sito?', 'Quanto tempo ci vuole?', 'Fai anche gestionali?', 'Come ti contatto?']
export const GREETING = "Ciao, sono l'assistente demo di Francesco. Chiedimi cosa fa, quanto costa o quanto ci vuole: rispondo subito."

const norm = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
export function answer(q) {
  const n = norm(q)
  for (const item of KB) for (const key of item.k) if (n.includes(norm(key))) return item.a
  return FALLBACK
}
