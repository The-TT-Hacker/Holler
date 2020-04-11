import React from 'react'

import { Image, Card, Button } from 'react-bootstrap'
import User from '../../icons/user.svg'
import { Area, AreaChart, Legend, XAxis, YAxis, Tooltip } from 'recharts';
import '../../styles/explore.css'

const Profile = () => {
  const data = [{ name: 'Week 1', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 2', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 3', 'Groups Joined': 1, 'Total Badges': 5 },
  { name: 'Week 4', 'Groups Joined': 2, 'Total Badges': 12 }];

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="circle"> <Image src={User} /> </div>
        <br />
        <div className="txt-subtitle"> John Citizen </div>
      </div>
      <hr style={{ width: '75vw' }} />

      <div className="d-flex flex-column justify-content-center align-items-center">

        <div className="row txt-align-center">
          <div className="col-6">
            <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 12 </p>
            <p className="txt-font txt-normal"> Groups </p>
          </div>
          <div className="col-6">
            <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 6 </p>
            <p className="txt-font"> Badges </p>
          </div>
        </div>

        <Card style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Body>
            <div className="row flex-column justify-content-center align-items-center">
              <AreaChart width={900} height={400} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorGroupsJoined" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E3496B" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#E3496B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTotalBadges" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FEA31F" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FEA31F" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Legend />
                <XAxis axisLine={false} dataKey="name" />
                <YAxis axisLine={false}/>
                <Tooltip />
                <Area type="monotone" dataKey="Groups Joined" stroke="#E3496B" fillOpacity={1} fill="url(#colorGroupsJoined)" />
                <Area type="monotone" dataKey="Total Badges" stroke="#FEA31F" fillOpacity={1} fill="url(#colorTotalBadges)" />
              </AreaChart>
              <br></br>
              <div className="graph-percentage">You’re in the top 10% of Holler users!</div>
            </div>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> Personal Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Name </Card.Title>
              <Card.Text className="float-right"> Bob Cheers </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Birthday </Card.Title>
              <Card.Text className="float-right"> 12/04/1995 </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> Email </Card.Title>
              <Card.Text className="float-right"> b.cheers@student.unsw.edu.au </Card.Text>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> University Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> University </Card.Title>
              <Card.Text className="float-right"> UNSW Sydney </Card.Text>
            </div>
            <div className="clearfix">
              <Card.Title className="txt-bold float-left"> School </Card.Title>
              <Card.Text className="float-right"> Engineering/Arts </Card.Text>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card bg="light" text="dark" style={{ width: '80vw', marginBottom: '5vh' }}>
          <Card.Header>
            <span className="txt-bold txt-md"> Your Interests </span>
          </Card.Header>
          <Card.Body>
            Some body placeholder text since this segment has not been fully implemented yet.
          </Card.Body>
        </Card>

        <Button className="btn-gradient"> Delete Account </Button>
        <p className="txt-subtext txt-align-center"> You cannot recover your account once deleted, proceed with caution. </p>

      </div>

    </div>
  )
}

export default Profile