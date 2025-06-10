import IconText from '../../icontext/components'
import './index.css'

function Card(props) {
  const { icon, text, children } = props

  return (
    <div className='card'>
      <div className='card-header'>
        <IconText icon={icon} text={text} />
      </div>
      <div className='card-body'>{children}</div>
    </div>
  )
}

export default Card
