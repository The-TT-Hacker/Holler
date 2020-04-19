import React, { useState, useEffect } from 'react'
import axios from 'axios'

import CSESocImage from '../../icons/event-image.svg'
import CSESocImage2 from '../../icons/event-image-2.svg'

import { Button, Collapse, Form, Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard, TagsModal, DateModal } from './subcomponents'
import { updateScrollability } from '../../constants'
import { URL } from '../../constants/roles'

import '../../styles/explore.css'
import '../../styles/events.css'

const Explore = (props) => {

  updateScrollability(props.scroll)
  const [showSearchInput, setShowSearchInput] = useState(false)


  /* Search bar toggling */
  const [active, setActive] = useState(false)
  const changeSearchIcon = () => {
    if (active)
      document.getElementsByClassName("btn-explore-search")[0].classList.remove("active");
    else
      document.getElementsByClassName("btn-explore-search")[0].classList.add("active");
    setActive(!active);
  }

  // global error variable
  const [error, setError] = useState("")
  console.log(error)


  const [data, setData] = useState([])
  // const getEventData = async () => {
  //   // Flag to use for cleanup
  //   const source = axios.CancelToken.source()

  //   // auth token - in useEffect to supress depdendency warnings
  //   const token = localStorage.getItem('token')
  //   await axios({
  //     url: URL + "/event/" + data[0].id,
  //     method: "GET",
  //     cancelToken: source.token,
  //     headers: {
  //       'Authorization': `${token}`
  //     },
  //     // No parameters to get default data
  //   })
  //     .then(res => {
  //       console.log(res)

  //     })
  //     .catch(err => {

  //       if (axios.isCancel(err)) {
  //         setError(err)
  //       } else {
  //         setError(err)
  //       }

  //     })
  // }
  
  // const getEvents = data.map((d) =>
  //   <AccordionEventCard
  //   id={d.id}
  //   image={CSESocImage}
  //   title={d.title}
  //   subtitle={}
  //   description="Description"
  //   rsvp="72"
  //   location="Unknown" />
  // ) 

  // get information from backend
  useEffect(() => {

    // Flag to use for cleanup
    const source = axios.CancelToken.source()

    // auth token - in useEffect to supress depdendency warnings
    const token = localStorage.getItem('token')
    // Request Function
    const fetchEvents = async () => {

      await axios({
        url: URL + "/events",
        method: "GET",
        cancelToken: source.token,
        headers: {
          'Authorization': `${token}`
        },
        // No parameters to get default data
      })
        .then(res => {
          setData(res.data)

        })
        .catch(err => {

          if (axios.isCancel(err)) {
            setError(err)
          } else {
            setError(err)
          }

        })
    }

    // Make the request
    fetchEvents()

    // Cancel other requests
    return () => {
      source.cancel()
    }

  }, [])

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

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">
              {/* {getEvents} */}

              <AccordionEventCard
                id="1"
                image={CSESocImage}
                title="CSESoc Weekly BBQ"
                subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                description="Description"
                rsvp="72"
                location="Unknown" />

              <AccordionEventCard
                id="2"
                image={CSESocImage2}
                title="This"
                subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                description="Description"
                rsvp="72"
                location="Unknown" />

              <AccordionEventCard
                id="3"
                image="https://cdn.eventlink.me/society/cevsoc.jpg"
                title="This"
                subtitle="Tomorrow, 12-2pm, John Lion's Garden (J17)"
                description="Description"
                rsvp="72"
                location="Unknown" />
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


