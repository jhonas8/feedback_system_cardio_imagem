import React from 'react'
import { Logo } from '../../components'
import './Styles/css/style.css'

export default function CenterContainer() {
  return <div className='CenterContainer'>
      { Logo().render() }
  </div>
}
