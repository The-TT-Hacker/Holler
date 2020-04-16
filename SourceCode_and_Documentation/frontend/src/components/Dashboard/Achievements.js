import React from 'react'

import LockGradient from '../../icons/lock-gradient.svg'
import Badge1 from '../../icons/Badges/Badge-1.svg'
import Badge2 from '../../icons/Badges/Badge-2.svg'
import Badge3 from '../../icons/Badges/Badge-3.svg'
import Badge4 from '../../icons/Badges/Badge-4.svg'
import Badge5 from '../../icons/Badges/Badge-5.svg'
import Badge6 from '../../icons/Badges/Badge-6.svg'

import { Card, Image } from 'react-bootstrap'
import { PageTitle, Chart } from './subcomponents'

const Achievements = () => {
  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>

        <div style={{marginBottom: '5vh'}}></div>

        <PageTitle title="Achievements" />

        <div style={{marginBottom: "4rem"}}> <PageTitle title="Overall performance" size="medium" /> </div>
        <Chart />

        <PageTitle title="Unlocked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="row">
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge1} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> Welcome! </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Welcome to Holler!</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge2} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> First Spark </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You matched with your first group!</Card.Subtitle>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>

        <PageTitle title="Locked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">
          <div className="row">
            <div className="col">
            
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge3} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> Top Ten </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You made to top 10% of Holler users!</Card.Subtitle>
                </div>
                <div class="card-img-overlay locked d-flex justify-content-center align-items-end"></div>
                <div className="card-img-overlay d-flex justify-content-center align-items-center"> <img src={LockGradient} style={{width: '48px', height: '48px'}} alt="lock" /> </div>
              </Card.Body>
            </Card>
           
            </div>
          </div>
          <div className="row">
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge4} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> Eventful Day </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You went to your first event!</Card.Subtitle>
                </div>
                <div className="card-img-overlay locked d-flex justify-content-center align-items-end"></div>
                <div className="card-img-overlay d-flex justify-content-center align-items-center"> <img src={LockGradient} style={{width: '48px', height: '48px'}} alt="lock"  /> </div>
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge5} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> Social Buzz </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You made your first conversation!</Card.Subtitle>
                </div>
                <div class="card-img-overlay locked d-flex justify-content-center align-items-end"></div>
                <div className="card-img-overlay d-flex justify-content-center align-items-center"> <img src={LockGradient} style={{width: '48px', height: '48px'}} alt="lock" /> </div>
              </Card.Body>
            </Card>
          </div>
          <div className="row">
            <Card className="responsive-card">
              <Card.Body>
                <div className="clearfix">
                  <Image src={Badge6} className="txt-bold float-left" style={{ marginRight: 25 }} />
                  <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> Looking Good </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">You added your first avatar!</Card.Subtitle>
                </div>
                <div class="card-img-overlay locked d-flex justify-content-center align-items-end"></div>
                <div className="card-img-overlay d-flex justify-content-center align-items-center"> <img src={LockGradient} style={{width: '48px', height: '48px'}} alt="lock" /> </div>
              </Card.Body>
            </Card>
          </div>
        </div>


      </div>
    </div>
  )

}

export default Achievements