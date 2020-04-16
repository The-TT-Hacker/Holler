import React, {useState} from 'react'

import { Image, Card, Button, Modal } from 'react-bootstrap'

import { PageTitle, Avatar } from './subcomponents'
import { updateScrollability } from '../../constants';
import Back from '../../icons/Back-Button.svg'
import { Area, AreaChart, Legend, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import '../../styles/explore.css'

import Badge1 from '../../icons/Badges/Badge-1.svg'
import Badge2 from '../../icons/Badges/Badge-2.svg'
import Badge3 from '../../icons/Badges/Badge-3.svg'
import Badge4 from '../../icons/Badges/Badge-4.svg'
import Badge5 from '../../icons/Badges/Badge-5.svg'
import Badge6 from '../../icons/Badges/Badge-6.svg'

const Profile = (props) => {

  updateScrollability(true)

  const data = [{ name: 'Week 1', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 2', 'Groups Joined': 3, 'Total Badges': 2 },
  { name: 'Week 3', 'Groups Joined': 1, 'Total Badges': 5 },
  { name: 'Week 4', 'Groups Joined': 2, 'Total Badges': 12 }];

  const [badgeModalShow, setBadgeModalShow] = useState(false);

  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="main-content">

        <PageTitle title="Your Profile" />

        {/* Avatar Image */}
        <div className="row spacer-up">
          <div className="col d-flex justify-content-center">
            <Avatar />
          </div>
        </div>

        {/* Name */}
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="txt-subtitle"> John Citizen </div>
          </div>
        </div>

        {/* Groups & Badges */}
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

        {/* Chart */}
        <div className="row">
          <div className="col">

            <Card className="chart-card">
              <Card.Body style={{ width: '100%', height: '100%' }}>
                <ResponsiveContainer width={'99%'} height={300}>
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

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

                <div className="graph-percentage txt-align-center spacer-up">You’re in the top 10% of Holler users!</div>
              </Card.Body>
            </Card>

          </div>
        </div>

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

        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <Button className="btn-gradient spacer-down"> Delete Account </Button>
            <p className="txt-subtext txt-align-center"> You cannot recover your account once deleted, proceed with caution. </p>
          </div>
        </div>

      </div>
    </div>

    // <div className="container-fluid d-flex flex-column align-items-center" style={{ height: "86.5%", overflowY: 'scroll' }}>
    //   <div className="main-content">

    // {/* Avatar Image */}
    // <div className="row spacer-up">
    //   <div className="col d-flex justify-content-center">
    //     <Avatar />
    //   </div>
    // </div>

    // {/* Name */}
    // <div className="row">
    //   <div className="col d-flex justify-content-center">
    //     <div className="txt-subtitle"> John Citizen </div>
    //   </div>
    // </div>

    // {/* Groups & Badges */}
    // <div className="row txt-align-center spacer-up">
    //   <div className="col d-flex justify-content-center">
    //     <div className="clearfix">
    //       <div className="float-left spacer-right">
    //         <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 12 </p>
    //         <p className="txt-font txt-normal"> Groups </p>
    //       </div>
    //       <div className="float-left">
    //         <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 6 </p>
    //         <p className="txt-font"> Badges </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // {/* Chart */}
    // <div className="row">
    //   <div className="col">

    //     <Card className="chart-card">
    //       <Card.Body style={{ width: '100%', height: '100%' }}>
    //            <ResponsiveContainer width={'99%'} height={300}>
    //             <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>

    //               <defs>
    //                 <linearGradient id="colorGroupsJoined" x1="0" y1="0" x2="0" y2="1">
    //                   <stop offset="5%" stopColor="#E3496B" stopOpacity={0.8} />
    //                   <stop offset="95%" stopColor="#E3496B" stopOpacity={0} />
    //                 </linearGradient>
    //                 <linearGradient id="colorTotalBadges" x1="0" y1="0" x2="0" y2="1">
    //                   <stop offset="5%" stopColor="#FEA31F" stopOpacity={0.8} />
    //                   <stop offset="95%" stopColor="#FEA31F" stopOpacity={0} />
    //                 </linearGradient>
    //               </defs>

    //               <Legend />

    //               <XAxis axisLine={false} tick={false} dataKey="name" />
    //               <YAxis axisLine={false} tick={false} />

    //               <Tooltip />
    //               <Area type="monotone" dataKey="Groups Joined" stroke="#E3496B" fillOpacity={1} fill="url(#colorGroupsJoined)"/>
    //               <Area type="monotone" dataKey="Total Badges" stroke="#FEA31F" fillOpacity={1} fill="url(#colorTotalBadges)" />
    //             </AreaChart>
    //           </ResponsiveContainer>

    //           <div className="graph-percentage txt-align-center spacer-up">You’re in the top 10% of Holler users!</div>
    //       </Card.Body>
    //     </Card>

    //   </div>
    // </div>

        // {/* Personal Information */}
        // <div className="row">
        // </div>
    //     {/* University Information */}
    //     <div className="row">
    //     </div>
    //     {/* Interests */}
    //     <div className="row">
    //     </div>
    //     {/* Delete Account */}
    //     <div className="row">
    //     </div>

    //   </div>
    // </div>

    // <div>

    //   <div className="d-flex flex-column justify-content-center align-items-center">
    //     <Avatar />
    //     <br />
    //     <div className="txt-subtitle"> John Citizen </div>
    //   </div>

    //   <div className="d-flex flex-column justify-content-center align-items-center">

    // <div className="row txt-align-center">
    //   <div className="col-6">
    //     <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 12 </p>
    //     <p className="txt-font txt-normal"> Groups </p>
    //   </div>
    //   <div className="col-6">
    //     <p className="txt-font txt-bold txt-md" style={{ margin: 0 }}> 6 </p>
    //     <p className="txt-font"> Badges </p>
    //   </div>
    // </div>

    // <Card className="chart-card">
    //   <Card.Body style={{ width: '100%', height: '100%' }}>
    //     <div className="row flex-column justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>

    //       <ResponsiveContainer width={'99%'} height={300}>
    //         <AreaChart data={data}
    //           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
    //           <defs>
    //             <linearGradient id="colorGroupsJoined" x1="0" y1="0" x2="0" y2="1">
    //               <stop offset="5%" stopColor="#E3496B" stopOpacity={0.8} />
    //               <stop offset="95%" stopColor="#E3496B" stopOpacity={0} />
    //             </linearGradient>
    //             <linearGradient id="colorTotalBadges" x1="0" y1="0" x2="0" y2="1">
    //               <stop offset="5%" stopColor="#FEA31F" stopOpacity={0.8} />
    //               <stop offset="95%" stopColor="#FEA31F" stopOpacity={0} />
    //             </linearGradient>
    //           </defs>

    //           <Legend />

    //           <XAxis axisLine={false} tick={false} dataKey="name" />
    //           <YAxis axisLine={false} tick={false} />

    //           <Tooltip />
    //           <Area type="monotone" dataKey="Groups Joined" stroke="#E3496B" fillOpacity={1} fill="url(#colorGroupsJoined)" />
    //           <Area type="monotone" dataKey="Total Badges" stroke="#FEA31F" fillOpacity={1} fill="url(#colorTotalBadges)" />
    //         </AreaChart>
    //       </ResponsiveContainer>

    //       <br></br>
    //       <div className="graph-percentage">You’re in the top 10% of Holler users!</div>
    //     </div>
    //   </Card.Body>
    // </Card>


    //   </div>

    // </div>
  )
}

export default Profile
