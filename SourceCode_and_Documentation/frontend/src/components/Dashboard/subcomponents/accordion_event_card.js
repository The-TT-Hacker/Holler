import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Marker from '../../../icons/marker.png'
import ChatBubble from '../../../icons/chat.svg'
import FacebookLogo from '../../../icons/facebook.png'

import { BACKEND } from '../../../constants/roles'
import { Accordion, Card, ToggleButtonGroup, ToggleButton, Image, Button, OverlayTrigger, Tooltip, Badge } from 'react-bootstrap'
import GoogleMapReact from 'google-map-react'

/* @Params
 * int - id: The id of the event to add to the user
 */
const AddEvent = async (id) => {
  const token = localStorage.getItem('token')

  await axios({
    url: BACKEND + "/event/" + id + "/add_interest",
    method: "POST",
    headers: { 'Authorization': `${token}` }
  }).then(response => {
    console.log("Success: ", response)
  }).catch(error => {
    console.log("Error: ", error)
  })

}

/* @Params
 * int - id: The id of the event to remove from the user
 */
const RemoveEvent = async (id) => {
  const token = localStorage.getItem('token')

  await axios({
    url: BACKEND + "/event/" + id + "/remove_interest",
    method: "DELETE",
    headers: { 'Authorization': `${token}` }
  }).then(response => {
    console.log("Success: ", response)
  }).catch(error => {
    console.log("Error: ", error)
  })

}

/* @Params
 * array - eventsGoing: List of events the user has
 * currently marked as going.
 * 
 * int   - id: The id which should be either added
 * or removed from the user's list.
 */
const handleChange = async (setGoing, going, id) => {



  if (going.includes(id)) {
    RemoveEvent(id)
    var newArray = []
    for (var i = 0; i < going.length; i++) {
      if (going[i] !== id)
        newArray.push(going[i])
    }
    setGoing(newArray)
  } else {
    AddEvent(id)
    setGoing(id)
  }

}

/* @Params
 * integer - key
 * integer - index
 * integer - eventID
 * string  - image
 * string  - title
 * string  - subtitle
 * string  - description
 * array   - hosts
 * string  - facebookLink
 * string  - location
 * date    - nextMatch
 * array   - going
 * function - setGoing
 * float   - latitude
 * float   - longitude
 */
const AccordionEventCard = (props) => {

  const AnyReactComponent = ({ text }) => <Image src={Marker} />

  const mapValue = {
    center: {
      lat: props.latitude,
      lng: props.longitude
    },
    zoom: 11
  }

  /* Expansion toggling */
  const showMore = (activate) => {
    if (!activate)
      document.getElementsByClassName("btn-show-more")[props.id].classList.remove("active");
    else
      document.getElementsByClassName("btn-show-more")[props.id].classList.add("active");
  }

  const renderTooltip = (props) => {
    if (Array.isArray(props.going) && props.going.length)
      return (
        <Tooltip id="button-tooltip" {...props.going}>
          Leave this event!
        </Tooltip>
      )
    else
      return (
        <Tooltip id="button-tooltip" {...props.going}>
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

          {
            props.hosts.map((host) => 
              <Badge key={host} className="gradient txt-poppins" pill style={{ fontWeight: "normal", padding: "10px", margin: "5px" }}> {host} </Badge>
            )
          }

          <br /><br />

          <div> <img src={FacebookLogo} alt="facebook-logo" style={{width: "32px", height: "32px"}}/> <a href={props.facebookLink}> View on Facebook </a> <br /><br /> </div>
          <div className="card-title"> Description </div>
          {props.description} <br /><br />
          <div className="card-title">Location</div>
          {props.location} <br /><br />

          {props.mapsValues &&         
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
          }          

        </Card.Body>
      </Accordion.Collapse>

      <Accordion.Toggle as={Card.Footer} eventKey={props.id} onClick={() => showMore(true)}>
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="d-flex flex-row">
              <img alt="" src={ChatBubble} className="spacer-right" />
              <div className="d-flex flex-column">
                <div className="chat-title"> Next Match </div>
                <div className="chat-time"> { props.nextMatch } </div>
              </div>
            </div>
            <div>
              <OverlayTrigger
                placement="left"
                delay={{ show: 50, hide: 100 }}
                overlay={renderTooltip}
              >
                <ToggleButtonGroup className="" type="checkbox" value={props.going} onChange={() => handleChange(props.setGoing, props.going, props.eventID)}>
                  <ToggleButton className="btn-gradient-circle" value={props.eventID}></ToggleButton>
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