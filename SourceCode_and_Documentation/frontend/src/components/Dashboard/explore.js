import React, { useState } from 'react'

import CSESocImage from '../../icons/event-image.svg'

import { Button, Collapse, Form, Carousel, Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard, TagsModal, DateModal } from './subcomponents'
import { updateScrollability } from '../../constants'

import '../../styles/explore.css'
import '../../styles/events.css'

const Explore = (props) => {

  updateScrollability(props.scroll)
  const [showSearchInput, setShowSearchInput] = useState(false)

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: "86.5%", overflowY: 'scroll'}}>
      <div className="main-content">

        <div className="row">
          <div className="col-sm-11"> <PageTitle title="Events" /> </div>
          <div className="col-sm-1">  <Button className="btn-explore-search" onClick={() => setShowSearchInput(!showSearchInput)}></Button> </div>
        </div>

        <div className="row spacer-down">
          <div className="col-12">
            <Collapse in={showSearchInput}>
              <div> <Form.Control type="text" placeholder="Enter query text" /> </div>
            </Collapse>
          </div>
        </div>

        <div className="row spacer-down">
          <div className="col-12 d-flex">
            <TagsModal /> 
            <DateModal />
          </div>
        </div>

        <div className="row spacer-down">
          <div className="col-12">
            <Carousel slide={true} interval={null} style={{ width: '100%', margin: '0', overflowY: 'scrollable'}}>
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
                <Accordion className="accordion-going" key="accordion-one">
                  <AccordionEventCard
                    id="2"
                    image={CSESocImage}
                    title="CSESoc Weekly BBQ"
                    subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                    description="Description"
                    rsvp="72"
                    location="Unknown" />
                </Accordion>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className="row">
          <div className="col-12 swipe-to-browse"> &lt;&lt; Swipe to Browse &gt;&gt; </div>
        </div>

      </div>
    </div>

  )
}

export default Explore