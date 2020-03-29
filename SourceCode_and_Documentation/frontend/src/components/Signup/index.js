import React, { Component } from 'react'
import axios from 'axios'
//import querystring from 'querystring'

import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from "../Firebase"
import * as ROUTES from '../../constants/routes'

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

import { URL } from '../../constants/roles'
import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'


const SignupPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "550px" }}>
        <div className="col d-flex flex-column align-items-center">
          <Nav.Link href="/"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>
          <h6 className="txt-subtitle txt-align-center"> Create a New Account </h6>
          <p className="txt-subtext txt-align-center"> Join and meet more people in your University! </p>
          <SignupForm />
          <div className="d-flex">
            <Link to="/login"> <p className="txt-gradient txt-sm txt-bold"> Already have an account? Login. </p> </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null,
}


class SignupFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    axios({
      method: "post",
      url: URL + '/auth/register',
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      console.log(response)
      this.props.history.push(ROUTES.VERIFY_EMAIL)
    }).catch(function (error) {
      console.log(error)
    })

    event.preventDefault();
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {

    const {
      email,
      password,
      confirmPassword,
      error,
    } = this.state

    const isInvalid =
      password !== confirmPassword ||
      password === "" ||
      email === ""

    return (
      <Form onSubmit={this.onSubmit} style={{ width: "100%" }}>
        <Form.Group style={{ width: "100%" }}>

          <br />
          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <Image src={Mail} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              size="lg"
              placeholder="University Email"
            />
          </InputGroup>
          <br />

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <Image src={Lock} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="password"
              value={password}
              onChange={this.onChange}
              type="password"
              size="lg"
              placeholder="Enter Password"
            />
          </InputGroup>
          <br />

          <InputGroup>
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">
                <Image src={Lock} />
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.onChange}
              type="password"
              size="lg"
              placeholder="Enter Password"
            />
          </InputGroup>
          <br />

          <div className="d-flex flex-column align-items-center justify-content-center">
            <Button className="btn-gradient btn-lg" isDisabled={isInvalid} type="submit"> Sign Up </Button>
            {error && <p className="text-danger txt-align-center">{error.message}</p>}
          </div>
        </Form.Group>
      </Form>
    )
  }
}

const SignupForm = compose(
  withRouter,
  withFirebase,
)(SignupFormBase)

export default SignupPage
export { SignupForm }
