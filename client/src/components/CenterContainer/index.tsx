import React from 'react'
import { 
  Logo,
  FeedbackButton,
} from '../../components'
import './Styles/css/style.css'

export default function CenterContainer() {
  const render = () => (
    <div className='CenterContainer'>
      { Logo().render() }
      { FeedbackButton().render() }
    </div>
  )

  return {
    render,
  }
}
