import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button, Collapse, Form, Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard, TagsModal, DateModal } from './subcomponents'
import { BACKEND } from '../../constants/roles'

import '../../styles/explore.css'
import '../../styles/events.css'

const Explore = (props) => {

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
  const params = {
    searchText: "",
    tags: "",
    startDate: "",
    endDate: ""
  }

  const convertDates = (futureDate) => {

    var now = new Date()
    var delta = Math.abs(futureDate - now) / 1000
    var days = Math.floor(delta / 86400)
    delta -= days * 86400
    var hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600
    var minutes = Math.floor(delta / 60) % 60
    delta -= minutes * 60
    var seconds = delta % 60


    if (days) {
      if (days == 1)
        return days + " day!"
      else
        return days + " days!"
    } else if (hours) {
      if (hours == 1) 
        return hours + " hour!"
      else
        return hours + " hours!"
    } else if (minutes) {
      if (minutes == 1)
        return minutes + " minute!"
      else
        return minutes + " minutes!"
    } else {
      if (seconds == 1)
        return seconds + " second!"
      else
        return seconds + " seconds!"
    }

  }

  const fetchEvents = async () => {
    await axios({
      url: BACKEND + "/events",
      method: "GET",
      params: {
        searchText: params.searchText,
        tags: params.tags,
        startDate: params.startDate,
        endDate: params.endDate
      }
    })
      .then(res => {
        setData(res.data.reverse())
      })
      .catch(err => {

        if (axios.isCancel(err)) {
          setError(err)
        } else {
          setError(err)
        }

      })
  }

  // get information from backend
  useEffect(() => {
    // Flag to use for cleanup
    const source = axios.CancelToken.source()
    const fetchEvents = async () => {

      await axios({
        url: BACKEND + "/events",
        method: "GET",
      })
        .then(res => {
          setData(res.data.reverse())
          console.log(res.data.reverse())
        })
        .catch(err => {

          if (axios.isCancel(err)) {
            setError(err)
          } else {
            setError(err)
          }

        })
    }

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
              <div>
                <Form >
                  <Form.Control type="text" placeholder="Enter query text" onChange={e => { params.searchText = e.currentTarget.value; fetchEvents() }} />
                </Form>
              </div>
            </Collapse>
          </div>
        </div>

        {/* Event Filters */}
        <div className="row spacer-down">
          <div className="col-12 d-flex">
            <TagsModal />
            <DateModal fetchEvents={fetchEvents} params={params} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">


              {

                data.map((d, index) =>

                  <AccordionEventCard
                  eventId={parseInt(d.id)}
                  id={index}
                  image={d.image_url}
                  title={d.title}
                  subtitle={new Date(d.time_start).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'})}
                  description={d.description}
                  hosts={d.hosts}
                  facebookLink={d.url}
                  location={d.location}
                  nextMatch={ convertDates(new Date(d.time_start)) } /> 
                
                )
                
              }

            </Accordion>
          </div>
          </div>

        </div>
      </div>

  )
}

export default Explore


