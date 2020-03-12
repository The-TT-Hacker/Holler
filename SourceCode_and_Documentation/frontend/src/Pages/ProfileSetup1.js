import React, {useState} from 'react'

import Calendar from '../Icons/calendar.svg'
import AtSign from '../Icons/at-sign.svg'

import { Link } from 'react-router-dom'
import { Form, InputGroup, Image, Button } from 'react-bootstrap'

const ProfileSetup1 = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className="page-body">

            <div className="page-title"> Holler <span className="dot"></span> </div>
            <h6 className="page-subtitle"> You Made It! </h6>

            <p className="page-subtext">
            Please fill the following details so we can <br />
            get you up and running with Holler!
            </p>

            <br />

            <Form.Group>
                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                    <Image src={AtSign} />
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className="login-form-control" size="lg" type="text" placeholder="First Name" />
                </InputGroup>
                <p className="text-small"> * This will be visible to other people. </p>

                <InputGroup>
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                    <Image src={Calendar} style={{colour: "black"}} />
                    </InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control className="login-form-control" size="lg" type="date" />
                </InputGroup>
            </Form.Group>

            <p className="page-subtext">
            Step 1 of 4
            </p>

            <Link to="/profile-setup-2"> <Button className="login-button" size="lg"> Continue </Button> </Link>

        </div>
    )
}

export default ProfileSetup1
