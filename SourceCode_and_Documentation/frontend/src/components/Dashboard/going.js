import React, { useEffect, useState } from 'react'
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
  const [isLoading, setIsLoading] = useState(true)

  const RenderGoingEvents = () => {
    return (
      <div>
        { userEvents.length > 0 ? <GoingEvents /> : <NoGoingEvents /> }
      </div>
    )
  }

  const GoingEvents = () => {
    return (
      <div>
        <div style={{ marginBottom: '5vh' }}></div>

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
                    subtitle={new Date(event.time_start).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' })}
                    description={event.description}
                    hosts={event.hosts}
                    facebookLink={event.url}
                    location={event.location}
                    nextMatch={convertDates(new Date(event.time_start))}
                    latitude={event.latitude}
                    longitude={event.longitude}
                    mapsValues={event.longitude}
                    going={userEventsIds}
                    setGoing={setUserEventIds} />
                )

              }

            </Accordion>
          </div>
        </div>
      </div>
    )
  }

  const NoGoingEvents = () => {
    return (
      <div className="row" style={{ height: '80vh' }}>
        <div className="col d-flex justify-content-center align-items-center">
          <div className="card-subtitle">
          <PageTitle title="Seems a bit lonely..." />
            It doesn't seem like you've expressed interests in any events yet... 🙁
          </div>
        </div>
      </div>
    )
  }

  const LoadingScreen = () => {
    return (
      <div className="row" style={{ height: '80vh' }}>
        <div className="col d-flex justify-content-center align-items-center">
          <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
          </div>
        </div>
      </div>
    )
  }

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
        setIsLoading(false)
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
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>

        { isLoading ? <LoadingScreen /> : <RenderGoingEvents /> }

      </div>
    </div>
  )
}

export default Going
