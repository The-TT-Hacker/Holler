import React from 'react'
import { updateScrollability } from '../../constants'

const Matches = (props) => {

  updateScrollability(props.scroll)
  
  return (
    <div>
      <div className="txt-bold"> Matches </div>
    </div>
  )
}

export default Matches