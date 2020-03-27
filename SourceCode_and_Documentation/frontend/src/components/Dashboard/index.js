import React from 'react'

import Navigation from './navigation'
import Explore from './explore'
import Going from './going'
import Matches from './matches'
import Profile from './profile'

const Dashboard = () => {
  return (
    <div>
      <Navigation />
    </div>
  )
}

export default Dashboard
export { Explore, Going, Matches, Profile }