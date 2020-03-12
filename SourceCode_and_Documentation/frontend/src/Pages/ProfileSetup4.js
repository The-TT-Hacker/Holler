import React from 'react'

import { Link } from 'react-router-dom'
import { Button, Badge } from 'react-bootstrap'

const ProfileSetup4 = () => {
    return (
        <div className="page-body">
            <div className="page-title"> Holler <span className="dot"></span> </div>
            <h6 className="page-subtitle"> Your Interests! </h6>

            <p className="page-subtext">
            Select a minimum of 3 interests so that we're <br />
            able to match you with like-minded people!
            </p>

            <div class="row">
                <Badge className="interests-badge" variant="dark">Photography</Badge>
                <Badge className="interests-badge" variant="dark">Family</Badge>
                <Badge className="interests-badge" variant="dark">Concerts</Badge>
                <Badge className="interests-badge" variant="dark">Science</Badge>
                <Badge className="interests-badge" variant="dark">Cinema</Badge>
                <Badge className="interests-badge" variant="dark">Music</Badge>
                <Badge className="interests-badge" variant="dark">Art</Badge>
            </div>

            <div class="row">
                <Badge className="interests-badge" variant="dark">Poker</Badge>
                <Badge className="interests-badge" variant="dark">Running</Badge>
                <Badge className="interests-badge" variant="dark">Beach</Badge>
                <Badge className="interests-badge" variant="dark">Gaming</Badge>
                <Badge className="interests-badge" variant="dark">Hiking</Badge>
                <Badge className="interests-badge" variant="dark">Gym</Badge>
                <Badge className="interests-badge" variant="dark">Dance</Badge>
            </div>

            <div class="row">
                <Badge className="interests-badge" variant="dark">Beach</Badge>
                <Badge className="interests-badge" variant="dark">Running</Badge>
                <Badge className="interests-badge" variant="dark">Music</Badge>
                <Badge className="interests-badge" variant="dark">Squash</Badge>
                <Badge className="interests-badge" variant="dark">Film</Badge>
                <Badge className="interests-badge" variant="dark">Music</Badge>
                <Badge className="interests-badge" variant="dark">Squash</Badge>
            </div>

            <br />

            <p className="page-subtext">
            Step 4 of 4
            </p>

            <Link to="/dashboard"> <Button className="login-button" size="lg"> Finish </Button> </Link>

        </div>
    )
}

export default ProfileSetup4
