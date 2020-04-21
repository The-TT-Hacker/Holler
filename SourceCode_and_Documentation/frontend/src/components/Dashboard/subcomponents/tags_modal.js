import React, { useState } from 'react'
import { Button, Modal, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'


const TagsModal = (props) => {

  const [tagModalShow, setTagModalShow] = useState(false);

  const handleChange = (val) => {
    props.setActiveTags(val)
  }

  const hideModal = () => {
    setTagModalShow(false)
    props.triggerFilter()
  }

  return (
    <div>
      <Modal
        show={tagModalShow}
        onHide={hideModal}
        scrollable={true}
        aria-labelledby="tag-modal-title">

        <Modal.Header>
          <Modal.Title id="tag-modal-title"> Filter By Tags </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="container-fluid" style={{ width: '100%' }}>

            <div className="btn-interests-responsive-group">
              <ToggleButtonGroup className="flex-wrap" type="checkbox" value={props.activeTags} onChange={handleChange}>
                <ToggleButton className="btn-interests" value={"Film"}> Film </ToggleButton>
                <ToggleButton className="btn-interests" value={"Games"}> Games </ToggleButton>
                <ToggleButton className="btn-interests" value={"Art"}> Art </ToggleButton>
                <ToggleButton className="btn-interests" value={"Networking"}> Networking </ToggleButton>
                <ToggleButton className="btn-interests" value={"Other"}> Other </ToggleButton>
                <ToggleButton className="btn-interests" value={"Party"}> Party </ToggleButton>
                <ToggleButton className="btn-interests" value={"Comedy"}> Comedy </ToggleButton>
                <ToggleButton className="btn-interests" value={"Food"}> Food </ToggleButton>
                <ToggleButton className="btn-interests" value={"Music"}> Music </ToggleButton>
                <ToggleButton className="btn-interests" value={"Literature"}> Literature </ToggleButton>
                <ToggleButton className="btn-interests" value={"Shopping"}> Shopping </ToggleButton>
                <ToggleButton className="btn-interests" value={"Fitness"}> Fitness </ToggleButton>
                <ToggleButton className="btn-interests" value={"Causes"}> Causes </ToggleButton>
                <ToggleButton className="btn-interests" value={"Sports"}> Sports </ToggleButton>
                <ToggleButton className="btn-interests" value={"Dance"}> Dance </ToggleButton>
              </ToggleButtonGroup>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button className="btn-modal-done btn-lg" variant="primary" onClick={() => hideModal()}>
            Done
          </Button>
        </Modal.Footer>

      </Modal>
      <Button onClick={() => setTagModalShow(true)} className="btn-interests active no-margin spacer-right"> Tags </Button>
    </div >
  )
}

export default TagsModal;