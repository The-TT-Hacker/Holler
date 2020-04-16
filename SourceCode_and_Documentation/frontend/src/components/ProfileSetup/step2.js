import React, { Component } from 'react'

import FabricCanvas from './fabric_canvas'
import TemplateList from './template_list'
import { bglist, facelist, eyeslist, faciallist, hairlist } from './images/templates/templatelist'
import { Tabs, Tab } from 'react-bootstrap'
import { fabric } from 'fabric'

import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { withAuthorization } from '../Session'

class Step2 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      activeProperty: null
    }
  }

  addToCanvas = (imgElement, property_type, z_Index) => {

    var imgInstance = new fabric.Image(imgElement, {
      width: 400,
      height: 400,
      the_type: property_type,
      zIndex: z_Index
    })

    this.setState({ activeProperty: imgInstance })

  }

  render() {

    return (
      <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '100vh', maxWidth: '950px'}}>
        <div className="container-fluid">
          
          {/* Application Title & Page Description */}
          <div className="row">
            <div className="col">
              <div className="txt-title txt-align-center"> Holler <span className="dot"></span> </div>
              <h6 className="txt-subtitle txt-align-center"> Setup Your Avatar! </h6>
              <p className="txt-subtext txt-align-center"> Please fill the following details so we can get you up and running with Holler! </p>
            </div>
          </div>

          {/* Avatar Building Canvas */}
          <div className="row main">
            
            {/* Tabs Containing Avatar Features*/}
            <div className="col-lg-6" style={{ height: "40vh", overflowY: "scroll"}}>
              <Tabs defaultActiveKey={0}>
                <Tab eventKey={0} title="Faces">
                  <TemplateList data={facelist} property_type="face" zIndex={0} addtocanvas={this.addToCanvas} />
                </Tab>
                <Tab eventKey={1} title="Eyes">
                  <TemplateList data={eyeslist} property_type="eyes" zIndex={2} addtocanvas={this.addToCanvas} />
                </Tab>
                <Tab eventKey={2} title="Hair">
                  <TemplateList data={hairlist} property_type="hair" zIndex={2} addtocanvas={this.addToCanvas} />
                </Tab>
                <Tab eventKey={3} title="Beard">
                  <TemplateList data={faciallist} property_type="beard" zIndex={2} addtocanvas={this.addToCanvas} />
                </Tab>
                <Tab eventKey={4} title="Back">
                  <TemplateList data={bglist} property_type="bg" zIndex={-9999} addtocanvas={this.addToCanvas} />
                </Tab>
              </Tabs>
            </div>

            {/* Canvas To Display The Avatar */}
            <div className="col-lg-6">
              <FabricCanvas activeProperty={this.state.activeProperty} />
            </div>

          </div>

          {/* How many steps in setup indicator */}
          <div className="row">
            <div className="col">
              <p className="txt-form txt-align-center"> Step 2 of 3 </p>
            </div>
          </div>

          {/* Continue to third step */}
          <div className="row">
            <div className="col d-flex justify-content-around">
              <Link to="/ps-3"> <Button className="btn-gradient btn-lg"> Continue </Button> </Link>
            </div>
          </div>

        </div>
      </div>
    )

  }
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Step2)