const LINKS = [
  ['#giornata', 'Una giornata'],
  ['#cosa-faccio', 'Cosa faccio'],
  ['#progetti', 'Progetti'],
  ['#chi-sono', 'Chi sono'],
  ['#metodo', 'Metodo'],
]

export default function Nav() {
  return (
    <nav className="nav">
      <div className="pill">
        <span className="brand">Francesco Cassano</span>
        <span className="links">
          {LINKS.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </span>
        <a className="cta" href="#contatti">WhatsApp</a>
      </div>
    </nav>
  )
}
