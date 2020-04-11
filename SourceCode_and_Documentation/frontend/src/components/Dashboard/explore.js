import React, { useState } from 'react'

import { Carousel, Form, FormControl, Button, Accordion } from 'react-bootstrap'
import '../../styles/explore.css'
import '../../styles/events.css'

import TagsModal from './subcomponents/tags_modal'
import DateModal from './subcomponents/date_modal'
import {AccordionEventCard } from './subcomponents'
import CSESocImage from '../../icons/event-image.svg'
import EventImage from '../../icons/event-image.svg'
import EventImage2 from '../../icons/event-image-2.svg'


const Explore = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const [active, setActive] = useState(false)
  const displaySearchBox = () => {
    if (active) {
      document.getElementById("search-box-input").style.display = "none"
      document.getElementById("btn-explore-search").classList.remove("active")
    } else {
      document.getElementById("search-box-input").style.display = "block"
      document.getElementById("btn-explore-search").classList.add("active")
    }
    setActive(!active)
  }

  return (
    <div>
      <br></br>
      <div className="container-fluid" style={{ width: '72%' }}>
        <div className="row">
          <div className="col-7 d-flex align-items-start justify-content-start">
            <div className="page-title"> Explore </div>
          </div>
          <div className="col-5 d-flex justify-content-end align-items-center">
            <Form className="search-box-form" id="search-box-input" style={{ marginRight: '15px' }}>
              <FormControl type="text" placeholder="Search" />
            </Form>
            <Button id="btn-explore-search" onClick={displaySearchBox}> </Button>
          </div>
        </div>
        <div className="row d-flex justify-content-start">
          <TagsModal/>
          <DateModal/>
        </div>
      </div>


      <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '80%' }}>
        <Carousel activeIndex={index} onSelect={handleSelect} slide={true} interval={null}>

          <Carousel.Item className="carousel-item">
            <Accordion className="accordion-going">
              <AccordionEventCard
                id="1"
                image={CSESocImage}
                title="CSESoc Weekly BBQ"
                subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                description="Description"
                rsvp="72"
                location="Unknown" />
            </Accordion>
          </Carousel.Item>

          <Carousel.Item className="carousel-item">
            <Accordion className="accordion-going">
              <AccordionEventCard
                id="2"
                image={EventImage2}
                title="Arc Goes to Blue Mountains"
                subtitle="March 22, 7am-6pm, UNSW Student..."
                description="Description"
                rsvp="72"
                location="Unknown" />
            </Accordion>
          </Carousel.Item>

          <Carousel.Item className="carousel-item">
            <Accordion className="accordion-going">
              <AccordionEventCard
                id="3"
                image={EventImage}
                title="Event 3"
                subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                description="Description"
                rsvp="72"
                location="Unknown" />
            </Accordion>
          </Carousel.Item>

        </Carousel>
      </div>
    </div>
  )
}

export default Explore