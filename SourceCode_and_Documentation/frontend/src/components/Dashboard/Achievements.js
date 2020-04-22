import React, { useState, useEffect } from 'react'
import axios from 'axios'

import LockGradient from '../../icons/lock-gradient.svg'
import Badge1 from '../../icons/Badges/Badge-1.svg'
import Badge2 from '../../icons/Badges/Badge-2.svg'


import { Card, Image } from 'react-bootstrap'
import { PageTitle, Chart } from './subcomponents'
import { BACKEND } from '../../constants/roles'

const Achievement = (props) => {
  if (!props.locked) {
    return (
      <div className="row">
        <Card className="responsive-card">
          <Card.Body>
            <div className="clearfix">
              { console.log(props.image) }
              <img src={props.image} className="txt-bold float-left" style={{ marginRight: 25, width: "64px", height: "64px" }} />
              <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> {props.title} </Card.Title>
              <Card.Subtitle className="mb-2 text-muted"> {props.subtitle} </Card.Subtitle>
            </div>
          </Card.Body>
        </Card>
      </div>
    )
  } else {
    return (
      <div className="row">
        <Card className="responsive-card">
          <Card.Body>
            <div className="clearfix">
              <img src={props.image} className="txt-bold float-left" style={{ marginRight: 25, width: "64px", height: "64px"  }} />
              <Card.Title className=" txt-bold" style={{ margin: 20, fontWeight: 'bold' }}> {props.title} </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{props.subtitle}</Card.Subtitle>
            </div>
            <div className="card-img-overlay locked d-flex justify-content-center align-items-end"></div>
            <div className="card-img-overlay d-flex justify-content-center align-items-center"> <img src={LockGradient} style={{ width: '48px', height: '48px' }} alt="lock" /> </div>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

const Achievements = () => {
  
  const [allBadgesList, setAllBadgesList] = useState([])
  const [usersBadges, setUsersBadges] = useState([])
  var unlockedBadges = []
  var lockedBadges = []

  for (var i = 0; i < allBadgesList.length; i++) {
    if (usersBadges[allBadgesList[i].id]) 
      unlockedBadges.push(allBadgesList[i])
    else
      lockedBadges.push(allBadgesList[i])
  }

  useEffect(() => {

    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')

    const getAllBadgesList = async () => {
      await axios({
        url: BACKEND + "/badges",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` }
      })
      .then(response => {
        setAllBadgesList(response.data)
      })
      .catch(error => {
        if (axios.isCancel(error))
          console.log("Cancelled")
        else
          console.log("Error: ", error)
      })
    }

    const getUsersBadges = async () => {

      await axios({
        url: BACKEND + "/user",
        method: "GET",
        cancelToken: source.token,
        headers: { 'Authorization': `${token}` }
      })
      .then(response => {
        setUsersBadges(response.data.badges)
      })
      .catch(error => {
        if (axios.isCancel(error))
        console.log("Cancelled")
      else
        console.log("Error: ", error)
      })
    }

    getAllBadgesList()
    getUsersBadges()

    return () => {
      source.cancel()
    }

  }, [])

  return (

    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>

        <div style={{ marginBottom: '5vh' }}></div>

        <PageTitle title="Achievements" />

        <div style={{ marginBottom: "4rem" }}> <PageTitle title="Overall performance" size="medium" /> </div>
        <Chart />

        <PageTitle title="Unlocked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">

          {
            unlockedBadges.map((badge) =>
              <Achievement key={badge.id} image={"data:image/svg+xml;base64," + badge.icon} title={badge.name} subtitle={badge.message} locked={false} />
            )
          }

        </div>

        <PageTitle title="Locked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">

          {
            lockedBadges.map((badge) =>
              <Achievement key={badge.id} image={"data:image/svg+xml;base64," + badge.icon} title={badge.name} subtitle={badge.message} locked={true} />
            )
          }

        </div>


      </div>
    </div>
  )

}

export default Achievements