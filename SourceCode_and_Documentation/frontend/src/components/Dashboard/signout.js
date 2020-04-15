import React from 'react'

import { withFirebase } from '../Firebase'

const SignOutButton = ({ firebase }) => (
  <div className="txt-gradient d-nav-link" style={{padding: '0'}} onClick={firebase.doSignOut}> Logout </div>
)

export default withFirebase(SignOutButton)