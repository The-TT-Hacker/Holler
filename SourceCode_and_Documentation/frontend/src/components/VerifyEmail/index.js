import React from 'react'

import Success from '../../icons/success.svg'

import { Link } from 'react-router-dom'
import { Image, Button } from 'react-bootstrap'

const VerifyEmail = () => {
  return (
    <div className="container-fluid h-100">
      <div className="row mx-auto align-items-center h-100">
        <div className="col d-flex flex-column align-items-center">
          <div className="txt-title"> Holler <span className="dot"></span> </div>
          <Image className="success-image" src={Success} />
          <h6 className="txt-subtitle"> Verification Email Sent! </h6>

          <br />
          <p className="txt-subtext">
            We sent a verifcation email to your university email address. <br />
    Click the link in the email to continue to your new account!
    </p>

          <br />
          <Link to="/login"> <Button className="btn-gradient btn-lg"> Take me to the Login! </Button> </Link>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail