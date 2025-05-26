import IconText from '../../icontext/components'
import './index.css'

function Card(props) {
  const { icon, title, children } = props

  return (
    <div className='card'>
      <div className='card-header'>
        <IconText icon={icon} title={title} />
      </div>
      <div className='card-body'>{children}</div>
    </div>
  )
}

export default Card
