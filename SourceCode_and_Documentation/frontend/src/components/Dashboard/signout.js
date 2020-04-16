import React from 'react'

import { Avatar } from './subcomponents'
import { withFirebase } from '../Firebase'
import { Dropdown, ButtonGroup } from 'react-bootstrap'

const SignOutButton = ({ firebase }) => {
  return (
    <Dropdown as={ButtonGroup} alignRight>
      <Dropdown.Toggle className="btn-light-hover right-nav">  <Avatar /> </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey="1" href="/dashboard/profile"> Your Profile </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="2" onClick={firebase.doSignOut}> Logout </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default withFirebase(SignOutButton)