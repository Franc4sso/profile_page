import { motion } from './motion.js'

/**
 * Page-wide behaviours that work on classes rather than on single components:
 * scroll reveals (.rv), live demos (.demo), 3D tilt (.t3d, .portrait) and magnetic buttons (.mag).
 * Runs once after the whole page is mounted. Returns a cleanup function.
 */
export function enhancePage(root = document) {
  const cleanups = []
  const { reduce, hover } = motion

  // reveals
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
  }, { rootMargin: '0px 0px -8% 0px' })
  root.querySelectorAll('.rv').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 60 + 'ms'; io.observe(el) })
  cleanups.push(() => io.disconnect())

  // live mini demos: run only while on screen
  const demoIO = new IntersectionObserver((es) => {
    es.forEach((e) => e.target.classList.toggle('play', e.isIntersecting))
  }, { threshold: 0.25 })
  root.querySelectorAll('.demo').forEach((d) => demoIO.observe(d))
  cleanups.push(() => demoIO.disconnect())

  if (!reduce && hover) {
    // 3D tilt on the portrait (and anything tagged .t3d)
    root.querySelectorAll('.t3d,.portrait').forEach((card) => {
      const floats = () => document.querySelectorAll('.float')
      const move = (e) => {
        const r = card.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
        card.style.transition = 'transform .12s var(--ease)'
        card.style.transform = `rotateX(${-y * 10}deg) rotateY(${x * 12}deg) translateZ(10px)`
        const inner = card.querySelector('.in')
        if (inner) { inner.style.setProperty('--x', e.clientX - r.left + 'px'); inner.style.setProperty('--y', e.clientY - r.top + 'px') }
        if (card.id === 'portrait') floats().forEach((f, i) => { f.style.setProperty('--fx', x * (18 + i * 10) + 'px'); f.style.setProperty('--fy', y * (18 + i * 10) + 'px') })
      }
      const leave = () => {
        card.style.transition = 'transform .9s var(--ease)'; card.style.transform = ''
        floats().forEach((f) => { f.style.setProperty('--fx', '0px'); f.style.setProperty('--fy', '0px') })
      }
      card.addEventListener('pointermove', move); card.addEventListener('pointerleave', leave)
      cleanups.push(() => { card.removeEventListener('pointermove', move); card.removeEventListener('pointerleave', leave) })
    })
    // magnetic buttons
    root.querySelectorAll('.mag').forEach((b) => {
      const move = (e) => { const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2); b.style.transform = `translate(${dx * 0.22}px,${dy * 0.28}px)` }
      const leave = () => { b.style.transform = '' }
      b.addEventListener('pointermove', move); b.addEventListener('pointerleave', leave)
      cleanups.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', leave) })
    })
  }

  return () => cleanups.forEach((fn) => fn())
}
