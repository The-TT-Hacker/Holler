import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file

const DateModal = () => {

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
            <Button onClick={() => setDateModalShow(true)} className="btn-interests active no-margin"> Date </Button>
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
                            rangeColors={['#FEA31F', '#FEA31F', '#FEA31F', '#FEA31F']}
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
        )
}

export default DateModal;