import React from 'react'

import { Accordion } from 'react-bootstrap'
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

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%'}}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>
        
        <div style={{marginBottom: '5vh'}}></div>

        <PageTitle title="Going" />

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">

            <AccordionEventCard
                  eventId={2701907676589744}
                  id={0}
                  image={"https://cdn.eventlink.me/event/2701907676589744.jpg"}
                  title={"Quidditch Goes to Trivia"}
                  subtitle={new Date("2021-01-06T08:00:00.000Z").toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric'})}
                  description={"The Description"}
                  hosts={["UNSW Quidditch Society", "UTS Quidditch"]}
                  facebookLink={"https://www.facebook.com/events/2701907676589744"}
                  location={"The Soda Factory 16 Wentworth Ave, Surry Hills, New South Wales, Australia 2010"}
                  nextMatch={ convertDates(new Date("2021-01-06T08:00:00.000Z")) } /> 
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Going
