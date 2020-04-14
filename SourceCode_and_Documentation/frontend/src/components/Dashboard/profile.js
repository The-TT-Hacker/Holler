import React from 'react'

import { Card, Button } from 'react-bootstrap'

import { Avatar } from './subcomponents'
import { updateScrollability } from '../../constants';
import { Area, AreaChart, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import '../../styles/explore.css'

const Profile = (props) => {

  updateScrollability(props.scroll)

  const data = [{ name: 'Week 1', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 2', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 3', 'Groups Joined': 1, 'Total Badges': 5 },
  { name: 'Week 4', 'Groups Joined': 2, 'Total Badges': 12 }];

  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Avatar />
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

        <Card className="chart-card">
          <Card.Body style={{ width: '100%', height: '100%' }}>
            <div className="row flex-column justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>

              <ResponsiveContainer width={'99%'} height={300}>
                <AreaChart data={data}
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

                  <XAxis axisLine={false} tick={false} dataKey="name" />
                  <YAxis axisLine={false} tick={false} />

                  <Tooltip />
                  <Area type="monotone" dataKey="Groups Joined" stroke="#E3496B" fillOpacity={1} fill="url(#colorGroupsJoined)" />
                  <Area type="monotone" dataKey="Total Badges" stroke="#FEA31F" fillOpacity={1} fill="url(#colorTotalBadges)" />
                </AreaChart>
              </ResponsiveContainer>

              <br></br>
              <div className="graph-percentage">You’re in the top 10% of Holler users!</div>
            </div>
          </Card.Body>
        </Card>

        <Card className="profile-card">
          <Card.Header>
              <span className="txt-bold txt-md"> Personal Information </span>
            </Card.Header>
            <Card.Body>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Name </div>
                <div className="float-right txt-poppins"> Bob Cheers </div>
              </div>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Birthday </div>
                <div className="float-right txt-poppins"> 12/04/1995 </div>
              </div>
              <div className="clearfix">
                <div className="float-left txt-poppins"> Email </div>
                <div className="float-right txt-poppins"> b.cheers@student.unsw.edu.au </div>
              </div>
              <div className="clearfix">
                <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
              </div>
            </Card.Body>
        </Card>

        <Card className="profile-card">
          <Card.Header>
            <span className="txt-bold txt-md"> University Information </span>
          </Card.Header>
          <Card.Body>
            <div className="clearfix">
              <div className="float-left txt-poppins"> University </div>
              <div className="float-right txt-poppins"> UNSW Sydney </div>
            </div>
            <div className="clearfix">
              <div className="float-left txt-poppins"> School </div>
              <div className="float-right txt-poppins"> Engineering/Arts </div>
            </div>
            <div className="clearfix">
              <span type="button" className="txt-gradient txt-bold float-right"> Edit </span>
            </div>
          </Card.Body>
        </Card>

        <Card className="profile-card">
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