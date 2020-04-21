import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { Link  } from 'react-router-dom'
import { BACKEND } from '../../constants/roles'
import { withAuthentication } from '../Session'
import { Form, Button } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

// CSS for Typeahead
import 'react-bootstrap-typeahead/css/Typeahead.css';

const onDateFocus = (e) => { e.currentTarget.type = "date" }
const onDateBlur = (e) => { if (e.currentTarget.value === "") e.currentTarget.type = "text" }

const Step1 = (props) => {
  
  // global error variable
  const [error, setError] = useState("")
  const g_token = localStorage.getItem('token') // global token
  console.log(error)
  
  // information received from requests
  const [faculties, setFaculties] = useState([]) 
  const [classesList, setClassesList] = useState([])

  // values we will post
  const [name, setName] = useState("")
  const [dob, setDOB] = useState(new Date())
  const [majors, setMajors] = useState([])
  const [classes, setClasses] = useState([])
  
  // get information from backend
  useEffect(() => {
    
    // Flag to use for cleanup
    const source = axios.CancelToken.source()  
    const source_two = axios.CancelToken.source()

    // auth token - in useEffect to supress depdendency warnings
    const token = localStorage.getItem('token')

    // Request Function
    const fetchData = async () => {
      
      // Make a request to get all the faculties, faculty codes, classes and class codes
      await axios({
        url: BACKEND + "/timetable/faculties/unsw",
        method:"GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` },
      })
      .then(response => {
               
        var majors = response.data.map(({ name }) => name)
        const uniqueSet = new Set(majors)
        majors = [...uniqueSet]
        setFaculties(majors)
        
      })
      .catch(error => {

        if (axios.isCancel(error)) {
          setError(error)
        } else {
          setError(error)
        }

      })
    }

    const fetchClassList = async () => {

      await axios({
        url: BACKEND + "/timetable/class_codes/unsw",
        method: "GET",
        cancelToken: source_two.token,
        headers: { 'Authorization': `${token}` },
      })
      .then(response => {

        const uniqueSet = new Set(response.data)
        var classList = [...uniqueSet]
        setClassesList(classList)


      })
      .catch(error => {
  
        if (axios.isCancel(error)) {
          setError(error)
        } else {
          setError(error)
        }
  
      })
  
    }

    fetchData()
    fetchClassList()

    // Cancel other requests
    return () => {
      source.cancel()
    }

  }, [])


  // send user data to the backend
  const postData = async () => {
    var dobAsObject = new Date (dob)
    console.log(dobAsObject)

    await axios({
      url: BACKEND + '/user',
      method: "PUT",
      headers: {
        'Authorization': `${g_token}`
      },
      data: {
        firstName: name.split(" ")[0], // first element
        lastName: name.split(" ")[name.split(" ").length - 1], // last element
        dob: dobAsObject,
        faculties: majors,
        classes: classes
      }
    })
    .then(res => console.log(res))
    .catch(err => setError(err))

  } 

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', maxWidth: '600px'}}>
            
      <div className="container-fluid">
      
        {/* Application Title & Page description */}
        <div className="row">
          <div className="col">
            <div className="txt-title txt-align-center"> Holler <span className="dot"></span> </div>
            <h6 className="txt-subtitle txt-align-center"> You Made It! </h6>
            <p className="txt-subtext txt-align-center"> Please fill the following details so we can get you up and running with Holler! </p>
          </div>
        </div>

        {/* User Information Collection Form */}
        <div className="row spacer-up">
          <div className="col d-flex flex-column align-items-center">

            <Form.Group style={{ width: "80%" }}>
              
              {/* Full Name */}
              <Form.Control size="lg" type="text" placeholder="Full Name" onChange={(e) => setName(e.currentTarget.value)} />
              <Form.Text className="txt-form spacer-down"> * This will be visible to other people </Form.Text>

              {/* Date of Birth */}
              <Form.Control size="lg" type="text" placeholder="Birthdate" onChange={(e) => setDOB(e.currentTarget.value)}
                onFocus={(event) => onDateFocus(event)} onBlur={(event) => onDateBlur(event)} />
              
  
            </Form.Group>
          
            {/* Degree Major */}
            <Typeahead
              style={{ width: "80%" }}
              size="lg"
              clearButton
              id="basic-typeahead-example"
              labelKey="majors"
              multiple={true}
              onChange={setMajors}
              options={faculties}
              selected={majors}
              className="spacer-down"
              placeholder="Select your major(s)" />

            {/* Enrolled Classes */}
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
              placeholder="Select your classes this year" />
          
          </div>
        </div>

        {/* How many steps in setup indicator */}
        <div className="row spacer-up">
          <div className="col">
            <p className="txt-form txt-align-center"> Step 1 of 3 </p>
          </div>
        </div>

        {/* Continue to second step */}
        <div className="row">
          <div className="col d-flex justify-content-around">
            <Link to="/ps-2"> <Button className="btn-gradient btn-lg" onClick={postData}> Continue </Button> </Link>
          </div>
        </div>

      </div>
    </div>
  )

}

// const condition = authUser => !!authUser
// export default withAuthorization(condition)(Step1)
export default withAuthentication(Step1)