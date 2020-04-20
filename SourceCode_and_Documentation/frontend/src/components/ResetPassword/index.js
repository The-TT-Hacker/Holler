import React, { useState} from 'react'
import axios from 'axios'

import Mail from '../../icons/mail.svg'

import { Link } from 'react-router-dom'
import { Nav, Form, InputGroup, Image, Button } from 'react-bootstrap'
import { LANDING } from '../../constants/roles'

const ResetPassword = (props) => {

  const [email, setEmail] = useState("")

  const PostReset = () => {
    axios.post(URL + '/password-reset', {
      email: email,
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  }

  return (
    <div className="container-fluid h-100">
      <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "600px" }}>
        <div className="col d-flex flex-column align-items-center">
          <Nav.Link href={LANDING}> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>
          <h6 className="txt-subtitle"> Oh No! </h6>
          <p className="txt-subtext txt-align-center"> Forgot your password? No worries. Reset it here. </p>

          <Form.Group className="form">

            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Image src={Mail} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                size="lg"
                type="text"
                placeholder="University Email"
                onChange={event => setEmail(event.target.value)} />
            </InputGroup>
            <br />
          
          </Form.Group>
           
          <Link to="/login"> <Button className="btn-gradient btn-lg" onClick={PostReset}> Reset </Button> </Link>
          <br />

        </div>
      </div>
    </div>
  )
}

export default ResetPassword