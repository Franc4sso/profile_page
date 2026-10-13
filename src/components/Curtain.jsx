import { useEffect, useState } from 'react'
import { motion } from '../lib/motion.js'

const NAME = 'Francesco Cassano'

export default function Curtain() {
  const [gone, setGone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => { setGone(true); document.body.classList.add('ready') }, motion.reduce ? 200 : 1500)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`curtain${gone ? ' gone' : ''}`} aria-hidden="true">
      <div className="name">
        {NAME.split('').map((ch, i) => (
          ch === ' '
            ? <span key={i} className="sp" style={{ animationDelay: `${i * 35}ms` }} />
            : <span key={i} style={{ animationDelay: `${i * 35}ms` }}>{ch}</span>
        ))}
      </div>
      <div className="line"><i /></div>
    </div>
  )
}
