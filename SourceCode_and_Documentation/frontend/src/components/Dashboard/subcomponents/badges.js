import React, {useState} from 'react'

import { Image, Card, Button, Modal } from 'react-bootstrap'
import Back from '../../../icons/Back-Button.svg'
import '../../../styles/explore.css'

import Badge1 from '../../../icons/Badges/Badge-1.svg'
import Badge2 from '../../../icons/Badges/Badge-2.svg'
import Badge3 from '../../../icons/Badges/Badge-3.svg'
import Badge4 from '../../../icons/Badges/Badge-4.svg'
import Badge5 from '../../../icons/Badges/Badge-5.svg'
import Badge6 from '../../../icons/Badges/Badge-6.svg'

const Badges = () => { 

    const [badgeModalShow, setBadgeModalShow] = useState(false);

    return (
        <div className="row txt-align-center spacer-up">
          <div className="col d-flex justify-content-center">
            <div className="clearfix">
              <div className="float-left spacer-right">
                <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 12 </p>
                <p className="txt-font txt-normal"> Groups </p>
              </div>
              <div className="float-left">
                <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 6 </p>
                <p className="txt-font txt-align-center"> <Button variant="link" style={{padding:0}} onClick={() => setBadgeModalShow(true)}>Badges </Button></p>
                <Modal show={badgeModalShow}
                  onHide={() => setBadgeModalShow(false)}
                  aria-labelledby="tag-modal-title">
                  <Modal.Header>
                  <Button variant="link" onClick={() => setBadgeModalShow(false)} style={{backgroundColor:'transparent', marginTop:15}}>
                    <Image src={Back}/>
                  </Button>
                    <Modal.Title id="tag-modal-title" style={{textAlign:'left', marginRight:255}}>Badges</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>

                    <div className="col d-flex flex-column align-items-center" style={{ padding: 0 }}>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge1} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> Welcome! </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Welcome to Holler!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge2} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> First Spark </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">You matched with your first group!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge3} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> Top Ten </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">You made to top 10% of Holler users!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge4} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> Eventful Day </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">You went to your first event!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge5} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> Social Buzz </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">You made your first conversation!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>
                      <div className="row">
                        <Card style={{ width: '30vw', marginBottom: '5vh' }}>
                          <Card.Body>
                            <div className="clearfix">
                              <Image src={Badge6} className="txt-bold float-left" style={{marginRight:25}}/>
                                <Card.Title className=" txt-bold" style={{margin:20, fontWeight:'bold'}}> Looking Good </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">You added your first avatar!</Card.Subtitle>
                            </div>
                          </Card.Body>
                        </Card>
                      </div>

                    </div>

                  </Modal.Body>

                </Modal>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Badges;