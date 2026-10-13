import React from 'react'

/**
 * Heading whose words rise one by one when its `.rv` ancestor (or itself) gets the `in` class.
 * Usage: <Split as="h2" className="rv">Quattro cose. <em>Fatte bene.</em></Split>
 */
export default function Split({ as: Tag = 'h2', className = '', children, ...rest }) {
  let i = 0
  const words = (text) =>
    text.split(/(\s+)/).filter(Boolean).map((part, k) =>
      /^\s+$/.test(part) ? part : (
        <span className="w" key={k}><span style={{ transitionDelay: `${i++ * 70}ms` }}>{part}</span></span>
      ),
    )
  const nodes = React.Children.map(children, (ch) => {
    if (typeof ch === 'string') return words(ch)
    if (React.isValidElement(ch)) return React.cloneElement(ch, {}, words(String(ch.props.children)))
    return ch
  })
  return <Tag className={`split ${className}`.trim()} {...rest}>{nodes}</Tag>
}
