import React from 'react'

import CrayonSuccess from '../Icons/crayon-success.svg'
import { Link } from 'react-router-dom'
import { Navbar, Nav, Image, Button } from 'react-bootstrap'

const Landing = () => {
    return (
        <div className="landing">
            <Navbar collapseOnSelect expand="lg" variant="light" style={{ height: '10vh' }}>
                <Navbar.Brand href="#home"> <div className="page-title"> Holler <span className="dot"></span> </div> </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">
                        <Link to="/login"> <p className="txt-gradient txt-lg txt-bold" style={{ marginRight: '2.25vw' }}> Login </p> </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 align-left">
                        <h6 className="landing-page-subtitle">
                            Find new events and meet <br />
                            more people in your <br />
                            university.
                        </h6>

                        <p className="landing-page-subtext" style={{ width: '550px' }}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna
                            aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                            ullamco laboris nisi ut.
                        </p>

                        <Link to="/signup">
                            <Button className="btn-gradient btn-large">
                                Create an Account
                        </Button>
                        </Link>
                    </div>
                    <div className="col-lg-6 align-right">
                        <Image src={CrayonSuccess} className="img-fluid" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Landing