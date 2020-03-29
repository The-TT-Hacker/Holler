import React from 'react'

import Navigation from './navigation'
import Explore from './explore'
import Going from './going'
import Matches from './matches'
import Profile from './profile'

import { Form,FormControl,Button,Navbar} from 'react-bootstrap'
import Search from '../../icons/search.svg'

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navigation />
      </div>

      <div className="topnav-title">
              Search Events
      </div>
      <div className="topnav-dashboard_searchbar">
        <Form inline>
          <FormControl type="text" placeholder="Search Events" className={Search} />
        </Form>
      </div>

    </div>
  )
}

export default Dashboard
export { Explore, Going, Matches, Profile }
