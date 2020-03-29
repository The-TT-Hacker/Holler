import React from 'react'

import Navigation from './navigation'
import Explore from './explore'
import Going from './going'
import Matches from './matches'
import Profile from './profile'

import { withAuthorization } from '../Session'

const Dashboard = () => {
  return (
    <div>
      <Navigation />
    </div>
  )
}

const condition = authUser => !!authUser
export default withAuthorization(condition)(Dashboard)
export { Explore, Going, Matches, Profile }