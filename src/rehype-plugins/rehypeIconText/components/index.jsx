import { useState } from 'react'
import './index.css'

function IconText(props) {
  const { icon, title, children } = props

  const [count, setCount] = useState(0)

  return (
    <div className='icon-text'>
      <img src={icon} />
      <span>{title}</span>
      {children}

      <button onClick={() => setCount(count + 1)}>count: {count}</button>
    </div>
  )
}

export default IconText
