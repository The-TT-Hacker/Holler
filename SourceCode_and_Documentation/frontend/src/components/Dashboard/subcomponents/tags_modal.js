import React, { useState } from 'react'
import { Button, Modal, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'


const TagsModal = () => {
    const [tagModalShow, setTagModalShow] = useState(false);

    const [value, setValue] = useState([])
    const handleChange = (val) => {setValue(val); console.log(value)}
  
    const hideModal = () => {
        setTagModalShow(false)
    }


    return (
        <div>
            <Modal scrollable={true} show={tagModalShow}
                onHide={hideModal}
                aria-labelledby="tag-modal-title">
                <Modal.Header>
                    <Modal.Title id="tag-modal-title">Filter By Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid" style={{ width: '100%' }}>

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



                </Modal.Body>
            <Modal.Footer>
                <Button className="btn-modal-done btn-lg" variant="primary" onClick={() => setTagModalShow(false)}>
                    Done
                    </Button>

            </Modal.Footer>
            </Modal>
        <Button onClick={() => setTagModalShow(true)} className="btn-interests active no-margin spacer-right"> Tags </Button>
        </div >
    )
}

export default TagsModal;