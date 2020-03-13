import React, { useState } from 'react'

import Lock from '../Icons/lock.svg'
import Mail from '../Icons/mail.svg'

import { Link } from 'react-router-dom'
import { Button, Form, InputGroup, Image } from 'react-bootstrap'

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="page-body">

            <div className="page-title"> Holler <span className="dot"></span> </div>
            <h6 className="page-subtitle"> Welcome Back! </h6>
            <p className="page-subtext"> Sign in to your account! </p>

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

            </Form.Group>

            <Link to="/dashboard"> <Button className="btn-gradient btn-lg"> Login </Button> </Link>
            <Link to="/signup"> <p className="txt-gradient txt-sm txt-bold"> Create Account! </p> </Link>

        </div>
    )
}

export default Login
