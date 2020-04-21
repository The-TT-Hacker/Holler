import React, { useState } from 'react'

import { Button, Modal } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const DateModal = (props) => {

  const [dateModalShow, setDateModalShow] = useState(false);
  const [state, setState] = useState([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }])

  const handleShowEvents = () => {
    props.setStartDate(state[0].startDate)
    props.setEndDate(state[0].endDate)
    props.triggerFilter()
    setDateModalShow(false)
  }

  const resetDates = () => {
    props.setStartDate("")
    props.setEndDate("")
    props.triggerFilter()
    setDateModalShow(false)
  }

  return (
    <div>
      <Button onClick={() => setDateModalShow(true)} className="btn-interests active no-margin"> Date </Button>
      <Modal show={dateModalShow}
        onExit={handleShowEvents}
        aria-labelledby="date-modal-title">
        <Modal.Header>
          <Modal.Title id="date-modal-title">Filter By Date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col d-flex flex-column align-items-center" style={{ padding: 0 }}>
            <DateRangePicker
              ranges={state}
              onChange={item => setState([item.selection])}
              minDate={new Date()}
              rangeColors={['#FEA31F', '#FEA31F', '#FEA31F', '#FEA31F']}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="btn-modal-reset btn-lg" onClick={() => resetDates()}> Reset </Button>
          <Button className="btn-modal-done btn-lg" variant="primary" onClick={() => handleShowEvents(false)}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default DateModal;