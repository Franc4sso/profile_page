import { THREAD } from '../data/site.js'
import Split from './Split.jsx'

const STEPS = ['Messaggio', 'Chiamata di 30 minuti', 'Anteprima cliccabile', 'Online e assistenza']

/** How working together goes, told as the WhatsApp conversation it usually is. */
export default function Method() {
  return (
    <section className="block" id="metodo" data-tone="blue">
      <div className="wrap">
        <div className="head rv">
          <div><span className="eyebrow"><i /> Come funziona</span><Split>Dal primo messaggio <em>al sito online.</em></Split></div>
          <p>Così va di solito. Una conversazione di esempio, ma è davvero così che lavoro: su WhatsApp, in italiano, senza sorprese.</p>
        </div>
        <div className="thread">
          {THREAD.map((m, i) => m.pill
            ? <span className="pill rv" key={i}>{m.pill}</span>
            : (
              <div className={`msg ${m.who} rv`} key={i}>
                {m.card && <a className="card" href="#contatti"><span className="ic" /><span><b>{m.card.title}</b><small>{m.card.sub}</small></span></a>}
                <p>{m.text}</p><time>{m.time}</time>
              </div>
            ))}
        </div>
        <ol className="stepsline rv">{STEPS.map((s, i) => <li key={s}><b>{i + 1}</b>{s}</li>)}</ol>
      </div>
    </section>
  )
}
