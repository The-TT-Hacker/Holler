import React, { useState } from 'react'

import { DateRangePicker } from 'react-date-range'
import { ToggleButtonGroup, ToggleButton, Carousel, Card, Form, FormControl, Button, Modal } from 'react-bootstrap'

import EventImage from '../../icons/event-image.svg'
import EventImage2 from '../../icons/event-image-2.svg'
import ChatBubble from '../../icons/chat.svg'

import '../../styles/explore.css'
import '../../styles/events.css'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const Explore = () => {
  const [index, setIndex] = useState(0)
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex)
  }

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

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

  const [tagModalShow, setTagModalShow] = useState(false);
  const [dateModalShow, setDateModalShow] = useState(false);

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  const handleDate = (ranges) => {
    selectionRange.startDate = ranges.selection.startDate;
    selectionRange.endDate = ranges.selection.endDate;
  }

  return (
    <div>
      <br></br>
      <div className="container-fluid" style={{ width: '72%' }}>
        <div className="row">
          <div className="col-7 d-flex align-items-start justify-content-start">
            <div className="explore-title" >Explore</div>
          </div>
          <div className="col-5 d-flex justify-content-end align-items-center">
            <Form className="search-box-form" id="search-box-input" style={{ marginRight: '15px' }}>
              <FormControl type="text" placeholder="Search" />
            </Form>
            <Button id="btn-explore-search" onClick={displaySearchBox}> </Button>
          </div>
        </div>
        <div className="row d-flex justify-content-start">
          <Button onClick={() => setTagModalShow(true)} className="btn-filters">Tags</Button>
          <Modal show={tagModalShow}
            onHide={() => setTagModalShow(false)}
            aria-labelledby="tag-modal-title">
            <Modal.Header>
              <Modal.Title id="tag-modal-title">Filter By Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <div className="col d-flex flex-column align-items-center" style={{ padding: 0 }}>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={0}> Photography </ToggleButton>
                    <ToggleButton className="btn-tags" value={1}> Family </ToggleButton>
                    <ToggleButton className="btn-tags" value={2}> Concerts </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={3}> Running </ToggleButton>
                    <ToggleButton className="btn-tags" value={4}> Gaming </ToggleButton>
                    <ToggleButton className="btn-tags" value={5}> Science </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={6}> Cinema </ToggleButton>
                    <ToggleButton className="btn-tags" value={7}> Dance </ToggleButton>
                    <ToggleButton className="btn-tags" value={8}> Music </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={9}> Study </ToggleButton>
                    <ToggleButton className="btn-tags" value={10}> Hiking </ToggleButton>
                    <ToggleButton className="btn-tags" value={11}> Beach </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={12}> Gambling </ToggleButton>
                    <ToggleButton className="btn-tags" value={13}> Partying </ToggleButton>
                    <ToggleButton className="btn-tags" value={14}> Trivia </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-tags" value={15}> Karaoke </ToggleButton>
                    <ToggleButton className="btn-tags" value={16}> Squash </ToggleButton>
                    <ToggleButton className="btn-tags" value={17}> Food </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-modal-done btn-lg" variant="primary" onClick={() => setTagModalShow(false)}>
                Done
              </Button>

            </Modal.Footer>
          </Modal>

          <Button onClick={() => setDateModalShow(true)} className="btn-filters">Date</Button>
          <Modal show={dateModalShow}
            onHide={() => setDateModalShow(false)}
            aria-labelledby="date-modal-title">
            <Modal.Header>
              <Modal.Title id="date-modal-title">Select Dates</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="col d-flex flex-column align-items-center" style={{ padding: 0 }}>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleDate}
                  minDate={new Date()}
                  rangeColors={['#FEA31F','#FEA31F','#FEA31F','#FEA31F']}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button className="btn-modal-done btn-lg" variant="primary" onClick={() => setDateModalShow(false)}>
                Done
              </Button>

            </Modal.Footer>
          </Modal>


        </div>
      </div>


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
    </div>
  )
}

export default Explore