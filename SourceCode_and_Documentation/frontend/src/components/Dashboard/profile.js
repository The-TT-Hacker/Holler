import React from 'react'

import EditPencil from '../../icons/edit-pencil.svg'
import Birthday from '../../icons/birthday.png'
import Mortarboard from '../../icons/mortarboard.png'
import Paragliding from '../../icons/paragliding.png'

import { Button } from 'react-bootstrap'
import { Avatar } from './subcomponents'

import '../../styles/explore.css'


const Profile = (props) => {

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ margin: 0, padding: 0 }}>
      
      <div className="coloured-gradient-banner">
        <div className="avatar-margin-top"> <Avatar size="large" /> </div>
      </div>
      
      <div className="main-content">
        <div className="row spacer-down">
          <div className="col d-flex flex-row align-items-center">
            <div className="page-title spacer-right"> John Citizen </div>
            <img className="image-as-button" src={EditPencil} style={{ width: "32px", height: "32px" }} alt="edit-button" />
          </div>
        </div>

        <div className="row">
          <div className="col d-flex flex-row align-items-center">
          <div className="page-title spacer-right" style={{ fontSize: '24px' }}> Student at University of New South Wales</div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col d-flex flex-row align-items-center">
            <div className="page-title spacer-right" style={{ fontSize: '20px', fontWeight: 'normal' }}> Matched 13 times & unlocked 4 badges </div>
          </div>
        </div>

        <div style={{marginBottom: '5vh'}}></div>

        <div className="row spacer-down">
          <div className="col d-flex flex-row align-items-center">
            <img className="spacer-right" src={Birthday} style={{ width: "48px", height: "48px" }} alt="birthday" />
            <div className="page-title spacer-right" style={{ fontSize: '20px', fontWeight: 'normal' }}> Born on the 21st of June, 2001 </div>
            <img className="image-as-button" src={EditPencil} style={{ width: "24px", height: "24px" }} alt="edit-button" />
          </div>
        </div>

        <div className="row spacer-down">
          <div className="col d-flex flex-row align-items-center">
            <img className="spacer-right" src={Mortarboard} style={{ width: "48px", height: "48px" }} alt="mortarboard" />
            <div className="page-title spacer-right" style={{ fontSize: '20px', fontWeight: 'normal' }}> Majoring in Arts & Education </div>
            <img className="image-as-button" src={EditPencil} style={{ width: "24px", height: "24px" }} alt="edit-button" />
          </div>
        </div>

        <div className="row" style={{ marginBottom: '2.5vh' }}>
          <div className="col d-flex flex-row align-items-center">
            <img className="spacer-right" src={Paragliding} style={{ width: "48px", height: "48px" }} alt="paraglider"/>
            <div className="page-title spacer-right" style={{ fontSize: '20px', fontWeight: 'normal' }}> Interested in Karaoke, Finance, Sports & Technology </div>
            <img className="image-as-button" src={EditPencil} style={{ width: "24px", height: "24px" }} alt="edit-button" />
          </div>
        </div>

        <div style={{marginBottom: '5vh'}}></div>

        <div className="row">
          <div className="col">
            <Button variant="danger spacer-down"> Delete Your Account </Button>
            <div className="txt-form spacer-down" style={{ fontSize: '14px' }}> * Warning: This proccess is not reversible, please ensure you have saved all important information. </div>
          </div>
        </div>

        <div style={{marginBottom: '10vh'}}></div>
        
      </div>
    </div>
  )
}

export default Profile
