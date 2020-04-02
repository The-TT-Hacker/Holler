import React from 'react'

import SignOutButton from './signout'
import User from '../../icons/user.svg'
import { Navbar, Nav, Image } from 'react-bootstrap'



const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="xl" variant="light" style={{padding: '0 5vw 0 5vw'}}>
            <Navbar.Brand href="#"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav defaultActiveKey="/dashboard" className="d-nav mr-auto" >
                    <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/explore">  Explore </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/going"> Going </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/matches"> Matches </Nav.Link> </Nav.Item>
                    <Nav.Item> <Nav.Link className="d-nav-link" href="/dashboard/profile"> Profile </Nav.Link> </Nav.Item>


                </Nav>
                <Nav className="ml-auto">
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <div class="circle"> <Image src={User}/> </div>
                        <div className="active-user"> John Citizen </div>
                    </div>
                </Nav>
                <SignOutButton />
            </Navbar.Collapse>
        </Navbar>
    )
}



export default Navigation
