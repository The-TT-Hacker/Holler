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

  const [index, setIndex] = useState(0);
  const changeCarousel = (selectedIndex, e) => {
    setIndex(selectedIndex);

  };

  const [active, setActive] = useState(false)
  const changeSearchIcon = () => {
    if (active) 
        document.getElementsByClassName("btn-explore-search")[0].classList.remove("active");
     else 
        document.getElementsByClassName("btn-explore-search")[0].classList.add("active");
    
    setActive(!active);
}


  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ height: "86.5%", overflowY: 'scroll'}}>
      <div className="main-content">

        <div className="row">
          <div className="col-12 d-flex justify-content-between">
              <div className="d-flex flex-row">
                <PageTitle title="Events" /> 
              </div>
              <div >
                <Button className="btn-explore-search" onClick={() => {
                    setShowSearchInput(!showSearchInput);
                      changeSearchIcon();
                    }}>
                </Button> 
              </div>
          </div>
          
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
            <Carousel slide={true} interval={null} activeIndex={index} style={{ width: '100%', margin: '0', overflowY: 'scrollable'}} onSelect={changeCarousel}>
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