import React, { useState, useEffect } from 'react'
import axios from 'axios'

import EditPencil from '../../icons/edit-pencil.svg'
import Birthday from '../../icons/birthday.png'
import Mortarboard from '../../icons/mortarboard.png'
import Paragliding from '../../icons/paragliding.png'
import CheckMark from '../../icons/checkmark.svg'
import Classroom from '../../icons/classroom.png'

import { BACKEND } from '../../constants/roles'
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { Avatar } from './subcomponents'
import { Typeahead } from 'react-bootstrap-typeahead'
import { Spinner } from '@zendeskgarden/react-loaders'

import * as ROUTES from '../../constants/routes'

import '../../styles/explore.css'

const SeparateIfList = (props) => {

  if (Array.isArray(props.text)) {

    return (
      props.text.map((elem, index) => {

        if (index === props.text.length - 1)
          return ( <div className="col" key={elem}><span > {elem} </span> </div>)
        else
          return ( <div className="col" key={elem}><span > {elem + ", "} </span> </div>)
  
      })
    )

  } else {
    return (<span key={props.text}> {props.text} </span>)
  }

}

const Editable = ({
  text,
  type,
  placeholder,
  children,
  editText,
  sizeText,
  sizeEditIcon,
  textWeight,
  updateFunction,
  ...props
}) => {

  const [isEditing, setEditing] = useState(false)
  const handleKeyDown = (event, type) => {
  }

  return (
    <section {...props}>


      {isEditing ? (

        <div className="d-flex flex-row align-items-center" onBlur={() => { setEditing(false); updateFunction(text) }} onKeyDown={e => handleKeyDown(e, type)}>
          {children}
          <OverlayTrigger key="right" placement="right" overlay={
            <Tooltip className="hide-on-mobile" id={`tooltip-${text}`}> Save your changes </Tooltip>
          }>
            <img className="image-as-button" src={CheckMark} style={{ width: sizeEditIcon, height: sizeEditIcon }} alt="edit-button" onClick={() => { setEditing(false); updateFunction(text) }} />
          </OverlayTrigger>
        </div>

      ) : (

          <div className="d-flex flex-row align-items-center">
            <div className="spacer-right truncate-if-too-long" style={{ fontFamily: 'Poppins', fontSize: sizeText, fontWeight: textWeight, marginBottom: '0' }}>
              <SeparateIfList text={text} />
            </div>
            <OverlayTrigger key="right" placement="right" overlay={
              <Tooltip className="hide-on-mobile" id={`tooltip-${text}`}> {editText} </Tooltip>
            }>
              <img className="image-as-button" src={EditPencil} style={{ width: sizeEditIcon, height: sizeEditIcon }} alt="edit-button" onClick={() => setEditing(true)} />
            </OverlayTrigger>
          </div>

        )}

    </section>
  )
}

