import React, { useState } from 'react'

import Marker from '../../../icons/marker.png'
import ChatBubble from '../../../icons/chat.svg'
import RSVPMan from '../../../icons/user-check.svg'
import { Accordion, Card, ToggleButtonGroup, ToggleButton, Image } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react'

const AccordionEventCard = (props) => {

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)
  const AnyReactComponent = ({ text }) => <Image src={Marker} />

  const mapValue = {
    center: {
      lat: -33.917,
      lng: 151.232
    },
    zoom: 11
  }

  return (
    <Card className="card-going">

      <Accordion.Toggle as={Card.Header} eventKey={props.id}>
        <Card.Img src={props.image} />
        <div className="card-header-info">
          <div className="card-title"> {props.title} </div>
          <div className="card-subtitle"> {props.subtitle} </div>
        </div>
      </Accordion.Toggle>

      <Accordion.Collapse eventKey={props.id}>
        <Card.Body>
    
          <div className="card-title"> Description </div>
          {props.description} <br /><br />
          <div className="card-title">RSVP &nbsp;<Image src={RSVPMan} /></div>
          {props.rsvp} <br /><br />
          <div className="card-title">Location</div>
          {props.location}
          
          <div className="container" style={{ height: '400px', width: '100%', padding: '0', margin: '0' }}>
              <GoogleMapReact
                bootstrapURLKeys={{key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={mapValue.center}
                defaultZoom={mapValue.zoom}
              >

              <AnyReactComponent
                lat={mapValue.center.lat}
                lng={mapValue.center.lng}
              />

              </GoogleMapReact>
          </div>

        </Card.Body>
      </Accordion.Collapse>

      <Accordion.Toggle as={Card.Footer} eventKey={props.id}>
        <div className="row">
          <div className="col-1 d-flex justify-content-center align-items-center">
            <img alt="" src={ChatBubble} />
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
      </Accordion.Toggle>
    </Card>

  )
}

export default AccordionEventCard