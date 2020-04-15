import React, { useState } from 'react'

import CSESocImage from '../../icons/event-image.svg'
import CSESocImage2 from '../../icons/event-image-2.svg'

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
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="main-content">

        {/* Page Title & Search Button*/}
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <div className="d-flex flex-row">
              <PageTitle title="Explore" />
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

        {/* Search Input Collapse */}
        <div className="row spacer-down">
          <div className="col-12">
            <Collapse in={showSearchInput}>
              <div> <Form.Control type="text" placeholder="Enter query text" /> </div>
            </Collapse>
          </div>
        </div>

        {/* Event Filters */}
        <div className="row spacer-down">
          <div className="col-12 d-flex">
            <TagsModal />
            <DateModal />
          </div>
        </div>

        {/* Event Browser */}
        <div className="row spacer-down">
          <div className="col-12 d-flex">
            <Accordion style={{ width: '100%', margin: '0'}}>
              <Carousel slide={false} interval={null} activeIndex={index} style={{ width: '100%', margin: '0'}} onSelect={changeCarousel}>
                <Carousel.Item className="carousel-item">
                  <AccordionEventCard
                    id="1"
                    image={CSESocImage}
                    title="CSESoc Weekly BBQ"
                    subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                    description="Description"
                    rsvp="72"
                    location="Unknown" />
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                  <AccordionEventCard
                    id="2"
                    image={CSESocImage2}
                    title="This"
                    subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                    description="Description"
                    rsvp="72"
                    location="Unknown" />
                </Carousel.Item>
                <Carousel.Item className="carousel-item">
                  <AccordionEventCard
                    id="3"
                    image="https://cdn.eventlink.me/society/cevsoc.jpg"
                    title="This"
                    subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                    description="Description"
                    rsvp="72"
                    location="Unknown" />
                </Carousel.Item>
              </Carousel>
            </Accordion>
          </div>
        </div>

        {/* Tooltip for Swiping to Browse on Mobile */}
        <div className="row">
          <div className="col-12 swipe-to-browse"> &lt; Swipe to Browse &gt; </div>
        </div>

      </div>
    </div>

  )
}

export default Explore