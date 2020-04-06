import React from 'react'

import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <p
    className="txt-gradient txt-lg txt-bold"
    onClick={firebase.doSignOut}
    type="button">
    Logout
  </p>
)

export default withFirebase(SignOutButton)