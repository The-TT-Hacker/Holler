import React, { useState } from 'react'

// Images
import Marker from '../../../icons/marker.png'
import ChatBubble from '../../../icons/chat.svg'
import RSVPMan from '../../../icons/user-check.svg'

// Components
import { Accordion, Card, ToggleButtonGroup, ToggleButton, Image, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
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

  /* Expansion toggling */
  const showMore = (activate) => {
    if (!activate)
      document.getElementsByClassName("btn-show-more")[props.id - 1].classList.remove("active");
    else
      document.getElementsByClassName("btn-show-more")[props.id - 1].classList.add("active");
  }

  const renderTooltip = (values) => {
    return (
      <Tooltip id="button-tooltip" {...values}>
        Join this event!
      </Tooltip>
    )
  }

  return (
    <Card className="card-going" key={props.id}>

      <Accordion.Toggle as={Card.Header} eventKey={props.id} onClick={() => showMore(true)}>
        <div className="accordion-image-container">
          <img src={props.image} alt="event" className="accordion-image" />
        </div>
        <div className="card-header-info">
          <div className="card-title"> {props.title} </div>
          <div className="card-subtitle"> {props.subtitle} </div>
        </div>
      </Accordion.Toggle>

      <Accordion.Collapse eventKey={props.id} onExit={() => showMore(false)}>
        <Card.Body>

          <div className="card-title"> Description </div>
          {props.descripton} <br /><br />
          <div className="card-title">RSVP &nbsp;<Image src={RSVPMan} /></div>
          {props.rsvp} <br /><br />
          <div className="card-title">Location</div>
          {props.location} <br />

          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
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

      <Accordion.Toggle as={Card.Footer} eventKey={props.id} onClick={() => showMore(true)}>
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="d-flex flex-row">
              <img alt="" src={ChatBubble} className="spacer-right" />
              <div className="d-flex flex-column">
                <div className="chat-title"> Next Match </div>
                <div className="chat-time"> 21 Hours </div>
              </div>
            </div>
            <div>
              <OverlayTrigger
                placement="left"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip}
              >
                <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                  <ToggleButton className="btn-gradient-circle" value={0}></ToggleButton>
                </ToggleButtonGroup>
              </OverlayTrigger>

            </div>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center spacer-down">
          <Button className="btn-show-more" />
        </div>
      </Accordion.Toggle>
    </Card>

  )
}

export default AccordionEventCard