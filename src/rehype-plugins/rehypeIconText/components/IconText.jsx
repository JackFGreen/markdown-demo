import { useEffect } from 'react'
import './IconText.css'
import { useState } from 'react'

function IconText(props) {
  console.log('>>>IconText', props)
  const { icon, title, children } = props

  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('>>>IconText useEffect')
  }, [])

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
