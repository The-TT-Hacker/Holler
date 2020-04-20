import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button, Collapse, Form, Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard, TagsModal, DateModal } from './subcomponents'
import { BACKEND } from '../../constants/roles'

import '../../styles/explore.css'
import '../../styles/events.css'

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
    if (days === 1)
      return days + " day!"
    else
      return days + " days!"
  } else if (hours) {
    if (hours === 1) 
      return hours + " hour!"
    else
      return hours + " hours!"
  } else if (minutes) {
    if (minutes === 1)
      return minutes + " minute!"
    else
      return minutes + " minutes!"
  } else {
    if (seconds === 1)
      return seconds + " second!"
    else
      return seconds + " seconds!"
  }

}

const Explore = (props) => {

  const [active, setActive] = useState(false)
  const [showSearchInput, setShowSearchInput] = useState(false)
  
  // Filtering and mapping data
  const [data, setData] = useState([])
  const [displayData, setDisplayData] = useState([])

  const updateQuery = (query) => {

    if (query.length > 0) {
      var newResults = []
      for (var i = 0; i < data.length; i++) {
        if (data[i].title.toLowerCase().includes(query.toLowerCase()))
          newResults.push(data[i])
      }
      setDisplayData(newResults)
    } else {
      setDisplayData(data)
    }
  
  }

  const changeSearchIcon = () => {
    if (active)
      document.getElementsByClassName("btn-explore-search")[0].classList.remove("active");
    else
      document.getElementsByClassName("btn-explore-search")[0].classList.add("active");

    setActive(!active);
  }
  
  
  useEffect(() => {
    
    const fetchEvents = async () => {
  
      await axios({
        url: BACKEND + "/events",
        method: "GET"
      })
      .then(response => {
        var reversedData = response.data.reverse()
        setData(reversedData)
        setDisplayData(reversedData)
      })
      .catch(error => {
        console.log(error)
      })
  
    }
    
    fetchEvents()

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
                <Form.Control type="text" placeholder="Enter query text" onChange={e => { updateQuery(e.currentTarget.value) }} />
              </div>
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

              {

                displayData.map((d, index) =>

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


