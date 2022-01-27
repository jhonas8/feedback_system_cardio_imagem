import './Styles/css/styles.css'
import Types from '../../types/AvaliationFrameTypes'

export default function AvaliationFrame(props: Types.Props) {
  const render = () =>(
      <div className='AvaliationFrame'>
          <iframe title='feedback-colector'>

          </iframe>
      </div>
  )

  return {
      render
  }
}