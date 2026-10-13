import * as THREE from 'three'
import { motion, smooth, rand } from './motion.js'

// phones get fewer particles: the shapes are smaller on screen and mobile GPUs pay for every additive point
const small = typeof window !== 'undefined' && window.matchMedia('(max-width: 860px)').matches
const N = small ? 4000 : 7000
const GAP = 18
const D = small ? 1800 : 3200
const DEPTH = 70

function shapeBlob() {
  const p = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const u = Math.random(), v = Math.random(), th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1)
    const r = 2.1 + 0.28 * Math.sin(4 * th) * Math.sin(3 * ph) + rand(-0.06, 0.06)
    p[i * 3] = r * Math.sin(ph) * Math.cos(th); p[i * 3 + 1] = r * Math.cos(ph); p[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th)
  }
  return p
}
function shapeSite() {
  const p = new Float32Array(N * 3), W = 2.4, H = 1.6, t = 0.07
  const lines = [[-2.1, 2.1, 0.6], [-2.1, 1.0, 0.2], [-2.1, 1.6, -0.2], [-2.1, 0.5, -0.6], [-2.1, -1.0, -1.05]]
  for (let i = 0; i < N; i++) {
    const r = Math.random(); let x, y
    if (r < 0.38) {
      const s = Math.random(), per = 2 * (W * 2 + H * 2), d = s * per
      if (d < W * 2) { x = -W + d; y = H } else if (d < W * 2 + H * 2) { x = W; y = H - (d - W * 2) } else if (d < W * 4 + H * 2) { x = W - (d - W * 2 - H * 2); y = -H } else { x = -W; y = -H + (d - W * 4 - H * 2) }
      x += rand(-t, t); y += rand(-t, t)
    } else if (r < 0.55) { x = rand(-W + 0.2, W - 0.2); y = rand(1.12, 1.38) } else {
      const L = lines[Math.floor(Math.random() * lines.length)]; x = rand(L[0], L[1]); y = L[2] + rand(-0.04, 0.04)
    }
    p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = rand(-0.05, 0.05)
  }
  return p
}
function shapeDash() {
  const p = new Float32Array(N * 3), hs = [1.1, 1.9, 1.4, 2.5, 1.8, 3.0, 2.2]
  for (let i = 0; i < N; i++) { const k = i % 7, x0 = -2.25 + k * 0.75; p[i * 3] = x0 + rand(-0.22, 0.22); p[i * 3 + 1] = -1.5 + Math.random() * hs[k]; p[i * 3 + 2] = rand(-0.22, 0.22) }
  return p
}
function shapeAI() {
  const p = new Float32Array(N * 3)
  for (let i = 0; i < N; i++) {
    const r = Math.random(); let x, y, z
    if (r < 0.58) { const u = Math.random(), v = Math.random(), th = 2 * Math.PI * u, ph = Math.acos(2 * v - 1), R = 1.55 + rand(-0.03, 0.03); x = R * Math.sin(ph) * Math.cos(th); y = R * Math.cos(ph); z = R * Math.sin(ph) * Math.sin(th) }
    else if (r < 0.85) { const a = Math.random() * Math.PI * 2, R2 = 2.6 + rand(-0.04, 0.04); x = R2 * Math.cos(a); y = R2 * Math.sin(a) * 0.35; z = R2 * Math.sin(a) * 0.9 }
    else { const u2 = Math.random(), v2 = Math.random(), th2 = 2 * Math.PI * u2, ph2 = Math.acos(2 * v2 - 1), R3 = Math.cbrt(Math.random()) * 1.3; x = R3 * Math.sin(ph2) * Math.cos(th2); y = R3 * Math.cos(ph2); z = R3 * Math.sin(ph2) * Math.sin(th2) }
    p[i * 3] = x; p[i * 3 + 1] = y; p[i * 3 + 2] = z
  }
  return p
}
function shapeChat() {
  const p = new Float32Array(N * 3), b = [[-0.7, 1.05, 2.4, 0.7], [0.75, 0, 2.0, 0.7], [-0.6, -1.05, 2.6, 0.7]]
  for (let i = 0; i < N; i++) {
    const B = b[i % 3], w = B[2] / 2, h = B[3] / 2; let x, y, cx
    do { x = rand(-w, w); y = rand(-h, h); cx = Math.max(Math.abs(x) - (w - h), 0) } while (Math.hypot(cx, y) > h)
    p[i * 3] = B[0] + x; p[i * 3 + 1] = B[1] + y; p[i * 3 + 2] = rand(-0.12, 0.12)
  }
  return p
}

