import React, { useState } from 'react'
import { ToggleButtonGroup, ToggleButton, Button, Modal} from 'react-bootstrap'


const TagsModal = () => {
    const [tagModalShow, setTagModalShow] = useState(false);
    const [value, setValue] = useState([])
    const handleChange = (val) => setValue(val)

    return (
        <div>
            <Button onClick={() => setTagModalShow(true)} className="btn-filters">Tags</Button>
            <Modal show={tagModalShow}
                onHide={() => setTagModalShow(false)}
                aria-labelledby="tag-modal-title">
                <Modal.Header>
                    <Modal.Title id="tag-modal-title">Filter By Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="col d-flex flex-column align-items-center" style={{ padding: 0 }}>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={0}> Photography </ToggleButton>
                                <ToggleButton className="btn-tags" value={1}> Family </ToggleButton>
                                <ToggleButton className="btn-tags" value={2}> Concerts </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={3}> Running </ToggleButton>
                                <ToggleButton className="btn-tags" value={4}> Gaming </ToggleButton>
                                <ToggleButton className="btn-tags" value={5}> Science </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={6}> Cinema </ToggleButton>
                                <ToggleButton className="btn-tags" value={7}> Dance </ToggleButton>
                                <ToggleButton className="btn-tags" value={8}> Music </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={9}> Study </ToggleButton>
                                <ToggleButton className="btn-tags" value={10}> Hiking </ToggleButton>
                                <ToggleButton className="btn-tags" value={11}> Beach </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={12}> Gambling </ToggleButton>
                                <ToggleButton className="btn-tags" value={13}> Partying </ToggleButton>
                                <ToggleButton className="btn-tags" value={14}> Trivia </ToggleButton>
                            </ToggleButtonGroup>
                        </div>
                        <div className="row">
                            <ToggleButtonGroup className="" type="checkbox" value={value} onChange={handleChange}>
                                <ToggleButton className="btn-tags" value={15}> Karaoke </ToggleButton>
                                <ToggleButton className="btn-tags" value={16}> Squash </ToggleButton>
                                <ToggleButton className="btn-tags" value={17}> Food </ToggleButton>
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
        </div>
    )
}

export default TagsModal;