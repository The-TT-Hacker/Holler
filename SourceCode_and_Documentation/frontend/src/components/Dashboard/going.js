import React, { useEffect, useState} from 'react'
import axios from 'axios'

import { Accordion } from 'react-bootstrap'
import { BACKEND } from '../../constants/roles'
import { PageTitle, AccordionEventCard } from './subcomponents'

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

const Going = (props) => {

  const [userEvents, setUserEvents] = useState([])
  const [userEventsIds, setUserEventIds] = useState([])

  useEffect(() => {

    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')

    const fetchUserEvents = async () => {
      await axios({
        url: BACKEND + "/user/events",
        method: "GET",
        headers: { 'Authorization': `${token}` }
      }).then(response => {
        setUserEvents(response.data)
        setUserEventIds(response.data.map(({ id }) => id))
      }).catch(error => {
        if (axios.isCancel(error)) {
        } else {
          console.log("Error: ", error)
        }
      })
    }

    fetchUserEvents()

    return () => {
      source.cancel()
    }

  }, [])

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%'}}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>
        
        <div style={{marginBottom: '5vh'}}></div>

        <PageTitle title="Going" />

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">

              { 
              
              userEvents.map((event, index) =>
                <AccordionEventCard
                  key={index}
                  id={index}
                  eventID={event.id}
                  image={event.image_url}
                  title={event.title}
                  subtitle={new Date(event.time_start).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'})}
                  description={event.description}
                  hosts={event.hosts}
                  facebookLink={event.url}
                  location={event.location}
                  nextMatch={ convertDates(new Date(event.time_start)) }
                  latitude={event.latitude}
                  longitude={event.longitude}
                  mapsValues={event.longitude}
                  going={userEventsIds}
                  setGoing={setUserEventIds}/> 
              )
                    
              }

            </Accordion>
          </div>
        </div>
        <div className="row align-items-center spacer-up">
          <div className="col card-subtitle">
            You've reached the end! Find more events you like!
          </div>
          
        </div>  
      </div>
    </div>
  )
}

export default Going
