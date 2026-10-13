import { useEffect, useRef } from 'react'
import { motion, smooth } from '../lib/motion.js'
import { MOMENTS } from '../data/site.js'
import { Row, Bars } from './Demos.jsx'

const d = (s) => ({ '--d': s })

/** Sticky stage: scroll drives a clock, the active moment and the shape of one screen. */
export default function Day() {
  const sec = useRef(null)
  const screen = useRef(null)
  const hh = useRef(null)
  const mm = useRef(null)
  const fill = useRef(null)
  const tally = useRef(null)

  useEffect(() => {
    const el = sec.current, scr = screen.current
    const moments = Array.from(el.querySelectorAll('.moment'))
    const panes = Array.from(scr.querySelectorAll('.pane'))
    const tallyEls = Array.from(tally.current.querySelectorAll('b'))
    const times = MOMENTS.map((m) => m.t)
    const cur = [0, 0, 0]
    let active = 0, inView = false, lastH = -1, lastM = -1, raf = 0

    const setActive = (idx) => {
      active = idx
      moments.forEach((m, i) => m.classList.toggle('on', i === idx))
      const pane = MOMENTS[idx].pane
      scr.dataset.pane = pane
      panes.forEach((p) => p.classList.toggle('on', p.dataset.pane === pane))
    }
    const update = () => {
      const r = el.getBoundingClientRect(), vh = window.innerHeight, total = r.height - vh
      inView = r.bottom > 0 && r.top < vh
      if (!inView) return
      const p = Math.min(Math.max(-r.top / total, 0), 1), seg = p * (times.length - 1)
      const k = Math.min(Math.floor(seg), times.length - 2), f = seg - k, e = smooth(0.3, 0.7, f)
      const t = times[k] + (times[k + 1] - times[k]) * e
      let H = Math.floor(t) % 24, M = Math.round((t - Math.floor(t)) * 60)
      if (M === 60) { M = 0; H = (H + 1) % 24 }
      if (H !== lastH) { hh.current.textContent = (H < 10 ? '0' : '') + H; lastH = H }
      if (M !== lastM) { mm.current.textContent = (M < 10 ? '0' : '') + M; lastM = M }
      fill.current.style.transform = `scaleX(${p})`
      const idx = Math.round(seg)
      if (idx !== active) setActive(idx)
    }
    const tick = () => {
      if (inView) {
        const target = MOMENTS[active].counts
        tallyEls.forEach((b, i) => { cur[i] += (target[i] - cur[i]) * 0.07; const v = String(Math.round(cur[i])); if (b.textContent !== v) b.textContent = v })
        if (!motion.reduce) scr.style.transform = `rotateY(${-motion.mouse.x * 14}deg) rotateX(${motion.mouse.y * 10}deg) translateY(${Math.sin(motion.clock * 0.9) * 6}px)`
      }
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    update(); raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('scroll', update); window.removeEventListener('resize', update); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="day" id="giornata" data-tone="blue" aria-label="Una giornata con i tuoi strumenti" ref={sec}>
      <div className="dstage">
        <div className="wrap dgrid">
          <div className="dtext">
            <span className="eyebrow"><i /> Una giornata con i miei strumenti</span>
            <div className="clock" aria-live="off"><b ref={hh}>08</b><i>:</i><b ref={mm}>10</b></div>
            <div className="moments">
              {MOMENTS.map((m, i) => (
                <div className={`moment${i === 0 ? ' on' : ''}`} key={m.pane}>
                  <small>{m.tag}</small><h3>{m.title}</h3><p>{m.text}</p>
                </div>
              ))}
            </div>
            <div className="tally" aria-label="Giornata di esempio" ref={tally}>
              <div><b>0</b><span>richieste dal sito</span></div>
              <div><b>0</b><span>preventivi pronti</span></div>
              <div><b>0</b><span>prenotazioni di notte</span></div>
              <em>giornata di esempio</em>
            </div>
          </div>

          <div className="dscreen-wrap">
            <div className="dscreen" data-pane="site" ref={screen}>
              <div className="br"><i /><i /><i /><span className="url">latuaattivita.it</span></div>

              <div className="pane d-site on" data-pane="site">
                <div className="pg">
                  <div className="nv pop" /><div className="hl pop" style={d('.15s')} /><div className="hl s pop" style={d('.3s')} />
                  <div className="cards"><b className="pop" style={d('.45s')} /><b className="pop" style={d('.55s')} /><b className="pop" style={d('.65s')} /></div>
                </div>
                <div className="notif pop" style={d('.9s')}><b>3</b> nuove richieste<small>arrivate tra le 23:40 e le 06:15</small></div>
              </div>

              <div className="pane d-agent" data-pane="agent">
                <div className="pg">
                  <div className="mail pop"><b>Email in arrivo · 09:31</b><span>Buongiorno, ci servono 40 sedie modello Vera entro il 20 giugno. Potete farci un preventivo? Rossi Srl</span></div>
                  <div className="out">
                    <div className="f pop" style={d('.5s')}><em>Cliente</em><b style={d('.6s')}>Rossi Srl</b></div>
                    <div className="f pop" style={d('.7s')}><em>Prodotto</em><b style={d('.8s')}>Sedia Vera</b></div>
                    <div className="f pop" style={d('.9s')}><em>Quantità</em><b style={d('1s')}>40</b></div>
                    <div className="f pop" style={d('1.1s')}><em>Entro</em><b style={d('1.2s')}>20 giugno</b></div>
                    <div className="done pop" style={d('1.7s')}>Preventivo pronto da firmare</div>
                  </div>
                </div>
              </div>

              <div className="pane d-dash" data-pane="dash">
                <div className="pg">
                  <div className="tbl">
                    <Row name="Rossi Srl" order="1042" delay=".9s" />
                    <Row name="Bar Centrale" order="1043" delay="1.3s" pop=".15s" />
                    <Row name="Studio Verdi" order="1044" delay="1.7s" pop=".3s" />
                    <div className="row pop stock" style={d('.45s')}>Magazzino<small>aggiornato alle 12:46</small><span className="ok">−3 pezzi</span></div>
                  </div>
                  <Bars step={0.1} />
                </div>
              </div>

              <div className="pane d-site" data-pane="site2">
                <div className="pg">
                  <div className="nv pop" /><div className="hl pop" style={d('.15s')} /><div className="hl s pop" style={d('.3s')} />
                  <div className="cards"><b className="pop" style={d('.45s')} /><b className="pop" style={d('.55s')} /><b className="pop" style={d('.65s')} /></div>
                </div>
                <div className="widget pop" style={d('.9s')}><div className="wb">Ciao! Siete aperti stasera?</div><div className="wb ai">Sì, fino alle 23. Vuoi prenotare?</div></div>
              </div>

              <div className="pane d-chat" data-pane="chat">
                <div className="pg">
                  <span className="t">03:12</span>
                  <div className="b me pop">Siete aperti domenica? Vorrei prenotare per 6</div>
                  <div className="b ai pop" style={d('.8s')}>Sì, domenica dalle 12 alle 15. Ho un tavolo da 6 alle 13: te lo tengo?</div>
                  <div className="b me pop" style={d('1.5s')}>Perfetto, grazie!</div>
                  <div className="b ai pop" style={d('2.1s')}>Prenotato a nome Marco, 6 persone, domenica alle 13. A presto!</div>
                </div>
              </div>
            </div>
            <div className="dshadow" />
          </div>
        </div>
        <div className="dbar" aria-hidden="true"><span>08:00</span><span>12:00</span><span>18:00</span><span>03:00</span><i ref={fill} /></div>
      </div>
    </section>
  )
}
