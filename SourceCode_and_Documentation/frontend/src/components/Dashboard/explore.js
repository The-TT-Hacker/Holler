import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Button, Collapse, Form, Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard, TagsModal, DateModal } from './subcomponents'
import { BACKEND } from '../../constants/roles'

import '../../styles/explore.css'
import '../../styles/events.css'

const convertDates = (futureDate) => {

  var dayBefore = futureDate - 86400000

  var now = new Date()
  if (futureDate - now < 86400000) {
    return "Matches released"
  }
  
  var delta = Math.abs(dayBefore - now) / 1000
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

  const [events, setEvents] = useState([])
  const [eventsGoing, setEventsGoing] = useState([])
  const [eventsFiltered, setEventsFiltered] = useState([])
  const [activeTags, setActiveTags] = useState([])
  const [startDate, setStartDate] = useState(undefined)
  const [endDate, setEndDate] = useState(undefined)

  /* Animate search icon
   */
  const changeSearchIcon = () => {
    if (active)
      document.getElementsByClassName("btn-explore-search")[0].classList.remove("active");
    else
      document.getElementsByClassName("btn-explore-search")[0].classList.add("active");
 
    setActive(!active);
  }

  /* Filter available events by title
   */
  const updateQuery = (query) => {

    if (query.length > 0) {
      var newResults = []
      for (var i = 0; i < events.length; i++) {
        if (events[i].title.toLowerCase().includes(query.toLowerCase()))
          newResults.push(events[i])
      }
      setEventsFiltered(newResults)
    } else {
      setEventsFiltered(events)
    }
  
  }

  /* Filter available events by tags
   */
  const filterByTags = () => {
    
    if (activeTags.length > 0) {
      var newResults = []
      for (var i = 0; i < events.length; i++) {
        if (events[i].categories.some(v => activeTags.indexOf(v) !== -1))
          newResults.push(events[i])
      }
      setEventsFiltered(newResults)
    } else {
      setEventsFiltered(events)
    }

  }

  /* Filter available events by date
  */
  const filterByDate = () => {
    
    if (startDate !== "" && endDate !== "") {
      var newResults = []
      for (var i = 0; i < events.length; i++) {
        if (new Date(events[i].time_start) > new Date(startDate) && new Date(events[i].time_start) < new Date(new Date(endDate).getTime() + 86400000))
        newResults.push(events[i])
        }
        setEventsFiltered(newResults)
      } else {
        setEventsFiltered(events)
      }
      
  }
    
  /* Fetch list of events and events
   * user has marked as going
   */
  useEffect(() => {

    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')
    
    const fetchEvents = async () => {
  

      await axios({
        url: BACKEND + "/events",
        method: "GET",
        cancelToken: source.token
      })
      .then(response => {
        var reversedData = response.data.reverse()
        setEvents(reversedData)
        setEventsFiltered(reversedData)
      })
      .catch(error => {
        if (axios.isCancel(error)) {
        } else {
          console.log("Error: ", error)
        }
      })
  
    }

    const fetchUserEvents = async () => {

      await axios({
        url: BACKEND + "/user/event_ids",
        method: "GET",
        headers: { 'Authorization': `${token}` },
        cancelToken: source.token
      })
      .then(response => {
        setEventsGoing(response.data)
      })
      .catch(error => {
        if (axios.isCancel(error)) {
        } else {
          console.log("Error: ", error)
        }
      })

    }

    fetchEvents()
    fetchUserEvents()

    return () => {
      source.cancel()
    }

  }, [])

  return (

    
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="main-content">
      {console.log(events)}

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
            <TagsModal activeTags={activeTags} setActiveTags={setActiveTags} triggerFilter={filterByTags} />
            <DateModal setStartDate={setStartDate} setEndDate={setEndDate} triggerFilter={filterByDate} />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">

              {

                eventsFiltered.map((d, index) =>

                  <AccordionEventCard
                    key={index}
                    id={index}
                    eventID={d.id}
                    image={d.image_url}
                    title={d.title}
                    subtitle={new Date(d.time_start).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'})}
                    description={d.description}
                    hosts={d.hosts}
                    facebookLink={d.url}
                    location={d.location}
                    nextMatch={ convertDates(new Date(d.time_start)) }
                    going={eventsGoing}
                    setGoing={setEventsGoing}
                    latitude={d.latitude}
                    longitude={d.longitude}
                    mapsValues={d.longitude} /> 
                
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


