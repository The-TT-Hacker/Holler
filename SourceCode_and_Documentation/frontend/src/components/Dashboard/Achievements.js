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

const Badge = (props) => {
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

  // const [badgesList, setBadgeList] = useState([])

  // useEffect(() => {
  //   const source = axios.CancelToken.source()  
  //   const token = localStorage.getItem('token')
  //   const getFaculties = async () => {
      
  //     await axios({
  //       url: BACKEND + "/badges",
  //       method:"GET",
  //       cancelToken: source.token,
  //       headers: {
  //         'Authorization': `${token}`
  //       },
  //     })
  //     .then(function (response) {
  //       setBadgesList(response.data)
  //     })
  //     .catch(function (error) {
  //       if (axios.isCancel(error)) {

  //       } else {
  //         console.log(error)
  //       }
  //     })
  //   }
  //   getFaculties()
    
  //   return () => {
  //     source.cancel()
  //   }
  // }, [])

  return (
    <div className="container-fluid d-flex flex-column align-items-center" style={{ width: '100%' }}>
      <div className="main-content" style={{ overflowX: 'hidden' }}>

        <div style={{ marginBottom: '5vh' }}></div>

        <PageTitle title="Achievements" />

        <div style={{ marginBottom: "4rem" }}> <PageTitle title="Overall performance" size="medium" /> </div>
        <Chart />

        <PageTitle title="Unlocked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Badge image={Badge1} title="Welcome!" subtitle="Welcome to Holler!" locked={false}/>
          <Badge image={Badge2} title="First Spark" subtitle="You matched with your first group!" locked={false}/>
        </div>

        <PageTitle title="Locked badges" size="medium" />
        <div className="d-flex justify-content-center flex-column align-items-center">
          <Badge image={Badge3} title="Top Ten" subtitle="You were in the top 10% of Holler users!" locked={true}/>
          <Badge image={Badge4} title="Eventful Day" subtitle="You went to your first event!" locked={true}/>
          <Badge image={Badge5} title="Social Buzz" subtitle="You made your first conversation!" locked={true}/>
          <Badge image={Badge6} title="Looking Good" subtitle="You added your first avatar!" locked={true}/>
        </div>


      </div>
    </div>
  )

}

export default Achievements