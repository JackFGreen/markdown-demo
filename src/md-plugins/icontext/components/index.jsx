import './index.css'

function IconText(props) {
  const { icon, text } = props

  return (
    <div className='icon-text'>
      <img src={icon} />
      <span>{text}</span>
    </div>
  )
}

export default IconText
