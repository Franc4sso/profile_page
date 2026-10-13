import { useEffect, useRef, useState } from 'react'
import { motion } from '../lib/motion.js'
import { WhatsAppIcon, ArrowIcon, ChatIcon } from './Icons.jsx'

const CHAPTERS = [
  { tag: 'Siti web', title: ['Siti che ', 'si fanno', ' ricordare.'], sub: 'Veloci, curati, pensati per portare clienti. Non un modello comprato e riempito.' },
  { tag: 'Gestionali', title: ['Addio ', 'fogli', ' Excel.'], sub: 'Ordini, clienti, magazzino, fatture: un pannello solo, fatto sul modo in cui lavori tu.' },
  { tag: 'Agenti AI', title: ['Il lavoro noioso ', 'lo fa', ' lui.'], sub: 'Legge le email, compila documenti, prepara preventivi. Tu controlli e firmi.' },
  { tag: 'Chatbot', title: ['Risponde ', 'anche', ' alle 3 di notte.'], sub: 'Sul sito o su WhatsApp. Conosce i tuoi servizi, i prezzi, gli orari. Quando serve, passa a te.' },
]

/** The opening flight: a 640vh scroll where the camera moves through five particle objects. */
export default function Story({ onTryBot }) {
  const storyRef = useRef(null)
  const hintRef = useRef(null)
  const barRef = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const story = storyRef.current
    let current = 0
    const update = () => {
      const rect = story.getBoundingClientRect(), vh = window.innerHeight, total = rect.height - vh, y = -rect.top
      motion.progress = Math.min(Math.max(y, 0), total) / total * 4
      motion.extra = Math.max(y - total, 0) / vh
      const step = Math.round(motion.progress)
      if (step !== current) { current = step; setActive(step) }
      if (hintRef.current) hintRef.current.style.opacity = motion.progress > 0.12 ? 0 : 1
      const doc = document.documentElement
      if (barRef.current) barRef.current.style.transform = `scaleX(${doc.scrollTop / (doc.scrollHeight - vh)})`
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update()
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update) }
  }, [])

  const pulse = () => { motion.pulse = 1; motion.pulseAt = performance.now() }

  return (
    <>
      <div className="progress"><i ref={barRef} /></div>
      <div className="story" id="story" data-tone="blue" ref={storyRef}>
        <div className="stage" id="stage" onPointerDown={pulse}>
          <div className="halo" />
          <div className="vignette" />

          <div className={`chapter hero${active === 0 ? ' on' : ''}`}>
            <div className="inner">
              <span className="eyebrow"><i /> Sviluppatore web · Siti, gestionali, AI</span>
              <h1>Il tuo prossimo sito non sarà <em>come gli altri.</em></h1>
              <p className="lead">Mi chiamo Francesco. Costruisco siti, gestionali e assistenti AI per piccole imprese e professionisti. Scorri, o clicca sulle particelle.</p>
              <div className="row">
                <a className="btn wa mag" href="#contatti">Scrivimi su WhatsApp <span className="ic"><WhatsAppIcon /></span></a>
                <a className="btn ghost mag" href="#progetti">Vedi i progetti <span className="ic"><ArrowIcon /></span></a>
              </div>
            </div>
          </div>

          {CHAPTERS.map((c, i) => (
            <div className={`chapter${active === i + 1 ? ' on' : ''}`} key={c.tag}>
              <div className="inner">
                <span className="eyebrow"><i /> {c.tag}</span>
                <div className="giant">{c.title[0]}<em>{c.title[1]}</em>{c.title[2]}</div>
                <p className="sub">{c.sub}</p>
                {i === 3 && (
                  <div className="row" style={{ marginTop: 22 }}>
                    <button type="button" className="btn ghost mag" onClick={onTryBot}>Provalo adesso <span className="ic"><ChatIcon /></span></button>
                  </div>
                )}
              </div>
              <span className="num">0{i + 1}</span>
            </div>
          ))}
          <div className="scroll-hint" ref={hintRef}>Scorri <span /></div>
        </div>
      </div>
    </>
  )
}
