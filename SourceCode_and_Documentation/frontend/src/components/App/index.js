import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../../styles/responsive.css'
import '../../styles/text.css'
import '../../styles/buttons.css'
import '../../styles/search_bar.css'
import '../../styles/explore.css'

import * as ROUTES from '../../constants/routes'

import Landing from '../Landing'
import Login from '../Login'
import Signup from '../Signup'
import ResetPassword from '../ResetPassword'
import VerifyEmail from '../VerifyEmail'
import ProfileSetup from '../ProfileSetup'
import Dashboard from '../Dashboard'
import { Explore } from '../Dashboard'
import { Going } from '../Dashboard'
import { Matches } from '../Dashboard'
import { Profile } from '../Dashboard'
import { withAuthentication } from '../Session'

const App = () => {
  return (
    <Router>
      <Route exact path={ROUTES.LANDING} component={() => <Landing scroll={true} />} />
      <Route path={ROUTES.SIGNUP} component={() => <Signup scroll={false} />} />
      <Route path={ROUTES.LOGIN} component={() => <Login scroll={false} />} />
      <Route path={ROUTES.RESET_PASSWORD} component={() => <ResetPassword scroll={false} />} />
      <Route path={ROUTES.VERIFY_EMAIL} component={() => <VerifyEmail scroll={false} />} />
      <Route path={ROUTES.PROFILE_SETUP} component={() => <ProfileSetup scroll={false} />} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES.PROFILE} component={() => <Profile scroll={true} />} />
      <Route path={ROUTES.EXPLORE} component={() => <Explore scroll={false} />} />
      <Route path={ROUTES.GOING} component={() => <Going scroll={false} />} />
      <Route path={ROUTES.MATCHES} component={() => <Matches scroll={true} />} />
    </Router>
  )
}

export default withAuthentication(App)
