import React, {useState} from 'react'

import { Card, Button} from 'react-bootstrap'

import { PageTitle, Avatar, Badges, Chart } from './subcomponents'
import { updateScrollability } from '../../constants';

import '../../styles/explore.css'


const Profile = (props) => {

  updateScrollability(true)

  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="main-content">

        <PageTitle title="Your Profile" />

        {/* Avatar Image */}
        <div className="row spacer-up">
          <div className="col d-flex justify-content-center">
            <Avatar />
          </div>
        </div>

        {/* Name */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="txt-subtitle"> John Citizen </div>
          </div>
        </div>

        <Badges/>
        
        <Chart/>
      
        <Card className="profile-card">
          <Card.Header>
              <span className="txt-bold txt-md"> Personal Information </span>
            </Card.Header>
            <Card.Body>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Name </div>
                <div className="float-right txt-poppins"> Bob Cheers </div>
              </div>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Birthday </div>
                <div className="float-right txt-poppins"> 12/04/1995 </div>
              </div>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Email </div>
                <div className="float-right txt-poppins"> b.cheers@student.unsw.edu.au </div>
              </div>
              <div className="clearfix">
                <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
              </div>
            </Card.Body>
        </Card>

        <Card className="profile-card">
          <Card.Header>
            <span className="txt-bold txt-md"> University Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <div className="float-left txt-poppins"> University </div>
              <div className="float-right txt-poppins"> UNSW Sydney </div>
            </div>
            <div className="clearfix">
              <div className="float-left txt-poppins"> School </div>
              <div className="float-right txt-poppins"> Engineering/Arts </div>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card className="profile-card">
          <Card.Header>
            <span className="txt-bold txt-md"> Your Interests </span>
          </Card.Header>
          <Card.Body>
            Some body placeholder text since this segment has not been fully implemented yet.
          </Card.Body>
        </Card>

        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <Button className="btn-gradient spacer-down"> Delete Account </Button>
            <p className="txt-subtext txt-align-center"> You cannot recover your account once deleted, proceed with caution. </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Profile
