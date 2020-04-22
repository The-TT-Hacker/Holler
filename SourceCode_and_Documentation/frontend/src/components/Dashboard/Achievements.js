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
              <Image src={props.image} className="txt-bold float-left" style={{ marginRight: 25 }} />
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
              <Image src={props.image} className="txt-bold float-left" style={{ marginRight: 25 }} />
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

  const [badgesList, setBadgesList] = useState([{}])
  const [userBadges, setUserBadges] = useState([{}])
  const [userBadgeID, setUserBadgeID] = useState({}) // Raw ID of badges, need to use it to separate badges

  // Sorts from the list of badges and the list of user badges ids
  // To get the badges a user has achieved
  const sortBadges = () => {


    for(var badgeID in userBadgeID){

      for (var i in badgesList){

        if (badgesList[i].id === badgeID) {
          setUserBadges(badgesList[i])
          setBadgesList(badgesList[i])
        }
      }

    }
    console.log(badgesList)
    console.log(userBadges)
  }

  useEffect(() => {
    const source = axios.CancelToken.source()
    const token = localStorage.getItem('token')
    const getFaculties = async () => {

      await axios({
        url: BACKEND + "/badges",
        method: "GET",
        cancelToken: source.token,
        headers: {
          'Authorization': `${token}`
        },
      })
        .then(function (response) {
          setBadgesList(response.data)
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {

          } else {
            console.log(error)
          }
        })
    }

    const getUserBadgesId = async () => {

      await axios({
        url: BACKEND + "/user",
        method: "GET",
        cancelToken: source.token,
        headers: {
          'Authorization': `${token}`
        },
      })
        .then(function (response) {
          setUserBadgeID(response.data.badges)
        })
        .catch(function (error) {
          if (axios.isCancel(error)) {

          } else {
            console.log(error)
          }
        })
    }

    getFaculties()
    getUserBadgesId()


    return () => {

      source.cancel()
    }
  }, [])

  sortBadges()

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>

        <div style={{ marginBottom: '5vh' }}></div>

        <PageTitle title="Achievements" />

        <div style={{ marginBottom: "4rem" }}> <PageTitle title="Overall performance" size="medium" /> </div>
        <Chart />

        <PageTitle title="Unlocked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Achievement image={Badge1} title="Welcome!" subtitle="Welcome to Holler!" locked={false} />
        </div>

        <PageTitle title="Locked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">

          {/* {

            badgesList.map((badge, index) =>
              <Achievement key={badge.id} image={badge.icon} title={badge.name} subtitle={badge.message} locked={true} />
            )
          } */}

        </div>


      </div>
    </div>
  )

}

export default Achievements