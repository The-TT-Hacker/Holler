import React from 'react'

import Success from '../../icons/success.svg'

import { Button } from 'react-bootstrap'
import { LANDING } from '../../constants/roles'

const VerifyEmail = (props) => {
  
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '80vh', maxWidth: '900px'}}>
      <div className="container-fluid">

        {/* Holler Title */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="txt-title"> Holler <span className="dot"></span> </div>
          </div>
        </div>

        {/* Success Image */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <img src={Success} alt="success" className="success-image" />
          </div>
        </div>

        {/* Success Main Indicator Text */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <h6 className="txt-subtitle txt-align-center"> Verification Email Sent! </h6>
          </div>
        </div>

        {/* Verification Email Sent Text */}
        <div className="row spacer-down">
          <div className="col d-flex justify-content-center">
            <p className="txt-align-center">
            We sent a verification link to the registered email address.
            Click the link in the email to continue to your new Holler account!
            </p>
          </div>
        </div>

        {/* Redirect to the Login Page */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <a href={LANDING}> <Button className="btn-gradient"> Take me Home </Button> </a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default VerifyEmail