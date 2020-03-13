import React, { useState } from 'react'

import Lock from '../Icons/lock.svg'
import Mail from '../Icons/mail.svg'

import { Link } from 'react-router-dom'
import { Button, Form, InputGroup, Image } from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    return (
        <div className="page-body">

            <div className="page-title"> Holler <span className="dot"></span> </div>
            <h6 className="page-subtitle"> Create a New Account </h6>
            <p className="page-subtext"> Join and meet more people in your University! </p>

            <Form.Group className="login-form-group">

                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                    <Image src={Mail}/>
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className="login-form-control" size="lg" type="text" placeholder="University Email" />
                </InputGroup>

                <br />
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                    <Image src={Lock}/>
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control className="login-form-control" size="lg" type="password" placeholder="Password" />
                </InputGroup>

                <br />
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                    <Image src={Lock}/>
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                <Form.Control className="login-form-control" size="lg" type="password" placeholder="Confirm Password" />
                </InputGroup>

            </Form.Group>

            <Link to="/verify-email"> <Button className="btn-gradient btn-lg"> Sign Up </Button> </Link>
            <Link to="/login"> <p className="txt-gradient txt-sm txt-bold"> Already have an account? Login. </p> </Link>

        </div>
    )
}

export default Login
