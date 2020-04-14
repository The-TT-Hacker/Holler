import React from 'react'

import SignOutButton from './signout'
import { Avatar } from './subcomponents'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../styles/responsive.css'
import '../../styles/text.css'

const Navigation = () => {

    return (
        <div>
            <div className="coloured-strip"></div>
            <Navbar collapseOnSelect expand="xl" variant="light" style={{ padding: '0 5vw 0 5vw' }}>
                <Navbar.Brand href="/dashboard/explore"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav defaultActiveKey="/dashboard" className="d-nav mr-auto" >
                        <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/explore">  Explore </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/going"> Going </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/matches"> Matches </Nav.Link> </Nav.Item>
                        <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/profile"> Profile </Nav.Link> </Nav.Item>
                    </Nav>
                    <Nav className="ml-auto" style={{ marginRight: '25px' }}>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <Link to="/dashboard/profile">
                                <Avatar />
                            </Link>
                        </div>
                    </Nav>
                    <SignOutButton />
                </Navbar.Collapse>
            </Navbar>
            <hr style={{ width: '80vw', color: 'black' }} />
        </div>
    )
}



export default Navigation
