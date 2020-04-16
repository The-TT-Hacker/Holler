import React, { Component } from 'react'
import axios from 'axios'

import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from "../Firebase"

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

import { URL } from '../../constants/roles'
import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'
import { updateScrollability } from '../../constants'

const SignupPage = (props) => {

  updateScrollability(props.scroll)

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', maxWidth: '600px'}}>
      <div className="container-fluid">

        {/* Application Title & Login Page Title */}
        <div className="row">
          <div className="col">
            <Nav.Link href="/"> <div className="txt-title txt-align-center"> Holler <span className="dot"></span> </div> </Nav.Link>
            <h6 className="txt-subtitle txt-align-center"> Create a New Account </h6>
            <p className="txt-subtext txt-align-center"> Join and meet more people in your University! </p>
          </div>
        </div>

        {/* Signup Form */}
        <div className="row">
          <div className="col">
            <SignupForm props={props} history={props.history} />
          </div> 
        </div>

        {/* Create account, reset password redirects */}
        <div className="row">
          <div className="col d-flex justify-content-center">
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
    const { props } = this.props
    console.log(props)
    
    axios({
      url: URL + '/register',
      method: "post",
      data: {
        email: email,
        password: password
      }
    }).then(function (response) {
      console.log(response)
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
            <Button className="btn-gradient btn-lg" disabled={isInvalid} type="submit"> Sign Up </Button>
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
