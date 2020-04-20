import React, { useState } from 'react'

import axios from 'axios'
import { Link  } from 'react-router-dom'
import { BACKEND } from '../../constants/roles'
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap'
import { withAuthorization } from '../Session'

const Step4 = () => {

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  const postData = async () => {

    const token = localStorage.getItem('token')

    await axios({
      url: BACKEND + '/user',
      method: "PUT",
      headers: { 'Authorization': `${token}` },
      data: {
        interests: value
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))

  }

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh', maxWidth: '900px' }}>
      <div className="container-fluid">
        
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="txt-title"> Holler <span className="dot"></span> </div>
          </div>
        </div>

        <div className="col d-flex flex-column align-items-center">
          <h6 className="txt-subtitle txt-align-center"> Your Interests </h6>
          <p className="txt-subtext txt-align-center"> Select a minimum of 3 interests so that we're able to match you with like-minded people! </p>

          <div className="btn-interests-responsive-group">
            <ToggleButtonGroup className="flex-wrap" type="checkbox" value={value} onChange={handleChange}>
              <ToggleButton className="btn-interests" value={"Photography"}> Photography </ToggleButton>
              <ToggleButton className="btn-interests" value={"Family"}> Family </ToggleButton>
              <ToggleButton className="btn-interests" value={"Concerts"}> Concerts </ToggleButton>
              <ToggleButton className="btn-interests" value={"Running"}> Running </ToggleButton>
              <ToggleButton className="btn-interests" value={"Gaming"}> Gaming </ToggleButton>
              <ToggleButton className="btn-interests" value={"Science"}> Science </ToggleButton>
              <ToggleButton className="btn-interests" value={"Cinema"}> Cinema </ToggleButton>
              <ToggleButton className="btn-interests" value={"Dance"}> Dance </ToggleButton>
              <ToggleButton className="btn-interests" value={"Music"}> Music </ToggleButton>
              <ToggleButton className="btn-interests" value={"Study"}> Study </ToggleButton>
              <ToggleButton className="btn-interests" value={"Hiking"}> Hiking </ToggleButton>
              <ToggleButton className="btn-interests" value={"Beach"}> Beach </ToggleButton>
              <ToggleButton className="btn-interests" value={"Gambling"}> Gambling </ToggleButton>
              <ToggleButton className="btn-interests" value={"Partying"}> Partying </ToggleButton>
              <ToggleButton className="btn-interests" value={"Trivia"}> Trivia </ToggleButton>
              <ToggleButton className="btn-interests" value={"Karaoke"}> Karaoke </ToggleButton>
              <ToggleButton className="btn-interests" value={"Squash"}> Squash </ToggleButton>
              <ToggleButton className="btn-interests" value={"Food"}> Food </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="row spacer-up">
          <div className="col d-flex justify-content-around">
            <Link to="/ps-2"> <Button className="btn-secondary btn-lg"> ← Go Back </Button> </Link>
            <Link to="/dashboard/explore"> <Button className="btn-gradient btn-lg" onClick={postData}> Finish </Button> </Link>
          </div>
        </div>

      </div>
    </div>
  )

}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Step4)