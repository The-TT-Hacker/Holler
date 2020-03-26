import React, { Component } from 'react'
import FabricCanvas from './fabric_canvas'
import TemplateList from './template_list'
import { bglist, facelist, eyeslist, faciallist, hairlist } from './images/templates/templatelist'
import { Tabs, Tab } from 'react-bootstrap'
import { fabric } from 'fabric'

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
      <div className="container-fluid" style={{ maxHeight: "100vh" }}>
        <div className="row mx-auto align-items-center h-100" style={{ maxWidth: "960px" }}>
          <div className="col d-flex flex-column align-items-center">
            <h6 className="txt-subtitle"> Customise Your Avatar! </h6>
            <p className="txt-subtext"> Craft an icon that shows us your personality! </p>

              <div className="main row" style={{ height: "50vh" }}>
                <div className="col-6 h-100" style={{ overflowY: 'scroll', overflowX: 'hidden' }}>
                  <Tabs defaultActiveKey={0} id="uncontrolled-tab-example" >

                    <Tab eventKey={0} title="Faces">
                      
                      <TemplateList
                        data={facelist}
                        property_type="face"
                        zIndex={0}
                        addtocanvas={this.addToCanvas}
                      />

                    </Tab>

                    <Tab eventKey={1} title="Eyes">

                      <TemplateList
                        data={eyeslist}
                        property_type="eyes"
                        zIndex={2}
                        addtocanvas={this.addToCanvas}
                      />

                    </Tab>

                    <Tab eventKey={2} title="Beard">

                      <TemplateList
                        data={faciallist}
                        property_type="beard"
                        zIndex={2}
                        addtocanvas={this.addToCanvas}
                      />

                    </Tab>

                    <Tab eventKey={3} title="Hair">

                      <TemplateList
                        data={hairlist}
                        property_type="hair"
                        zIndex={2}
                        addtocanvas={this.addToCanvas}
                      />

                    </Tab>

                    <Tab eventKey={4} title="Background">


                      <TemplateList
                        data={bglist}
                        property_type="bg"
                        zIndex={-9999}
                        addtocanvas={this.addToCanvas}
                      />

                    </Tab>
                 
                  </Tabs>
                </div>

                <div className="col-6 d-flex justify-content-center align-items-center h-100">
                  <FabricCanvas
                    activeProperty={this.state.activeProperty}
                  />
                </div>
              </div>
              
          </div>
        </div>
      </div>
    )

  }
}

export default Step2