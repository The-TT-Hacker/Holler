import React from 'react'

import User from '../Icons/user.svg'
import { Navbar, Nav, Image } from 'react-bootstrap'

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" variant="light">
            <Navbar.Brand href="#home"> <div className="page-title"> Holler <span className="dot"></span> </div> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav defaultActiveKey="link-0" className="dashboard-nav mr-auto">
                    <Nav.Item> <Nav.Link className="dashboard-nav-link" eventKey="link-0"> Explore </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="dashboard-nav-link" eventKey="link-1"> Going </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="dashboard-nav-link" eventKey="link-2"> Matches </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="dashboard-nav-link" eventKey="link-3"> Profile </Nav.Link> </Nav.Item>
                </Nav>
                <Nav className="ml-auto">
                    <div className="stack">
                        <div class="circle"> <Image src={User}/> </div>
                        <div className="active-user"> Bob Cheers </div>
                    </div>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation