import React from 'react'

import { PageTitle } from './subcomponents'
import { updateScrollability } from '../../constants'

const Matches = (props) => {

  updateScrollability(props.scroll)
  
  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%'}}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>
        <PageTitle title="Chats" />
      </div>
    </div>
  )
}

export default Matches