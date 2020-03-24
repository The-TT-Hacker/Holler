import React from 'react'

import { Form } from 'react-bootstrap'

const Step1 = () => {

  const onDateFocus = (e) => { e.currentTarget.type = "date" }
  const onDateBlur  = (e) => { if (e.currentTarget.value == "") e.currentTarget.type="text" }

  return (
    <div className="container-fluid" style={{ maxHeight: "65vh" }}>
      <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "900px" }}>
        <div className="col d-flex flex-column align-items-center">
          <h6 className="txt-subtitle"> You Made It! </h6>
          <p className="txt-subtext"> Please fill the following details so we can get you up and running with Holler! </p>
          <br />

          <Form.Group className="container-fluid" style={{ maxWidth: "500px"}}>
            <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Full Name"
                  />
            <br />

            <Form.Control
                  size="lg"
                  type="text"
                  placeholder="Birthdate"
                  onFocus={(event) => onDateFocus(event)}
                  onBlur={(event) => onDateBlur(event)} />
            <br />

          </Form.Group>
          <br />
          
        </div>
      </div>
    </div>
  )

}

export default Step1