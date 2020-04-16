import React from 'react'

import SignOutButton from './signout'
import { Navbar, Nav } from 'react-bootstrap'
import { withFirebase } from '../Firebase'

import '../../styles/responsive.css'
import '../../styles/text.css'

const Navigation = ({ firebase }) => {

  return (
    <div style={{ overflowX: 'show' }}>
    
      {/* Coloured Bar */}
      <div className="row">
        <div className="col">
          <div className="coloured-strip"></div>
        </div>
      </div>

      {/* Navigation */}
      <div className="row">
        <div className="col">
          <Navbar collapseOnSelect expand="xl" variant="light" style={{ padding: '0 5vw 0 5vw' }}>
          
            {/* Application Title */}
            <Navbar.Brand href="/dashboard/explore"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            
            <Navbar.Collapse id="responsive-navbar-nav">

              {/* Left Part */}
              <Nav defaultActiveKey="/dashboard/explore" className="d-nav mr-auto">
                <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/explore">  Explore </Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/going"> Going </Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/matches"> Matches </Nav.Link> </Nav.Item>
                <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/achievements"> Achievements </Nav.Link> </Nav.Item>
              </Nav>

              <Nav className="d-flex ml-auto">
                <SignOutButton />
                <div className="shown-on-mobile">
                  <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/profile"> Your Profile </Nav.Link> </Nav.Item>
                  <Nav.Item> <Nav.Link className="txt-gradient d-nav-link" onClick={firebase.doSignOut}> Logout </Nav.Link> </Nav.Item>
                </div>
              </Nav>
              
            
            </Navbar.Collapse>
          </Navbar>
        </div>
      </div>
      
      <hr style={{ width: '80vw', color: 'black' }} />
    </div>
)
}



export default withFirebase(Navigation)
