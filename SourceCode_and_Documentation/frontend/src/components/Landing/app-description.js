import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Button } from 'react-bootstrap'

import CrayonSuccess from '../../icons/crayon-success.svg'

const AppDescription = () => {
  return (
    <div className="container-fluid">

      <div className="row">
        <div className="col-lg-4">
          <h6 className="txt-subtitle">
            Find new events and meet more
            people in your university.
          </h6>

          <p className="txt-subtext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
            do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut.
          </p>

          <Link to="/signup">
            <Button className="btn-gradient btn-large" style={{ marginBottom: '5vh' }}> Create an Account </Button>
          </Link>
        </div>

        <div className="col-lg-8 d-flex justify-content-end">
        <Image src={CrayonSuccess} className="img-fluid" />
      </div>
      </div>
      
    </div>
  )
}

export default AppDescription