// Small animated mockups. They loop while on screen (class "play", set by enhancePage)
// and also run once inside the day screen (class "on" on the pane).
const Bar = () => <div className="br"><i /><i /><i /></div>
const d = (s) => ({ '--d': s })

export function DemoSite({ chrome = true, extra = 'ok' }) {
  return (
    <div className="demo d-site">
      {chrome && <Bar />}
      <div className="pg">
        <div className="nv pop" /><div className="hl pop" style={d('.3s')} /><div className="hl s pop" style={d('.5s')} />
        <div className="cards"><b className="pop" style={d('.8s')} /><b className="pop" style={d('1s')} /><b className="pop" style={d('1.2s')} /></div>
      </div>
      {extra === 'ok' && <div className="ok pop" style={d('2.2s')}>Nuova richiesta dal sito</div>}
    </div>
  )
}

export function DemoDash() {
  return (
    <div className="demo d-dash">
      <Bar />
      <div className="pg">
        <div className="tbl">
          <Row name="Rossi Srl" order="1042" delay=".9s" />
          <Row name="Bar Centrale" order="1043" delay="1.6s" pop=".25s" />
          <Row name="Studio Verdi" order="1044" delay="2.3s" pop=".5s" />
        </div>
        <Bars />
      </div>
    </div>
  )
}
export const Row = ({ name, order, delay, pop = '0s' }) => (
  <div className="row pop" style={d(pop)}>{name}<small>Ordine {order}</small><span className="st" style={d(delay)}><i className="w">In attesa</i><i className="p">Pagata</i></span></div>
)
export const Bars = ({ step = 0.15, start = 0.3 }) => (
  <div className="bars">
    {[0.35, 0.55, 0.42, 0.7, 0.62, 0.88].map((h, i) => <b key={i} style={{ '--h': h, '--d': `${(start + i * step).toFixed(2)}s` }} />)}
  </div>
)

export function DemoAgent({ title = 'Email in arrivo', base = 1.1 }) {
  const f = (k) => `${(base + k * 0.3).toFixed(1)}s`
  const t = (k) => `${(base + 0.2 + k * 0.3).toFixed(1)}s`
  return (
    <div className="demo d-agent">
      <Bar />
      <div className="pg">
        <div className="mail pop"><b>{title}</b><span>Buongiorno, ci servono 40 sedie modello Vera entro il 20 giugno. Potete farci un preventivo? Rossi Srl</span></div>
        <div className="out">
          <div className="f pop" style={d(f(0))}><em>Cliente</em><b style={d(t(0))}>Rossi Srl</b></div>
          <div className="f pop" style={d(f(1))}><em>Prodotto</em><b style={d(t(1))}>Sedia Vera</b></div>
          <div className="f pop" style={d(f(2))}><em>Quantità</em><b style={d(t(2))}>40</b></div>
          <div className="f pop" style={d(f(3))}><em>Entro</em><b style={d(t(3))}>20 giugno</b></div>
          <div className="done pop" style={d(`${(base + 1.9).toFixed(1)}s`)}>Preventivo pronto da firmare</div>
        </div>
      </div>
    </div>
  )
}

export function DemoChat() {
  return (
    <div className="demo d-chat">
      <Bar />
      <div className="pg">
        <span className="t">03:12</span>
        <div className="b me pop">Siete aperti domenica? Vorrei prenotare per 6</div>
        <div className="dots"><i /><i /><i /></div>
        <div className="b ai pop" style={d('2.3s')}>Sì, domenica dalle 12 alle 15. Ho un tavolo da 6 alle 13: te lo tengo?</div>
        <div className="b me pop" style={d('3.6s')}>Perfetto, grazie!</div>
        <div className="b ai pop" style={d('4.6s')}>Prenotato. A domenica!</div>
      </div>
    </div>
  )
}
