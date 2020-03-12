import React from 'react'

import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const ProfileSetup3 = () => {
    return (
        <div className="page-body">

        <div className="page-title"> Holler <span className="dot"></span> </div>
        <h6 className="page-subtitle"> Your University! </h6>

        <p className="page-subtext">
        Please fill the following details so we can <br />
        get you up and running with Holler!
        </p>

        <Form.Group className="">
          <Form.Control as="select">
            <option>Select Your Institution</option>
            <option>University of New South Wales</option>
            <option>University of Sydney </option>
            <option>University of Technology Sydney </option>
            <option>Western Sydney University</option>
          </Form.Control>

          <br />

          <Form.Control as="select">
            <option>Select Your Faculty</option>
            <option>School of Engineering</option>
            <option>School of Science</option>
            <option>School of blah</option>
            <option>School of blah</option>
          </Form.Control>
        </Form.Group>


        <p className="page-subtext">
        Step 3 of 4
        </p>

        <Link to="/profile-setup-4"> <Button className="login-button" size="lg"> Continue </Button> </Link>

        </div>
    )
}

export default ProfileSetup3
