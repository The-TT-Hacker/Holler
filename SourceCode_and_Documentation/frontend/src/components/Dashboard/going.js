import React, { useState } from 'react'

import ChatBubble from '../../icons/chat.svg'
import CSESocImage from '../../icons/event-image.svg'
import { Card, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

const Going = () => {

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: "86.5%", overflowY: 'scroll' }}>

      <Card className="card-going">
        <Card.Img src={CSESocImage}/>
        <Card.Body>

          <div className="card-title"> CSESoc Weekly BBQ </div>
          <div className="card-subtitle"> Tomorrow, 12-2pm, John Lion's Garden (J17) </div>

          <br />

          <div className="row">
            <div className="col-1 d-flex justify-content-center align-items-center">
              <img alt="" src={ChatBubble}/>
            </div>
            <div className="col-8">
              <div className="chat-title"> Next Match </div>
              <div className="chat-time"> 21 Hours </div>
            </div>
            <div className="col-3 d-flex justify-content-end">
                <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                  <ToggleButton className="btn-gradient-circle" value={0}></ToggleButton>
                </ToggleButtonGroup>
            </div>
          </div>

        </Card.Body>
      </Card>

      <Card className="card-going">
        <Card.Img src={CSESocImage}/>
        <Card.Body>

          <div className="card-title"> CSESoc Weekly BBQ </div>
          <div className="card-subtitle"> Tomorrow, 12-2pm, John Lion's Garden (J17) </div>

          <br />

          <div className="row">
            <div className="col-1 d-flex justify-content-center align-items-center">
              <img alt="" src={ChatBubble}/>
            </div>
            <div className="col-8">
              <div className="chat-title"> Next Match </div>
              <div className="chat-time"> 21 Hours </div>
            </div>
            <div className="col-3 d-flex justify-content-end">
                <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                  <ToggleButton className="btn-gradient-circle" value={0}></ToggleButton>
                </ToggleButtonGroup>
            </div>
          </div>

        </Card.Body>
      </Card>


    </div>
  )
}

export default Going