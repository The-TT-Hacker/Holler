import React from 'react'

import Navigation from './navigation'
import AppDescription from './app-description'
import { updateScrollability } from '../../constants'

const Landing = (props) => {
  
  updateScrollability(props.scroll)

  return (
    <div className="landing">
      <Navigation />
      <AppDescription />
    </div>
  )
}

export default Landing
