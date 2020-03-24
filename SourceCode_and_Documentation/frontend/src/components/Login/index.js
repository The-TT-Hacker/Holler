import React, { useState } from 'react'
import axios from 'axios'

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

import { URL } from '../../constants/roles'
import { Link } from 'react-router-dom'
import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const PostLogin = () => {
    axios.post(URL + '/login', {
      email: email,
      password: password
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
        <Nav.Link href="/"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>
          <h6 className="txt-subtitle"> Welcome Back! </h6>
          <p className="txt-subtext"> Sign in to your account! </p>

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
            
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <Image src={Lock} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                size="lg"
                type="password"
                placeholder="Password"
                onChange={event => setPassword(event.target.value)} />
            </InputGroup>
            <br />
          </Form.Group>

          <Link to="/dashboard"> <Button className="btn-gradient btn-lg" onClick={PostLogin}> Login </Button> </Link>
          <br />

          <div className="d-flex">
            <Link to="/signup"> <p className="txt-gradient txt-sm txt-bold"> Create Account! </p> </Link>
            <p className="txt-sm txt-bold" style={{margin: "0 5px 0 5px"}}> or </p>
            <Link to="/reset-pw"> <p className="txt-gradient txt-sm txt-bold"> Reset Password... </p> </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login