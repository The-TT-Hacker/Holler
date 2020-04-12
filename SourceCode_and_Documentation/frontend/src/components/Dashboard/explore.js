import React, { useState } from 'react'

import { Carousel, Form, FormControl, Button, Accordion } from 'react-bootstrap'
import '../../styles/explore.css'
import '../../styles/events.css'

import { AccordionEventCard, TagsModal, DateModal, SearchButton} from './subcomponents'
import CSESocImage from '../../icons/event-image.svg'
import EventImage from '../../icons/event-image.svg'
import EventImage2 from '../../icons/event-image-2.svg'


const Explore = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (
    <div>

      <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '86.5%' }}>
        <div className="main-content">

          <div className="row" style={{ width: '100%', marginBottom: '1rem' }}>
            <div className="col-6">
              <div className="page-title"> Explore </div>
            </div>
            <div className="col-6 d-flex justify-content-end align-items-end">
              <SearchButton/>
            </div>
          </div>

          <div className="row" style={{ width: '100%', marginBottom: '1rem' }}>
            <TagsModal />
            <DateModal />
          </div>

          <div className="row" >
            <div className="col">
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
        </div>
      </div>
    </div>
  )
}

export default Explore