const gens = [shapeBlob, shapeSite, shapeDash, shapeAI, shapeChat]
const colors = [[0.82, 0.87, 1.0], [0.38, 0.55, 1.0], [1.0, 0.82, 0.3], [0.55, 0.65, 1.0], [1.0, 0.85, 0.4]]
const offsets = [[2.6, 0.2], [1.8, 0.4], [-1.6, 0.3], [1.7, 0.2], [-1.4, 0.4]]
const echoSections = ['#cosa-faccio', '#progetti', '#chi-sono', '#metodo', '#contatti']
const echoShapes = [1, 2, 3, 4, 0]
const tones = { blue: [0.62, 0.69, 1.0], yellow: [1.0, 0.82, 0.35] }

// Wobble and click pulse run in the vertex shader: the particle buffers never
// change after upload, so the CPU does no per-particle work per frame.
const fx = { uClock: { value: 0 }, uWob: { value: 0 }, uAmp: { value: 0 }, uPt: { value: 0 } }
function wobble(shader) {
  Object.assign(shader.uniforms, fx)
  shader.vertexShader = 'uniform float uClock, uWob, uAmp, uPt;\n' + shader.vertexShader.replace('#include <begin_vertex>', `
    vec3 transformed = position;
    float ph = float(gl_VertexID) * 0.36;
    float len = length(position); len = len > 0.0 ? len : 1.0;
    float push = uAmp * sin(len * 2.2 - uPt * 6.0) / len;
    transformed += vec3(sin(uClock * 0.9 + ph), cos(uClock * 0.7 + ph), sin(uClock * 0.8 + ph * 1.3)) * uWob + position * push;
  `)
}

/**
 * Mounts the particle flight on a canvas. Returns a dispose function.
 * The story's scroll progress and the pointer come from the shared motion store.
 */
