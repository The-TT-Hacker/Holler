import React, { Component } from 'react'

import { Link, withRouter } from 'react-router-dom'
import { compose } from 'recompose'
import { withFirebase } from "../Firebase"
import * as ROUTES from '../../constants/routes'

// import axios from 'axios'

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

// import { URL } from '../../constants/roles'
// import { Link } from 'react-router-dom'
// import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'
import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'

const LoginPage = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row mx-auto align-items-center h-100" style={{maxWidth: "550px"}}>
        <div className="col d-flex flex-column align-items-center">
          <Nav.Link href="/"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>
            <h6 className="txt-subtitle txt-align-center"> Welcome Back! </h6>
            <p className="txt-subtext txt-align-center"> Sign in to your account! </p>
            <LoginForm />
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

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class LoginFormBase extends Component {
  constructor(props) {
    super(props)

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = event => {
    const { email, password } = this.state

    this.props.firebase
      .doLoginWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push(ROUTES.DASHBOARD)

        // axios({
        //   method: "get",
        //   url: URL + '/user',
        //   headers: {'Authorization': token}
        // }).then(function (response) {
        //   console.log(response)
        // }).catch(function (error) {
        //   console.log(error)
        // })


      })
      .catch(error => {
        this.setState({ error })
      })

      event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const {email, password, error} = this.state
    const isInvalid = password === '' || email === ''

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
            placeholder="University Email" />
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
            placeholder="Password"/>
        </InputGroup>
        <br />

        <div className="d-flex flex-column align-items-center justify-content-center">
          <Button className="btn-gradient btn-lg" isDisabled={isInvalid} type="submit"> Login </Button>
          {error && <p className="text-danger txt-align-center">{error.message}</p>}
        </div>
        
      </Form.Group>
      </Form>
    )
  }

}

const LoginForm = compose(
  withRouter,
  withFirebase,
)(LoginFormBase)

export default LoginPage
export { LoginForm }