const updateUserName = async (newName) => {
  const token = localStorage.getItem('token')
  sessionStorage.setItem('name', newName)

  await axios({
    url: BACKEND + '/user',
    method: "PUT",
    headers: { 'Authorization': `${token}` },
    data: {
      firstName: newName.split(" ")[0],
      lastName: newName.split(" ")[newName.split(" ").length - 1]
    }
  })
    .then(function (response) {
      console.log("Success: ", response)
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}

const updateUserFaculties = async (newFaculties) => {
  const token = localStorage.getItem('token')
  sessionStorage.setItem('faculties', JSON.stringify(newFaculties))

  await axios({
    url: BACKEND + '/user',
    method: "PUT",
    headers: { 'Authorization': `${token}` },
    data: {
      faculties: newFaculties
    }
  })
    .then(function (response) {
      console.log("Success: ", response)
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}

const updateUserClasses = async (newClasses) => {
  const token = localStorage.getItem('token')
  sessionStorage.setItem('classes', JSON.stringify(newClasses))

  await axios({
    url: BACKEND + '/user',
    method: "PUT",
    headers: { 'Authorization': `${token}` },
    data: {
      classes: newClasses
    }
  })
    .then(function (response) {
      console.log("Success: ", response)
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}

const updateUserInterests = async (newInterests) => {
  const token = localStorage.getItem('token')
  sessionStorage.setItem('interests', JSON.stringify(newInterests))

  await axios({
    url: BACKEND + '/user',
    method: "PUT",
    headers: { 'Authorization': `${token}` },
    data: {
      interests: newInterests
    }
  })
    .then(function (response) {
      console.log("Success: ", response)
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}

const deleteUserAccount = async (props) => {
  const token = localStorage.getItem('token')
  console.log(props)

  await axios({
    url: BACKEND + "/user",
    method: "DELETE",
    headers: { 'Authorization': `${token}` }
  })
    .then(function (response) {
      console.log("Success: ", response)
      sessionStorage.removeItem('avatar')
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('name')
      sessionStorage.removeItem('dob')
      sessionStorage.removeItem('classes')
      sessionStorage.removeItem('faculties')
      sessionStorage.removeItem('interests')
      props.history.push(ROUTES.LANDING)
    })
    .catch(function (error) {
      console.log("Error: ", error)
    })
}

const Profile = (props) => {

  /* Fetch
   */
  const [isLoading, setIsLoading] = useState(true)
  const [facultiesList, setFacultiesList] = useState([])
  const [classesList, setClassesList] = useState([])
  const [interestsList, setInterestsList] = useState([])

  /* User Data
   */
  const [name, setName] = useState("")
  const [dob, setDOB] = useState("")
  const [faculties, setFaculties] = useState([])
  const [classes, setClasses] = useState([])
  const [interests, setInterests] = useState([])

  const updateUserDOB = async (newDOB) => {
    const token = localStorage.getItem('token')

    var newDOBAsDate = new Date(newDOB)
    var stringDate = newDOBAsDate.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    sessionStorage.setItem('dob', stringDate)
    setDOB(stringDate)

    await axios({
      url: BACKEND + '/user',
      method: "PUT",
      headers: { 'Authorization': `${token}` },
      data: {
        dob: newDOBAsDate
      }
    })
      .then(function (response) {
        console.log("Success: ", response)
      })
      .catch(function (error) {
        console.log("Error: ", error)
      })
  }

  const RenderProfile = () => {
    return (
      <div className="container-fluid d-flex flex-column align-items-center" style={{ margin: 0, padding: 0 }}>
        <div className="coloured-gradient-banner">
          <div className="avatar-margin-top"> <Avatar size="large" /> </div>
        </div>

        <div className="main-content">

          {/* Name */}
          <div className="row">
            <div className="col">

              <Editable text={name} placeholder="Enter your name" updateFunction={updateUserName} editText="Update your name" sizeText="48px" textWeight="bold" sizeEditIcon="32px">
                <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                  <Form.Control type="text" placeholder="Enter your name" value={name} onChange={e => setName(e.currentTarget.value)} />
                </Form.Group>
              </Editable>

            </div>
          </div>

          {/* University */}
          <div className="row">
            <div className="col d-flex flex-row align-items-center">
              <div className="page-title spacer-right" style={{ fontSize: '24px' }}> Student at The University of New South Wales</div>
            </div>
          </div>

          <hr />

          <div style={{ marginBottom: '2.5vh' }}></div>

          {/* Date of Birth */}
          <div className="row spacer-down">
            <div className="col d-flex flex-row align-items-center">
              <img className="spacer-right" src={Birthday} style={{ width: "48px", height: "48px" }} alt="birthday" />
              <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Born on the </span>
              <Editable text={dob} updateFunction={updateUserDOB} placeholder="Enter your name" editText="Update your date of birth" textWeight="normal" textSize="small" sizeEditIcon="24px">
                <Form.Group className="reponsive-form spacer-right" style={{ marginBottom: '0' }}>
                  <Form.Control type="date" placeholder="Enter your name" value={dob} onChange={e => setDOB(e.currentTarget.value)} />
                </Form.Group>
              </Editable>

            </div>
          </div>

          {/* Faculties */}
          <div className="row spacer-down">
            <div className="col d-flex flex-row align-items-center">
              <img className="spacer-right" src={Mortarboard} style={{ width: "48px", height: "48px" }} alt="birthday" />
              <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Majoring in </span>
              <Editable text={faculties} updateFunction={updateUserFaculties} placeholder="Enter your name" editText="Update your majors" textWeight="normal" textSize="small" sizeEditIcon="24px">

                <Typeahead
                  style={{ width: "80%" }}
                  size="lg"
                  clearButton
                  id="basic-typeahead-example"
                  labelKey="majors"
                  multiple={true}
                  onChange={setFaculties}
                  options={facultiesList}
                  selected={faculties}
                  className="spacer-down"
                  placeholder="Select your major(s)" />

              </Editable>
            </div>
          </div>

          {/* Classes */}
          <div className="row spacer-down">
            <div className="col d-flex flex-row align-items-center">
              <img className="spacer-right" src={Classroom} style={{ width: "48px", height: "48px" }} alt="classes" />
              <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Currently studying </span>
              <Editable text={classes} updateFunction={updateUserClasses} placeholder="Enter your name" editText="Update your majors" textWeight="normal" textSize="small" sizeEditIcon="24px">

                <Typeahead
                  style={{ width: "80%" }}
                  size="lg"
                  clearButton
                  id="basic-typeahead-example"
                  labelKey="majors"
                  multiple={true}
                  onChange={setClasses}
                  options={classesList}
                  selected={classes}
                  className="spacer-down"
                  placeholder="Select your classes(s)" />

              </Editable>
            </div>
          </div>

          {/* Interests */}
          <div className="row" style={{ marginBottom: '2.5vh' }}>
            <div className="col d-flex flex-row align-items-center">

              <img className="spacer-right" src={Paragliding} style={{ width: "48px", height: "48px" }} alt="birthday" />
              <span style={{ fontFamily: 'Poppins', fontSize: 'normal', marginRight: '0.25rem' }}> Interested in </span>
              <Editable text={interests} updateFunction={updateUserInterests} placeholder="Enter your name" editText="Update your majors" textWeight="normal" textSize="small" sizeEditIcon="24px">

                <Typeahead
                  style={{ width: "80%" }}
                  size="lg"
                  clearButton
                  id="basic-typeahead-example"
                  labelKey="majors"
                  multiple={true}
                  onChange={setInterests}
                  options={interestsList}
                  selected={interests}
                  className="spacer-down"
                  placeholder="Select your classes(s)" />

              </Editable>
            </div>
          </div>

          <div style={{ marginBottom: '5vh' }}></div>

          {/* Account Deletion */}
          <div className="row">
            <div className="col">
              <Button variant="danger spacer-down" onClick={() => deleteUserAccount(props)}> Delete Your Account </Button>
              <div className="txt-form spacer-down" style={{ fontSize: '14px' }}> * Warning: This proccess is not reversible, please ensure you have saved all important information. </div>
            </div>
          </div>

          <div style={{ marginBottom: '10vh' }}></div>

        </div>
      </div>
    )
  }

  const LoadingScreen = () => {
    return (
      <div className="row" style={{ height: '80vh' }}>
        <div className="col d-flex justify-content-center align-items-center">
          <div class="sk-fading-circle">
            <div class="sk-circle1 sk-circle"></div>
            <div class="sk-circle2 sk-circle"></div>
            <div class="sk-circle3 sk-circle"></div>
            <div class="sk-circle4 sk-circle"></div>
            <div class="sk-circle5 sk-circle"></div>
            <div class="sk-circle6 sk-circle"></div>
            <div class="sk-circle7 sk-circle"></div>
            <div class="sk-circle8 sk-circle"></div>
            <div class="sk-circle9 sk-circle"></div>
            <div class="sk-circle10 sk-circle"></div>
            <div class="sk-circle11 sk-circle"></div>
            <div class="sk-circle12 sk-circle"></div>
          </div>
        </div>
      </div>
    )
  }

  /* Get all timetables and
   * classes at UNSW
   */
  useEffect(() => {

    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')

    const getUser = async () => {
      await axios({
        url: BACKEND + "/user",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` }
      }).then(response => {
        setName(response.data.firstName + " " + response.data.lastName)
        setDOB(new Date(response.data.dob).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
        setFaculties(response.data.faculties)
        setClasses(response.data.classes)
        setInterests(response.data.interests)
        setIsLoading(false)
      }).catch(error => {
        if (axios.isCancel(error))
          console.log("Cancelled")
        else
          console.log("Error: ", error)
      })
    }

    const getFacultiesList = async () => {

      await axios({
        url: BACKEND + "/timetable/faculties/unsw",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` },
      })
        .then(function (response) {
          var facultiesList = response.data.map(({ name }) => name)
          const uniqueSet = new Set(facultiesList)
          facultiesList = [...uniqueSet]
          setFacultiesList(facultiesList)
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {

          } else {
            console.log(error)
          }
        })
    }

    const getClassesList = async () => {

      await axios({
        url: BACKEND + "/timetable/class_codes/unsw",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` },
      })
        .then(function (response) {
          setClassesList(response.data)
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
          } else {
            console.log(error)
          }
        })
    }

    const getInterestsList = async () => {

      await axios({
        url: BACKEND + "/interests",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` }
      })
        .then(function (response) {
          setInterestsList(response.data)
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {
          } else {
            console.log(error)
          }
        })

    }

    getUser()
    getFacultiesList()
    getClassesList()
    getInterestsList()

    return () => {
      source.cancel()
    }

  }, [])

  return (
    <div>
      {isLoading ? <LoadingScreen /> : <RenderProfile />}
    </div>
  )
}

export default Profile
