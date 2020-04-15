import React from 'react'

import { Navbar, Nav } from 'react-bootstrap'
import { withFirebase } from '../Firebase'

const Navigation = (props) => {
  
  const redirect = () => {
    let redirect_link = document.createElement("a")
    
    if (props.firebase.auth.currentUser)
      redirect_link.href = "/dashboard/explore"
    else 
      redirect_link.href = "/login"

    redirect_link.click()
  }

  return (
    <Navbar collapseOnSelect expand="lg" variant="light">
      <Navbar.Brand href="#">
        <span className="txt-title"> Holler </span>
        <span className="dot"></span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto" style={{marginRight: '3vw'}}>
          <p className="txt-gradient txt-lg txt-bold image-as-button" onClick={redirect}> Login </p>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default withFirebase(Navigation)