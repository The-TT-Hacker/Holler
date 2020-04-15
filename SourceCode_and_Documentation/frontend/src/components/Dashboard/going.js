import React from 'react'

import CSESocImage from '../../icons/event-image.svg'

import { Accordion } from 'react-bootstrap'
import { PageTitle, AccordionEventCard } from './subcomponents'
import { updateScrollability } from '../../constants'

const Going = (props) => {

  updateScrollability(props.scroll)

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%'}}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>
        <PageTitle title="Going" />

        <div className="row">
          <div className="col">
            <Accordion className="accordion-going">

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
                image={CSESocImage}
                title="Atlassian"
                subtitle="Someplace"
                description="Description"
                rsvp="72"
                location="Unknown" />
                

            </Accordion>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Going
