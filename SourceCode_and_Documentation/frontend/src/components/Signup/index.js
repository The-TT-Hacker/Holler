import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

import { withFirebase } from '../Firebase'
import { compose } from 'recompose'
import { Button, Form, InputGroup, Image } from 'react-bootstrap'

const Signup = () => {
    return (
        <div className="align">

            <div className="txt-title"> Holler <span className="dot"></span> </div>
            <h6 className="txt-subtitle"> Create a New Account </h6>
            <p className="txt-subtext"> Join and meet more people in your University! </p>

            <SignupForm />

        </div>
    )
}

const INITIAL_STATE = {
    email: '',
    password: '',
    confirmPassword: '',
    error: null,
}

class SignupFormBase extends Component {
    constructor(props) {
        super(props)
        this.state = { ...INITIAL_STATE }
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit = event => {
        const { email, password } = this.state

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, password)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE })
                this.props.history.push('/verify')
            })
            .catch(error => {
                this.setState({ error })
            })

        event.preventDefault();
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
            email === '' ||
            password === '';

        return (
            <div>
                <Form.Group className="login-form-group">

                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image src={Mail} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className="login-form-control" size="lg" name="email" value={email} onChange={this.onChange} type="text" placeholder="University Email" />
                    </InputGroup>

                    <br />
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image src={Lock} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className="login-form-control" size="lg" name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                    </InputGroup>

                    <br />
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">
                                <Image src={Lock} />
                            </InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control className="login-form-control" size="lg" name="confirmPassword" value={confirmPassword} onChange={this.onChange} type="password" placeholder="Password" />
                    </InputGroup>

                    <Button className="btn-gradient btn-lg" disabled={isInvalid} onClick={this.onSubmit}> Sign Up </Button>
                    {error && <p>{error.message}</p>}
                </Form.Group>
            </div>
        )
    }
}

const SignupForm = compose(
  withRouter,
  withFirebase,
)(SignupFormBase);

export default Signup
export { SignupForm }