export function createScene(canvas, spot) {
  const { reduce } = motion
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, powerPreference: 'high-performance' })
  } catch (e) {
    return () => {}
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  const scene = new THREE.Scene()
  scene.fog = new THREE.FogExp2(0x05060c, 0.035)
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 120)
  camera.position.z = 7.5

  const sprite = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 64
    const g = c.getContext('2d'); const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  })()

  const objs = [], echoes = []
  gens.forEach((gen, i) => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(gen(), 3))
    const m = new THREE.PointsMaterial({ size: 0.05, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: new THREE.Color(...colors[i]) })
    m.onBeforeCompile = wobble
    const pts = new THREE.Points(geo, m)
    pts.position.set(offsets[i][0], offsets[i][1], -i * GAP)
    pts.userData = { alpha: 1 }
    scene.add(pts); objs.push(pts)
  })
  // the scene keeps going: each section below the fold gets its own shape drifting past
  echoSections.forEach((sel, k) => {
    const el = document.querySelector(sel); if (!el) return
    const src = objs[echoShapes[k]]
    const m = new THREE.PointsMaterial({ size: 0.06, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: src.material.color.clone() })
    m.onBeforeCompile = wobble
    const pts = new THREE.Points(src.geometry, m) // same shape, so the geometry is shared
    pts.userData = { alpha: 0.7, el, side: k % 2 ? -1 : 1 }
    pts.scale.setScalar(1.25)
    scene.add(pts); objs.push(pts); echoes.push(pts)
  })

  const dustPos = new Float32Array(D * 3)
  for (let i = 0; i < D; i++) { dustPos[i * 3] = rand(-16, 16); dustPos[i * 3 + 1] = rand(-10, 10); dustPos[i * 3 + 2] = rand(7.5 - DEPTH, 7.5 + 10) }
  const dg = new THREE.BufferGeometry(); dg.setAttribute('position', new THREE.BufferAttribute(dustPos, 3))
  const dustMat = new THREE.PointsMaterial({ size: 0.035, map: sprite, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, color: new THREE.Color(0.62, 0.69, 1.0), opacity: 0.55 })
  const dust = new THREE.Points(dg, dustMat); scene.add(dust)

  let isMobile = false
  function placeEchoes() {
    const st = document.getElementById('story'); if (!st || !echoes.length) return
    const sy = window.scrollY, sr = st.getBoundingClientRect(), vh = window.innerHeight
    const storyEnd = sr.top + sy + sr.height - vh
    echoes.forEach((o) => {
      const r = o.userData.el.getBoundingClientRect(), center = r.top + sy + r.height * 0.45
      const ex = (center - storyEnd) / vh
      o.position.set(isMobile ? o.userData.side * 1.2 : o.userData.side * 3.6, isMobile ? 1.6 : 0.3, -(4 + ex * 0.35) * GAP)
    })
  }
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight
    renderer.setSize(w, h, false); camera.aspect = w / h
    isMobile = w < 860; camera.fov = isMobile ? 62 : 50; camera.updateProjectionMatrix()
    objs.forEach((o, i) => { if (i >= offsets.length) return; o.position.x = isMobile ? 0 : offsets[i][0]; o.position.y = isMobile ? (i === 0 ? 2.5 : 1.9) : offsets[i][1] })
    placeEchoes()
  }
  window.addEventListener('resize', resize); resize()
  const placeTimer = setTimeout(placeEchoes, 400)
  const placeTimer2 = setTimeout(placeEchoes, 2000) // after fonts and images settled

  // section tone drives dust colour and the spotlight
  let toneTarget = tones.blue.slice(); const toneCur = tones.blue.slice()
  const toneIO = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (!e.isIntersecting) return
      const t = e.target.dataset.tone; toneTarget = tones[t].slice()
      if (spot) spot.style.setProperty('--spot', t === 'yellow' ? 'rgba(255,207,74,.09)' : 'rgba(79,124,255,.11)')
    })
  }, { rootMargin: '-40% 0px -40% 0px' })
  document.querySelectorAll('[data-tone]').forEach((s) => toneIO.observe(s))

  let sProgress = 0, sExtra = 0, vel = 0, last = performance.now(), raf = 0
  const mouse = motion.mouse, tmouse = motion.tmouse
  function frame(now) {
    raf = requestAnimationFrame(frame)
    const dt = Math.min((now - last) / 1000, 0.05); last = now; motion.clock += dt
    const clock = motion.clock
    const prev = sProgress + sExtra * 0.35
    sProgress += (motion.progress - sProgress) * (1 - Math.exp(-dt * 4.5))
    sExtra += (motion.extra - sExtra) * (1 - Math.exp(-dt * 4.5))
    vel += (((sProgress + sExtra * 0.35) - prev) / Math.max(dt, 0.001) - vel) * (1 - Math.exp(-dt * 6))
    mouse.x += (tmouse.x - mouse.x) * (1 - Math.exp(-dt * 3)); mouse.y += (tmouse.y - mouse.y) * (1 - Math.exp(-dt * 3))
    for (let c = 0; c < 3; c++) toneCur[c] += (toneTarget[c] - toneCur[c]) * (1 - Math.exp(-dt * 1.5))
    dustMat.color.setRGB(toneCur[0], toneCur[1], toneCur[2])

    const camZ = 7.5 - (sProgress + sExtra * 0.35) * GAP - (reduce ? 0 : clock * 0.25)
    camera.position.set(mouse.x * 1.4, -mouse.y * 0.9, camZ)
    camera.rotation.set(mouse.y * 0.08, -mouse.x * 0.12, vel * 0.015)
    const speed = Math.min(Math.abs(vel), 1.2), after = smooth(4, 4.6, sProgress)
    dustMat.size = 0.035 + speed * 0.08; dustMat.opacity = (0.45 + speed * 0.4) * (1 - after * 0.25)
    let wrapped = false
    for (let i = 0; i < D; i++) {
      const z = dustPos[i * 3 + 2]
      if (z > camZ + 10) { dustPos[i * 3 + 2] = z - DEPTH; dustPos[i * 3] = rand(-16, 16); dustPos[i * 3 + 1] = rand(-10, 10); wrapped = true }
      else if (z < camZ - DEPTH + 10) { dustPos[i * 3 + 2] = z + DEPTH; wrapped = true }
    }
    if (wrapped) dust.geometry.attributes.position.needsUpdate = true

    const pt = (now - motion.pulseAt) / 1000
    const wave = motion.pulse > 0 ? Math.exp(-pt * 1.6) * Math.sin(pt * 9) : 0
    if (pt > 3) motion.pulse = 0
    fx.uClock.value = clock; fx.uWob.value = reduce ? 0 : 0.02; fx.uAmp.value = wave * 0.6; fx.uPt.value = pt
    objs.forEach((o, i) => {
      const dist = camZ - o.position.z
      const vis = smooth(1.2, 6, dist) * (1 - smooth(GAP * 1.1, GAP * 1.9, dist))
      o.visible = vis > 0.002; if (!o.visible) return
      o.material.opacity = vis * o.userData.alpha
      o.material.size = 0.05 + (1 - smooth(0, 10, dist)) * 0.03 + Math.abs(wave) * 0.03
      const idle = reduce ? 0 : clock * 0.12
      const isEcho = i >= offsets.length
      o.rotation.y = (i === 0 || isEcho ? idle * (isEcho ? 0.6 : 1) : Math.sin(idle) * 0.25) + mouse.x * 0.5 + (dist - 4) * 0.03
      o.rotation.x = Math.sin(clock * 0.3) * 0.05 + mouse.y * 0.3 + (i === 2 ? 0.3 : 0)
    })
    renderer.render(scene, camera)
  }
  raf = requestAnimationFrame(frame)

  return () => {
    cancelAnimationFrame(raf)
    clearTimeout(placeTimer); clearTimeout(placeTimer2)
    window.removeEventListener('resize', resize)
    toneIO.disconnect()
    objs.forEach((o) => { o.geometry.dispose(); o.material.dispose() })
    dg.dispose(); dustMat.dispose(); sprite.dispose()
    renderer.dispose()
  }
}
