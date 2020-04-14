import React, { useState } from 'react'

import axios from 'axios'
import { Link  } from 'react-router-dom'
import { URL } from '../../constants/roles'
import { withAuthorization } from '../Session'
import { Form, Button } from 'react-bootstrap'


const onDateFocus = (e) => { e.currentTarget.type = "date" }
const onDateBlur = (e) => { if (e.currentTarget.value === "") e.currentTarget.type = "text" }

const Step1 = () => {

  const [majors, setMajors] = useState("")
  const getSchools = () => {

    const token = localStorage.getItem('token')
    axios.get(URL + '/faculties/unsw', {
      headers: {
        'Authorization': `${token}`
      }
    })
    .then(function (response) {
      setMajors(response.data)
    })
    .catch(function (error) {
      console.log(error)
    })
  
  }
  getSchools()

  const [name, setName] = useState("")
  const [dob, setDOB] = useState("")
  const [myMajor, setMyMajor] = useState("")

  const sendUserInfo = () => {
    console.log(name)
    console.log(dob)
    console.log(myMajor)
    console.log(majors)
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
              <Form.Control size="lg" type="text" placeholder="Birthdate" className="spacer-down" onChange={(e) => setDOB(e.currentTarget.value)}
                onFocus={(event) => onDateFocus(event)} onBlur={(event) => onDateBlur(event)} />
              
              {/* Degree Major */}
              <Form.Control size="lg" type="text" placeholder="Major" onChange={(e) => setMyMajor(e.currentTarget.value)} />
            
            </Form.Group>
          
          </div>
        </div>

        {/* How many steps in setup indicator */}
        <div className="row">
          <div className="col">
            <p className="txt-form txt-align-center"> Step 1 of 3 </p>
          </div>
        </div>

        {/* Continue to second step */}
        <div className="row">
          <div className="col d-flex justify-content-around">
            <Link to="/ps-2"> <Button className="btn-gradient btn-lg" onClick={sendUserInfo}> Continue </Button> </Link>
          </div>
        </div>

      </div>
    </div>
  )

}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Step1)