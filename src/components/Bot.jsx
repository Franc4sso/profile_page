import { useEffect, useRef, useState } from 'react'
import { motion } from '../lib/motion.js'
import { answer, SUGGESTIONS, GREETING } from '../data/kb.js'
import { SendIcon, CloseIcon } from './Icons.jsx'

/** Floating demo assistant: scripted answers, same look as a real one. */
export default function Bot({ open, onOpen, onClose }) {
  const [msgs, setMsgs] = useState([])       // {who:'me'|'ai', html}
  const [chips, setChips] = useState([])
  const [typing, setTyping] = useState(false)
  const [text, setText] = useState('')
  const log = useRef(null)
  const input = useRef(null)
  const greeted = useRef(false)
  const busy = useRef(false)

  useEffect(() => {
    if (!open) return
    if (!greeted.current) { greeted.current = true; setMsgs([{ who: 'ai', html: GREETING }]); setChips(SUGGESTIONS.slice(0, 3)) }
    const t = setTimeout(() => input.current?.focus(), 300)
    const esc = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', esc)
    return () => { clearTimeout(t); document.removeEventListener('keydown', esc) }
  }, [open, onClose])

  useEffect(() => { if (log.current) log.current.scrollTop = log.current.scrollHeight }, [msgs, typing])

  const ask = (q) => {
    if (busy.current || !q.trim()) return
    busy.current = true
    setMsgs((m) => [...m, { who: 'me', text: q.replace(/[<>&]/g, '') }])
    setChips([]); setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { who: 'ai', html: answer(q) }])
      setChips(SUGGESTIONS.filter((x) => x !== q).slice(0, 3))
      busy.current = false
    }, motion.reduce ? 200 : 700 + Math.min(q.length * 25, 900))
  }
  const submit = (e) => { e.preventDefault(); const q = text; setText(''); ask(q) }

  return (
    <>
      <button type="button" className="bot-fab" aria-label="Apri l'assistente" aria-expanded={open} onClick={open ? onClose : onOpen}>
        <span className="pulse" /><span className="av">FC</span><span className="lbl">Chiedi all'assistente</span>
      </button>
      <div className={`bot${open ? ' open' : ''}`} role="dialog" aria-label="Assistente demo">
        <div className="hd">
          <span className="av">FC</span>
          <div><b>Assistente di Francesco</b><small><i /> Demo dal vivo · risponde subito</small></div>
          <button type="button" aria-label="Chiudi" onClick={onClose}><CloseIcon /></button>
        </div>
        <div className="log" ref={log}>
          {msgs.map((m, i) => m.who === 'ai'
            ? <div className="msg ai" key={i} dangerouslySetInnerHTML={{ __html: m.html }} />
            : <div className="msg me" key={i}>{m.text}</div>)}
          {typing && <div className="msg ai typing"><i /><i /><i /></div>}
        </div>
        <div className="chips">{chips.map((c) => <button type="button" key={c} onClick={() => ask(c)}>{c}</button>)}</div>
        <form onSubmit={submit}>
          <input ref={input} type="text" placeholder="Scrivi una domanda..." autoComplete="off" maxLength={200} value={text} onChange={(e) => setText(e.target.value)} />
          <button type="submit" aria-label="Invia"><SendIcon /></button>
        </form>
        <div className="note">Questo è lo stesso tipo di assistente che posso mettere sul tuo sito o su WhatsApp.</div>
      </div>
    </>
  )
}
