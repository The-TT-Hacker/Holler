import React, { useState, useEffect } from 'react'
import axios from 'axios'

import EditPencil from '../../icons/edit-pencil.svg'
import Birthday from '../../icons/birthday.png'
import Mortarboard from '../../icons/mortarboard.png'
import Paragliding from '../../icons/paragliding.png'
import CheckMark from '../../icons/checkmark.svg'

import { BACKEND } from '../../constants/roles'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Avatar } from './subcomponents'

import '../../styles/explore.css'

const Editable = ({
  text,
  type,
  placeholder,
  children,
  editText,
  sizeText,
  sizeEditIcon,
  textWeight,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false)
  const handleKeyDown = (event, type) => {

  }

  return (
    <section {...props}>

      {isEditing ? (
        <div className="d-flex flex-row align-items-center" onBlur={() => setEditing(false)} onKeyDown={e => handleKeyDown(e, type)}>
          {children}
          <OverlayTrigger key="right" placement="right" overlay={
              <Tooltip className="hide-on-mobile" id={`tooltip-${text}`}>
                Save your changes.
              </Tooltip>
            }>
          <img className="image-as-button" src={CheckMark} style={{ width: sizeEditIcon, height: sizeEditIcon }} alt="edit-button" onClick={() => setEditing(false)}/>
          </OverlayTrigger>
        </div>
      ) : (
          <div className="d-flex flex-row align-items-center">
            <div className="spacer-right" style={{ fontFamily: 'Poppins', fontSize: sizeText, fontWeight: textWeight, marginBottom: '0'}}> {text} </div>
            <OverlayTrigger key="right" placement="right" overlay={
              <Tooltip className="hide-on-mobile" id={`tooltip-${text}`}>
                {editText}
              </Tooltip>
            }>
            <img className="image-as-button" src={EditPencil} style={{ width: sizeEditIcon, height: sizeEditIcon }} alt="edit-button" onClick={() => setEditing(true)} />
            </OverlayTrigger>
          </div>
        )}

    </section>
  )
}

const Profile = (props) => {

  const [error, setError] = useState("")

  const [name, setName] = useState("Niraj Sapkota")
  const [dob, setDOB] = useState("2001-06-21")
  const [majors, setMajors] = useState(["Arts", "Education"])
  const [hobbies, setHobbies] = useState(["Karaoke", "Finance", "Sports", "Technology"])
  const [faculties, setFaculties] = useState([]) 

// get information from backend
useEffect(() => {
    
  // Flag to use for cleanup
  const source = axios.CancelToken.source()  

  // auth token - in useEffect to supress depdendency warnings
  const token = localStorage.getItem('token')

  // Request Function
  const fetchData = async () => {
    
    // Make a request to get all the faculties, faculty codes, classes and class codes
    await axios({
      BACKEND: BACKEND + "/timetable/faculties/unsw",
      method:"GET",
      cancelToken: source.token,
      headers: {
        'Authorization': `${token}`
      },
    })
    .then(res => {
      
      // Filter the data to only the name of the major
      var majors = res.data.map(({ name }) => name)

      // Convert it into a set to remove duplicates
      const uniqueSet = new Set(majors)

      // Convert it back to an array
      majors = [...uniqueSet]

      // Save it to the state
      setFaculties(majors)

    })
    .catch(err => {

      if (axios.isCancel(err)) {
        setError(err)
      } else {
        setError(err)
      }

    })
  }

  // Make the request
  fetchData()

  // Cancel other requests
  return () => {
    source.cancel()
  }

}, [])


  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ margin: 0, padding: 0 }}>

      <div className="coloured-gradient-banner">
        <div className="avatar-margin-top"> <Avatar size="large" /> </div>
      </div>

      <div className="main-content">

        <div className="row">
          <div className="col">
            
            <Editable text={name} placeholder="Enter your name" editText="Edit your profile name." sizeText="48px" textWeight="bold" sizeEditIcon="32px">
              <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.currentTarget.value)} />
              </Form.Group>
            </Editable>

          </div>
        </div>

        <div className="row">
          <div className="col d-flex flex-row align-items-center">
            <div className="page-title spacer-right" style={{ fontSize: '24px' }}> Student at The University of New South Wales</div>
          </div>
        </div>

        <hr />

        <div className="row">
          <div className="col d-flex flex-row align-items-center">
            <div className="page-title spacer-right" style={{ fontSize: '20px', fontWeight: 'normal' }}> Matched 13 times & unlocked 4 badges </div>
          </div>
        </div>

        <div style={{ marginBottom: '5vh' }}></div>

        <div className="row spacer-down">
          <div className="col d-flex flex-row align-items-center">
            <img className="spacer-right" src={Birthday} style={{ width: "48px", height: "48px" }} alt="birthday" />
            <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Born on the </span>
            <Editable text={dob} placeholder="Enter your name" editText="Edit your date of birth." textWeight="normal" textSize="small"  sizeEditIcon="24px">
              <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                <Form.Control type="date" placeholder="Enter your name" value={dob} onChange={e => setDOB(e.currentTarget.value)} />
              </Form.Group>
            </Editable>

          </div>
        </div>

        <div className="row spacer-down">
          <div className="col d-flex flex-row align-items-center">
            <img className="spacer-right" src={Mortarboard} style={{ width: "48px", height: "48px" }} alt="birthday" />
            <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Majoring in </span>
            <Editable text={majors} placeholder="Enter your name" editText="Edit your date of birth." textWeight="normal" textSize="small"  sizeEditIcon="24px">
              <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                <Form.Control type="text" placeholder="Enter your name" value={majors} onChange={e => setMajors(e.currentTarget.value)} />
              </Form.Group>
            </Editable>

          </div>
        </div>

        <div className="row" style={{ marginBottom: '2.5vh' }}>
          <div className="col d-flex flex-row align-items-center">

            <img className="spacer-right" src={Paragliding} style={{ width: "48px", height: "48px" }} alt="birthday" />
            <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Interested in </span>
            <Editable text={hobbies} placeholder="Enter your name" editText="Edit your date of birth." textWeight="normal" textSize="small"  sizeEditIcon="24px">
              <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                <Form.Control type="text" placeholder="Enter your name" value={hobbies} onChange={e => setHobbies(e.currentTarget.value)} />
              </Form.Group>
            </Editable>

          </div>
        </div>

        <div style={{ marginBottom: '5vh' }}></div>

        <div className="row">
          <div className="col">
            <Button variant="danger spacer-down"> Delete Your Account </Button>
            <div className="txt-form spacer-down" style={{ fontSize: '14px' }}> * Warning: This proccess is not reversible, please ensure you have saved all important information. </div>
          </div>
        </div>

        <div style={{ marginBottom: '10vh' }}></div>

      </div>
    </div>
  )
}

export default Profile
