import React from 'react'

import Navigation from './navigation'
import Explore from './explore'
import Going from './going'
import Matches from './matches'
import Profile from './profile'

import { withAuthorization } from '../Session'
import  '../../styles/events.css'

const Dashboard = () => {

  return (
    <div>
      <div>
        <Navigation />
        {
        /* React Router draws the other component after the navigation:
        [explore, going, matches, profile] depending on the current frontend route
        i.e. /dashboard/explore, /dashboard/going etc. */
        }
      </div>
     </div>
  )
}

// <div id="tempo" className="temp">
//   <div className="topnav-title">
//           Search Events
//   </div>
//   <div className="topnav-dashboard_searchbar">
//     <Form inline>
//       <FormControl type="text" placeholder="Search Events" className={Search} />
//     </Form>
//   </div>
// </div>

// class RemSearch extends Component{
//   constructor(props) {
//     super(props)
//
//    this.state = { ...Dashboard }
//   }
//
//   onClick= {hideElem};
//
// }

const condition = authUser => !!authUser
export default withAuthorization(condition)(Dashboard)
export { Explore, Going, Matches, Profile }
