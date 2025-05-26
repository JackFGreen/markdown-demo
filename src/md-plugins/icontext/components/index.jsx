import './index.css'

function IconText(props) {
  const { icon, title } = props

  return (
    <div className='icon-text'>
      <img src={icon} />
      <span>{title}</span>
    </div>
  )
}

export default IconText
