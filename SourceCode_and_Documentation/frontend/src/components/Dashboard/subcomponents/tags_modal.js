import React, { useState } from 'react'
import { Button, Modal} from 'react-bootstrap'


const TagsModal = () => {
    const [tagModalShow, setTagModalShow] = useState(false);

    return (
        <div>
            <Modal show={tagModalShow}
                onHide={() => setTagModalShow(false)}
                aria-labelledby="tag-modal-title">
                <Modal.Header>
                    <Modal.Title id="tag-modal-title">Filter By Tags</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid" style={{ width: '100%' }}>
                        <div className="d-flex align-items-center justify-content-center" style={{ width: '100%' }}>
                            <div className="row">
                                <div className="col-sm-4">
                                    <Button className="btn-interests"> A </Button>
                                    <Button className="btn-interests"> B </Button>
                                    <Button className="btn-interests"> C </Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button className="btn-interests"> A </Button>
                                    <Button className="btn-interests"> B </Button>
                                    <Button className="btn-interests"> C </Button>
                                </div>
                                <div className="col-sm-4">
                                    <Button className="btn-interests"> A </Button>
                                    <Button className="btn-interests"> B </Button>
                                    <Button className="btn-interests"> C </Button>
                                </div>
                            </div>
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
        </div>
    )
}

export default TagsModal;