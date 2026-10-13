import { useState } from 'react'
import { WHATSAPP_URL, WHATSAPP_DISPLAY } from '../data/site.js'
import Split from './Split.jsx'
import { WhatsAppIcon } from './Icons.jsx'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try { await navigator.clipboard.writeText(WHATSAPP_DISPLAY); setCopied(true); setTimeout(() => setCopied(false), 1600) }
    catch { window.getSelection()?.selectAllChildren(document.getElementById('num')) }
  }
  return (
    <section className="contact" id="contatti" data-tone="yellow">
      <div className="wrap">
        <span className="eyebrow rv"><i /> Disponibile per nuovi progetti</span>
        <Split className="rv">Raccontami <em>cosa</em> vuoi costruire.</Split>
        <p className="rv">Un messaggio su WhatsApp basta. Anche un vocale. Rispondo entro un giorno lavorativo.</p>
        <div className="row rv">
          <a className="btn wa mag" href={WHATSAPP_URL} target="_blank" rel="noopener">Apri WhatsApp <span className="ic"><WhatsAppIcon /></span></a>
        </div>
        <div className="phone-num rv"><span id="num">{WHATSAPP_DISPLAY}</span><button type="button" onClick={copy}>{copied ? 'Copiato' : 'Copia numero'}</button></div>
        <footer className="wrap" style={{ marginTop: 90 }}>
          <span>© {new Date().getFullYear()} Francesco Cassano</span>
          <span>React · Laravel · AI</span>
        </footer>
      </div>
    </section>
  )
}
