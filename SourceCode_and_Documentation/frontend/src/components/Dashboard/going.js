import React, { useState } from 'react'

import ChatBubble from '../../icons/chat.svg'
import CSESocImage from '../../icons/event-image.svg'
import RSVPMan from '../../icons/user-check.svg'
import { Accordion, Button, Card, Image, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

const Going = () => {

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  const godata = {

      "event": [
          {
            "name":"CSESoc Weekly BBQ",
            "detail":"Tomorrow, 12-2pm, John Lion's Garden (J17)",
            "description":"CSESoc will continue holding our much-loved free weekly BBQs and would love for you all to come along."
                          +"There will be opportunities for networking with industry reps, learn about possible internships and make friends!"
                          +"To be in the loop for sponsored BBQs make sure to click \"Going\" to this event and stay updated!",
            "rsvp":72,

          }
      ]


  }



  return (

    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: "86.5%", overflowY: 'scroll',  }}>

      <Card className="card-going">
        <Card.Img src={CSESocImage}/>
        <Card.Body>

          <div className="card-title"> {godata.event[0].name} </div>
          <div className="card-subtitle"> {godata.event[0].detail} </div>

          <br />

          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  More Details
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">

                <Card.Body>

                  <div className="card-title"> Description </div>
                  {godata.event[0].description}

                  <br /><br />

                  <div className="card-title">RSVP &nbsp;<Image src={RSVPMan}/></div>
                    {godata.event[0].rsvp} going

                  <br /><br />

                  <div className="card-title">Location</div>


                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>

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

          <Accordion defaultActiveKey="1">
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  More Details
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">

                <Card.Body>

                  <div className="card-title"> Description </div>
                  CSESoc will continue holding our much-loved free weekly BBQs and would love for you all to come along.
                  There will be opportunities for networking with industry reps, learn about possible internships and make friends!
                  To be in the loop for sponsored BBQs make sure to click "Going" to this event and stay updated!

                  <br /><br />

                  <div className="card-title">RSVP &nbsp;<Image src={RSVPMan}/></div>
                    72 going

                  <br /><br />

                  <div className="card-title">Location</div>


                </Card.Body>
              </Accordion.Collapse>
            </Card>
        </Accordion>

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
