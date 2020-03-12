import React from 'react'

import Success from '../Icons/success.svg'
import { Button, Image } from 'react-bootstrap'

const VerifyEmail = () => {

    return (
        <div className="page-body">

            <div className="page-title"> Holler <span className="dot"></span> </div>
            <Image className="success-image" src={Success} />
            <h6 className="page-subtitle"> Verification Email Sent! </h6>

            <br />
            <p className="page-subtext">
            We sent a verifcation email to your university email address. <br />
            Click the link in the email to continue to your new account!
            </p>

            <br />
            <Button className="login-button" size="lg"> Continue </Button>

        </div>
    )

}

export default VerifyEmail
