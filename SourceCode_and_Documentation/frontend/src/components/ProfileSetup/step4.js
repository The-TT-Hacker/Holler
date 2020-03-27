import React, { useState } from 'react'

import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap'

const Step4 = () => {
  const [value, setValue] = useState([])
  const handleChange = (val) => setValue(val)

  return (
    <div className="container-fluid" style={{ maxHeight: "65vh" }}>
      <div className="row mx-auto align-items-center h-100">
        <div className="col d-flex flex-column align-items-center">
          <h6 className="txt-subtitle"> Your Interests </h6>
          <p className="txt-subtext"> Select a minimum of 3 interests so that we're able to match you with like-minded people! </p>
          <br />

          <div className="container-fluid">
            <div className="row">
              <div className="col-6 d-flex flex-column align-items-end" style={{margin: 0, padding: 0}}>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={0}> Photography </ToggleButton>
                    <ToggleButton className="btn-interests" value={1}> Family </ToggleButton>
                    <ToggleButton className="btn-interests" value={2}> Concerts </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={3}> Running </ToggleButton>
                    <ToggleButton className="btn-interests" value={4}> Gaming </ToggleButton>
                    <ToggleButton className="btn-interests" value={5}> Science </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={6}> Cinema </ToggleButton>
                    <ToggleButton className="btn-interests" value={7}> Dance </ToggleButton>
                    <ToggleButton className="btn-interests" value={8}> Music </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
              <div className="col-6 d-flex flex-column align-items-start" style={{margin: 0, padding: 0, paddingLeft: "15px"}}>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={9}> Study </ToggleButton>
                    <ToggleButton className="btn-interests" value={10}> Hiking </ToggleButton>
                    <ToggleButton className="btn-interests" value={11}> Beach </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={12}> Gambling </ToggleButton>
                    <ToggleButton className="btn-interests" value={13}> Partying </ToggleButton>
                    <ToggleButton className="btn-interests" value={14}> Trivia </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <div className="row">
                  <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                    <ToggleButton className="btn-interests" value={15}> Karaoke </ToggleButton>
                    <ToggleButton className="btn-interests" value={16}> Squash </ToggleButton>
                    <ToggleButton className="btn-interests" value={17}> Food </ToggleButton>
                  </ToggleButtonGroup>
                </div>
              </div>
            </div>
          </div>

          <br />
        </div>
      </div>
    </div >
  )

}

export default Step4