import { useEffect, useRef, useState } from 'react'
import { motion } from '../lib/motion.js'
import { SERVICES } from '../data/site.js'
import Split from './Split.jsx'
import { DemoSite, DemoDash, DemoAgent, DemoChat } from './Demos.jsx'

const DEMO = { site: DemoSite, dash: DemoDash, agent: DemoAgent, chat: DemoChat }

/** Big typographic list. Rows expand on tap; on desktop a live preview follows the pointer. */
export default function WhatIDo() {
  const [open, setOpen] = useState(null)
  const ghost = useRef(null)
  const showing = useRef(null)

  // ghost follows the pointer with a little lag and tilt (hover devices only)
  useEffect(() => {
    if (!motion.hover) return
    let gx = 0, gy = 0, tx = 0, ty = 0, pvx = 0, raf = 0
    const g = ghost.current
    const move = (e) => { tx = e.clientX; ty = e.clientY }
    const loop = () => {
      raf = requestAnimationFrame(loop)
      if (!g.classList.contains('show')) { gx = tx; gy = ty; return } // nothing to follow while hidden
      const dx = tx - gx; gx += dx * 0.14; gy += (ty - gy) * 0.14; pvx += (dx * 0.12 - pvx) * 0.1
      g.style.left = gx + 'px'; g.style.top = gy + 'px'; g.style.setProperty('--r', Math.max(-8, Math.min(8, pvx)) + 'deg')
    }
    window.addEventListener('pointermove', move, { passive: true }); raf = requestAnimationFrame(loop)
    return () => { window.removeEventListener('pointermove', move); cancelAnimationFrame(raf) }
  }, [])

  const hide = () => { ghost.current.classList.remove('show'); showing.current = null }
  const enter = (e, pane) => {
    if (!motion.hover || open === pane) return
    const demo = e.currentTarget.closest('.item').querySelector('.demo')
    const g = ghost.current
    g.innerHTML = ''; const clone = demo.cloneNode(true); clone.classList.add('play'); g.appendChild(clone)
    g.classList.add('show'); showing.current = pane
  }
  const leave = (pane) => { if (showing.current === pane) hide() }
  const toggle = (pane) => { setOpen(open === pane ? null : pane); hide() }

  return (
    <section className="block" id="cosa-faccio" data-tone="yellow">
      <div className="wrap">
        <div className="head rv">
          <div><span className="eyebrow"><i /> Cosa faccio</span><Split>Quattro cose. <em>Fatte bene.</em></Split></div>
          <p>Passa sopra con il mouse, o tocca, per vedere com'è fatto. Tutto costruito da me, con React davanti e Laravel dietro.</p>
        </div>
        <div className="list">
          {SERVICES.map((s) => {
            const Demo = DEMO[s.pane]
            const isOpen = open === s.pane
            return (
              // the reveal class lives on an inner wrapper: React rewrites the item's className
              // when it opens, and that would wipe the "in" class the observer adds.
              <div className={`item${isOpen ? ' open' : ''}`} key={s.pane}>
                <div className="rv">
                  <button type="button" className="trig" aria-expanded={isOpen} onClick={() => toggle(s.pane)} onPointerEnter={(e) => enter(e, s.pane)} onPointerLeave={() => leave(s.pane)}>
                    <span className="n">{s.n}</span><span className="ttl">{s.title}</span><span className="for">{s.who}</span><span className="plus" />
                  </button>
                  <div className="more"><div className="more-in"><div>
                    <div className="prev"><Demo /></div>
                    <div className="desc"><p>{s.text}</p><p className="tags">{s.tags}</p></div>
                  </div></div></div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="peek" ref={ghost} aria-hidden="true" />
      </div>
    </section>
  )
}
