import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap'

import './styles.css'

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" variant="light">
      <Navbar.Brand href="#">
        <span className="txt-title"> Holler </span>
        <span className="dot"></span>
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />

      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Link to="/login">
            <p className="txt-gradient txt-lg txt-bold"> Login </p>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navigation