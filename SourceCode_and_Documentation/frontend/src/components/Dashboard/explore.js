import React, { useState } from 'react'

import { ToggleButtonGroup, ToggleButton, Carousel, Card } from 'react-bootstrap'
import EventImage from '../../icons/event-image.svg'
import EventImage2 from '../../icons/event-image-2.svg'
import ChatBubble from '../../icons/chat.svg'
import '../../styles/events.css'

const Explore = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '80%' }}>
      
      <Carousel activeIndex={index} onSelect={handleSelect} slide={true} interval={null}>

        <Carousel.Item className="carousel-item">

          <Card>
            <Card.Img src={EventImage} />
            <Card.Body>

              <div className="card-title"> CSESoc Weekly BBQ </div>
              <div className="card-subtitle"> Tomorrow, 12-2pm, John Lion's Garden (J17) </div>

              <br />

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

            </Card.Body>
          </Card>
        </Carousel.Item>

        <Carousel.Item className="carousel-item">

          <Card>
            <Card.Img src={EventImage2} />
            <Card.Body>
              <div className="card-title"> Arc Goes to Blue Mountains </div>
              <div className="card-subtitle"> March 22, 7am-6pm, UNSW Student... </div>

              <br />

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
                    <ToggleButton className="btn-gradient-circle" value={1}></ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </Card.Body>
          </Card>

        </Carousel.Item>

        <Carousel.Item className="carousel-item">

          <Card>
            <Card.Img src={EventImage} />
            <Card.Body>
              <div className="card-title"> Event 3 </div>
              <div className="card-subtitle"> Tomorrow, 12-2pm, John Lion's Garden (J17) </div>

              <br />

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
                    <ToggleButton className="btn-gradient-circle" value={2}></ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </Card.Body>
          </Card>

        </Carousel.Item>

      </Carousel>
    </div>
  )
}

export default Explore