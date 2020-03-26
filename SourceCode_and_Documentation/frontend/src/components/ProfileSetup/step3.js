import React from 'react'

import { Form } from 'react-bootstrap'

const Step3 = () => {

  return (
    <div className="container-fluid" style={{ maxHeight: "65vh" }}>
      <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "960px" }}>
        <div className="col d-flex flex-column align-items-center">
          <h6 className="txt-subtitle"> Your University </h6>
          <p className="txt-subtext"> Please fill the following details so we can get you up and running with Holler! </p>
          <br />

          <Form.Group className="container-fluid" style={{ maxWidth: "500px"}}>
            <Form.Control
                  size="lg"
                  type="text"
                  placeholder="University"
                  />
            <br />

            <Form.Control
                  size="lg"
                  type="text"
                  placeholder="School or Faculty"
                  />
            <br />

          </Form.Group>
          <br />
          
        </div>
      </div>
    </div>
  )

}

export default Step3