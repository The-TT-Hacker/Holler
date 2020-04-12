import React, { useState } from 'react'

import { Carousel, Accordion } from 'react-bootstrap'
import '../../styles/explore.css'
import '../../styles/events.css'

import { AccordionEventCard, TagsModal, DateModal, ExploreHeader, PageTitle } from './subcomponents'
import CSESocImage from '../../icons/event-image.svg'
import { updateScrollability } from '../../constants'


const Explore = (props) => {

  updateScrollability(props.scroll)

  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  return (


    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: '86.5%' }}>
      <div className="main-content">


        <ExploreHeader />

        <div className="row" style={{ width: '100%', marginBottom: '1rem' }}>
          <TagsModal />
          <DateModal />
        </div>

        <div className="container-fluid d-flex flex-column justify-content-center align-items-center" style={{ height: '80%' }}>
          <Carousel activeIndex={index} onSelect={handleSelect} slide={true} interval={null}>

            <Carousel.Item className="carousel-item">
              <Accordion className="accordion-going" key="accordion-one">
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
              <Accordion className="accordion-going" key="accordion-two">
                <AccordionEventCard
                  id="2"
                  image={"https://cdn.eventlink.me/event/1368737013329249.jpg"}
                  title="Arc Goes to Blue Mountains"
                  subtitle="March 22, 7am-6pm, UNSW Student..."
                  description="Description"
                  rsvp="72"
                  location="Unknown" />
              </Accordion>
            </Carousel.Item>

            <Carousel.Item className="carousel-item">
              <Accordion className="accordion-going" key="accordion-three">
                <AccordionEventCard
                  id="3"
                  image={CSESocImage}
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

  )
}

export default Explore