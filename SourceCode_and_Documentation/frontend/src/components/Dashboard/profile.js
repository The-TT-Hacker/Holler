import React from 'react'

import { Image, Card, Button } from 'react-bootstrap'

import User from '../../icons/user.svg'

const Profile = () => {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="circle"> <Image src={User} /> </div>
        <br />
        <div className="txt-subtitle"> John Citizen </div>
      </div>
      <hr style={{ width: '75vw' }} />

      <div className="d-flex flex-column justify-content-center align-items-center">

        <div className="row txt-align-center">
          <div className="col-6">
            <p className="txt-font txt-bold txt-md" style={{margin: 0}}> 12 </p>
            <p className="txt-font txt-normal"> Groups </p>
          </div>
          <div className="col-6">
            <p className="txt-font txt-bold txt-md" style={{margin: 0}}> 6 </p>
            <p className="txt-font"> Badges </p>
          </div>
        </div>

        <Card style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Body>
            Insert a Chart Here
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> Personal Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Name </Card.Title>
              <Card.Text className="float-right"> Bob Cheers </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Birthday </Card.Title>
              <Card.Text className="float-right"> 12/04/1995 </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Email </Card.Title>
              <Card.Text className="float-right"> b.cheers@student.unsw.edu.au </Card.Text>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> University Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> University </Card.Title>
              <Card.Text className="float-right"> UNSW Sydney </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> School </Card.Title>
              <Card.Text className="float-right"> Engineering/Arts </Card.Text>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> Your Interests </span>
          </Card.Header>
          <Card.Body>
            Some body placeholder text since this segment has not been fully implemented yet.
          </Card.Body>
        </Card>

        <Button className="btn-gradient"> Delete Account </Button>
        <p className="txt-subtext txt-align-center"> You cannot recover your account once deleted, proceed with caution. </p>

      </div>

    </div>
  )
}

export default Profile