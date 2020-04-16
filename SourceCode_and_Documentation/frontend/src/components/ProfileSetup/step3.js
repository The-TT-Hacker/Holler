import React, { useState } from 'react'

import { axios } from 'axios'
import { Link  } from 'react-router-dom'
import { URL } from '../../constants/roles'
import { ToggleButtonGroup, ToggleButton, Button } from 'react-bootstrap'
import { withAuthorization } from '../Session'

const Step4 = () => {

  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  const sendUserInfo = () => {
    axios({
      url: URL + '/user',
      method: 'put',
      data: {

      }
    })
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
              <ToggleButton className="btn-interests" value={0}> Photography </ToggleButton>
              <ToggleButton className="btn-interests" value={1}> Family </ToggleButton>
              <ToggleButton className="btn-interests" value={2}> Concerts </ToggleButton>
              <ToggleButton className="btn-interests" value={3}> Running </ToggleButton>
              <ToggleButton className="btn-interests" value={4}> Gaming </ToggleButton>
              <ToggleButton className="btn-interests" value={5}> Science </ToggleButton>
              <ToggleButton className="btn-interests" value={6}> Cinema </ToggleButton>
              <ToggleButton className="btn-interests" value={7}> Dance </ToggleButton>
              <ToggleButton className="btn-interests" value={8}> Music </ToggleButton>
              <ToggleButton className="btn-interests" value={9}> Study </ToggleButton>
              <ToggleButton className="btn-interests" value={10}> Hiking </ToggleButton>
              <ToggleButton className="btn-interests" value={11}> Beach </ToggleButton>
              <ToggleButton className="btn-interests" value={12}> Gambling </ToggleButton>
              <ToggleButton className="btn-interests" value={13}> Partying </ToggleButton>
              <ToggleButton className="btn-interests" value={14}> Trivia </ToggleButton>
              <ToggleButton className="btn-interests" value={15}> Karaoke </ToggleButton>
              <ToggleButton className="btn-interests" value={16}> Squash </ToggleButton>
              <ToggleButton className="btn-interests" value={17}> Food </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        <div className="row spacer-up">
          <div className="col d-flex justify-content-around">
            <Link to="/ps-2"> <Button className="btn-secondary btn-lg"> ← Go Back </Button> </Link>
            <Link to="/dashboard/explore"> <Button className="btn-gradient btn-lg" onClick={sendUserInfo}> Finish </Button> </Link>
          </div>
        </div>

      </div>
    </div>
  )

}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Step4)