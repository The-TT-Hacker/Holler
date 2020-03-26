import React, { useState } from 'react'
import axios from 'axios'

import Lock from '../../icons/lock.svg'
import Mail from '../../icons/mail.svg'

import { URL } from '../../constants/roles'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import { Nav, Button, Form, InputGroup, Image } from 'react-bootstrap'

import * as EmailValidator from 'email-validator'
import * as Yup from 'yup'


const Signup = () => {
    
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const PostSignup = () => {
        axios.post(URL + '/register', {
            email: email,
            password: password
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    const [error, errorMessage] = useState(false)
    const displayError = () => {
        if (error) {
            return <div> {errorMessage} </div>
        }
    }

    const setError = (error) => {
        setError(error)
    }

    return (
        <div className="container-fluid h-100">
            <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "600px"}}>
                <div className="col d-flex flex-column align-items-center">
                <Nav.Link href="/"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>
                    <h6 className="txt-subtitle"> Create a New Account </h6>
                    <p className="txt-subtext"> Join and meet more people in your University! </p>

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
                                onChange={event => setConfirmPassword(event.target.value)} />
                        </InputGroup>
                        <br />

                    </Form.Group>

                    <Link to="/verify"> <Button className="btn-gradient btn-lg" onClick={PostSignup}> Sign Up </Button> </Link>
                    <br />

                    <Link to="/login"> <p className="txt-gradient txt-sm txt-bold"> Already have an account? Login. </p> </Link>
                </div>
            </div>
        </div>
    )
}

export default Signup