import { useEffect, useRef, useState } from 'react'
import { motion } from '../lib/motion.js'
import { PROJECTS } from '../data/site.js'
import Split from './Split.jsx'
import { ArrowIcon, PrevIcon, NextIcon } from './Icons.jsx'

/** 3D coverflow you can drag, with momentum, rubber band, dots, arrows and keyboard. */
function Gallery({ shots, glow }) {
  const ref = useRef(null)
  const api = useRef(null)
  const [shown, setShown] = useState(0)

  useEffect(() => {
    const g = ref.current
    const cards = Array.from(g.querySelectorAll('.card3d')), n = cards.length
    let idx = 0, shownIdx = 0, lastTouch = 0
    const narrow = () => g.clientWidth < 700
    const render = () => {
      cards.forEach((c, k) => {
        const off = k - idx, a = Math.abs(off), sx = narrow() ? 62 : 52, rot = narrow() ? -22 : -30
        c.style.transform = `translate(-50%,-50%) translateX(${off * sx}%) translateZ(${-a * 300}px) rotateY(${off * rot}deg)`
        c.style.opacity = Math.max(0, 1 - a * 0.3); c.style.filter = `brightness(${Math.max(0.35, 1 - a * 0.35)})`
        c.style.zIndex = String(Math.round(50 - a * 10)); c.style.setProperty('--sheen', String(Math.max(0, 1 - a)))
        c.classList.toggle('front', a < 0.5)
      })
      const r = Math.round(Math.min(Math.max(idx, 0), n - 1))
      if (r !== shownIdx) { shownIdx = r; setShown(r) }
    }
    const go = (i) => { idx = Math.min(Math.max(i, 0), n - 1); render(); lastTouch = performance.now() }
    api.current = { prev: () => go(shownIdx - 1), next: () => go(shownIdx + 1) }
    render()

    let down = false, sx = 0, si = 0, moved = 0, vx = 0, lx = 0, lt = 0
    const onDown = (e) => { down = true; sx = e.clientX; si = idx; moved = 0; vx = 0; lx = e.clientX; lt = e.timeStamp; g.setPointerCapture(e.pointerId); g.classList.add('dragging'); lastTouch = performance.now() }
    const onMove = (e) => {
      if (!down) return
      const dx = e.clientX - sx; moved = Math.max(moved, Math.abs(dx)); const w = g.clientWidth * 0.45; idx = si - dx / w
      const dt = Math.max(e.timeStamp - lt, 1); vx = (e.clientX - lx) / dt; lx = e.clientX; lt = e.timeStamp
      if (idx < 0) idx = idx * 0.35; if (idx > n - 1) idx = (n - 1) + (idx - (n - 1)) * 0.35
      render()
    }
    const onUp = (e) => {
      if (!down) return
      down = false; g.classList.remove('dragging'); const target = idx - vx * 0.9
      if (moved < 6 && e && e.target.closest) { const c = e.target.closest('.card3d'); if (c) { go(+c.dataset.i); return } }
      go(Math.round(target))
    }
    const onKey = (e) => { if (e.key === 'ArrowLeft') { go(shownIdx - 1); e.preventDefault() } if (e.key === 'ArrowRight') { go(shownIdx + 1); e.preventDefault() } }
    g.addEventListener('pointerdown', onDown); g.addEventListener('pointermove', onMove)
    g.addEventListener('pointerup', onUp); g.addEventListener('pointercancel', onUp); g.addEventListener('keydown', onKey)
    window.addEventListener('resize', render)

    let vis = false
    const io = new IntersectionObserver((es) => { vis = es[0].isIntersecting }, { threshold: 0.3 })
    io.observe(g)
    const timer = motion.reduce ? 0 : setInterval(() => { if (vis && !down && performance.now() - lastTouch > 7000) { idx = (shownIdx + 1) % n; render() } }, 3800)

    return () => {
      g.removeEventListener('pointerdown', onDown); g.removeEventListener('pointermove', onMove)
      g.removeEventListener('pointerup', onUp); g.removeEventListener('pointercancel', onUp); g.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', render); io.disconnect(); if (timer) clearInterval(timer)
    }
  }, [])

  return (
    <>
      <div className="gallery" tabIndex={0} aria-label="Galleria schermate, trascina o usa le frecce" style={{ '--glow': glow }} ref={ref}>
        {shots.map((s, i) => (
          <div className="card3d" data-i={i} key={s.src}>
            <img src={s.src} alt={s.alt} loading="lazy" draggable="false" />
            <span className="lbl">{s.label}</span>
          </div>
        ))}
      </div>
      <div className="gnav">
        <button type="button" className="prev" aria-label="Precedente" onClick={() => api.current?.prev()}><PrevIcon /></button>
        <div className="dots">{shots.map((s, i) => <b key={s.src} className={i === shown ? 'on' : ''} />)}</div>
        <button type="button" className="next" aria-label="Successiva" onClick={() => api.current?.next()}><NextIcon /></button>
        <span className="hintd">Trascina per girare</span>
      </div>
    </>
  )
}

export default function Projects() {
  return (
    <section className="block" id="progetti" data-tone="yellow">
      <div className="wrap">
        <div className="head rv">
          <div><span className="eyebrow"><i /> Progetti dal vivo</span><Split>Non parole: <em>cose online.</em></Split></div>
          <p>Due app che puoi aprire e usare adesso. Trascina le schermate per girarle, o clicca su quella che vuoi vedere.</p>
        </div>
        {PROJECTS.map((p) => (
          <div className="project rv" key={p.url}>
            <div className="intro">
              <div><span className="eyebrow"><i /> {p.eyebrow}</span><Split>{p.title[0]}<em>{p.title[1]}</em></Split></div>
              <div>
                <p>{p.text}</p>
                <div className="tags">{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</div>
                <a className="visit mag" href={p.url} target="_blank" rel="noopener">{p.cta} <ArrowIcon /></a>
              </div>
            </div>
            <Gallery shots={p.shots} glow={p.glow} />
          </div>
        ))}
      </div>
    </section>
  )
}
