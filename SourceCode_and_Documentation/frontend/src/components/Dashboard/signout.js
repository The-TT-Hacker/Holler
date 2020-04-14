import React from 'react'

import { withFirebase } from '../Firebase'
import { Nav } from 'react-bootstrap'

const SignOutButton = ({ firebase }) => (
  <Nav.Link
    className="txt-gradient d-nav-link"
    onClick={firebase.doSignOut}
    type="button">
    Logout
  </Nav.Link>
)

export default withFirebase(SignOutButton)