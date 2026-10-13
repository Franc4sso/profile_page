import Split from './Split.jsx'

export default function About() {
  return (
    <section className="block" id="chi-sono" data-tone="blue">
      <div className="wrap about">
        <div className="portrait-wrap rv">
          <div className="portrait" id="portrait">
            <img src="/img/francesco.jpg" alt="Francesco Cassano" loading="lazy" />
            <div className="cap"><div><b>Francesco Cassano</b><small>Sviluppatore web</small></div></div>
          </div>
          <div className="float f1"><i style={{ background: '#61dafb' }} />React</div>
          <div className="float f2"><i style={{ background: '#ff2d20' }} />Laravel</div>
          <div className="float f3"><i style={{ background: 'var(--yellow)' }} />Agenti AI</div>
        </div>
        <div className="rv">
          <span className="eyebrow"><i /> Chi sono</span>
          <Split>Una persona sola, <em>dall'idea</em> al sito online.</Split>
          <p><strong>Sviluppo software per chi ha un'attività da mandare avanti.</strong> Lavoro con React per tutto quello che vedi sullo schermo e con Laravel per tutto quello che ci sta dietro.</p>
          <p>Parlo la tua lingua, non quella dei programmatori. Mi racconti come lavori, io ti dico cosa si può costruire e quanto costa. Poi lo costruisco io, senza passaggi tra agenzie e fornitori diversi.</p>
        </div>
      </div>
    </section>
  )
}
