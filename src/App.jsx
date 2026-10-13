import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from './lib/motion.js'
import { createScene } from './lib/scene.js'
import { enhancePage } from './lib/enhance.js'
import Curtain from './components/Curtain.jsx'
import Nav from './components/Nav.jsx'
import Story from './components/Story.jsx'
import Day from './components/Day.jsx'
import WhatIDo from './components/WhatIDo.jsx'
import Projects from './components/Projects.jsx'
import About from './components/About.jsx'
import Method from './components/Method.jsx'
import Contact from './components/Contact.jsx'
import Bot from './components/Bot.jsx'

const MARQUEE = ['Siti web', 'Gestionali su misura', 'Agenti AI', 'Chatbot WhatsApp', 'React', 'Laravel', 'Assistenza continua']

export default function App() {
  const canvas = useRef(null)
  const spot = useRef(null)
  const [botOpen, setBotOpen] = useState(false)
  const openBot = useCallback(() => setBotOpen(true), [])
  const closeBot = useCallback(() => setBotOpen(false), [])

  // pointer drives parallax and the spotlight; the scene and the page behaviours mount once
  useEffect(() => {
    const move = (e) => {
      motion.tmouse.x = e.clientX / window.innerWidth - 0.5
      motion.tmouse.y = e.clientY / window.innerHeight - 0.5
      spot.current.style.transform = `translate3d(${e.clientX - 640}px,${e.clientY - 640}px,0)`
    }
    window.addEventListener('pointermove', move, { passive: true })
    const disposeScene = createScene(canvas.current, spot.current)
    const disposeEnhance = enhancePage()
    return () => { window.removeEventListener('pointermove', move); disposeScene(); disposeEnhance() }
  }, [])

  return (
    <>
      <canvas id="scene" ref={canvas} />
      <div className="spot" ref={spot} />
      <div className="grain" />
      <Curtain />
      <Bot open={botOpen} onOpen={openBot} onClose={closeBot} />
      <Nav />
      <Story onTryBot={openBot} />
      <div className="below">
        <div className="marquee" aria-hidden="true">
          <div className="track">
            {[...MARQUEE, ...MARQUEE].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>
        <Day />
        <WhatIDo />
        <Projects />
        <About />
        <Method />
        <Contact />
      </div>
    </>
  )
}
