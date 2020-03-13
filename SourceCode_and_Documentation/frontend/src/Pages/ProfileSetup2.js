import React from 'react'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const ProfileSetup2 = () => {

    return (
        <div className="page-body">

            <div className="page-title"> Holler <span className="dot"></span> </div>
            <h6 className="page-subtitle"> Your Avatar! </h6>

            <p className="page-subtext">
            Customise your avatar <br />
            to say something about you!
            </p>

            <br />

            <p className="page-subtext">
            Step 2 of 4
            </p>

            <Link to="/profile-setup-3"> <Button className="btn-gradient btn-lg"> Continue </Button> </Link>

        </div>
    )
}

export default ProfileSetup2
