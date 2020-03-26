import React, { useState } from 'react'

import Step1 from './step1'
import Step2 from './step2'
import Step3 from './step3'
import Step4 from './step4'

import { Link } from 'react-router-dom'
import { Nav, Button } from 'react-bootstrap'

const ProfileSetup = () => {
  const componentList = [<Step1 />, <Step2 />, <Step3 />, <Step4 />]
  const [step, setStep] = useState(4)

  const goBack = () => { if (step !== 1) setStep(step - 1) }
  const goForward = () => { if (step !== 4) setStep(step + 1) }
  const SetupComponent = () => { return componentList[parseInt(step) - 1] }

  const BackButton = () => {
    if (step === 1) {
      return null
    } else {
      return <Button className="btn-secondary btn-lg" onClick={() => goBack()}> ← Go Back </Button>
    }
  }

  const ForwardButton = () => {
    if (step === 4) {
      return <Link to="/dashboard"> <Button className="btn-gradient btn-lg"> Finish </Button> </Link>
    } else {
      return <Button className="btn-gradient btn-lg" onClick={() => goForward()}> Continue </Button>
    }
  }


  return (
    <div className="container-fluid h-100">
      <div className="row mx-auto align-items-center h-100">
        <div className="col d-flex flex-column align-items-center">
          <Nav.Link href="/"> <div className="txt-title"> Holler <span className="dot"></span> </div> </Nav.Link>

          <SetupComponent />
          <div className="txt-subtext"> Step {step} of 4 </div>

          <div class="d-flex" style={{ width: "600px" }}>
            <div class="mr-auto p-2"> <BackButton /> </div>
            <div class="p-2"> <ForwardButton /> </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ProfileSetup