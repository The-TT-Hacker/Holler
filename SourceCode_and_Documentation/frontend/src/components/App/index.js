import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import '../../styles/responsive.css'
import '../../styles/text.css'
import '../../styles/buttons.css'
import '../../styles/search_bar.css'
import '../../styles/explore.css'
import '../../styles/MatchList.css'
import '../../styles/Chat.css'

import * as ROUTES from '../../constants/routes'

import Dashboard from '../Dashboard'
import Landing from '../Landing'
import Login from '../Login'
import Signup from '../Signup'
import ResetPassword from '../ResetPassword'
import VerifyEmail from '../VerifyEmail'

import { Step1, Step2, Step3 } from '../ProfileSetup'
import { Explore, Going, Matches, Profile, GroupChat } from '../Dashboard'
import { withAuthentication } from '../Session'

const App = () => {
  return (
    <Router>
      <Route exact path={ROUTES.LANDING} component={() => <Landing scroll={true} />} />
      <Route path={ROUTES.SIGNUP} component={() => <Signup scroll={false} />} />
      <Route path={ROUTES.LOGIN} component={() => <Login scroll={false} />} />
      <Route path={ROUTES.RESET_PASSWORD} component={() => <ResetPassword scroll={false} />} />
      <Route path={ROUTES.VERIFY_EMAIL} component={() => <VerifyEmail scroll={false} />} />

      <Route exact path={ROUTES.PROFILE_SETUP} component={() => <Step1 scroll={false} />} />
      <Route exact path={ROUTES.PROFILE_SETUP2} component={() => <Step2 scroll={false} />} />
      <Route exact path={ROUTES.PROFILE_SETUP3} component={() => <Step3 scroll={false} />} />

      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES.PROFILE} component={() => <Profile scroll={true} />} />
      <Route path={ROUTES.EXPLORE} component={() => <Explore scroll={true} />} />
      <Route path={ROUTES.GOING} component={() => <Going scroll={true} />} />
      <Route path={ROUTES.MATCHES} component={() => <Matches scroll={true} />} />
      <Route path={ROUTES.GROUP_CHAT} render={(matchProps) => <GroupChat {...matchProps} />} />
    </Router>
  )
}

export default withAuthentication(App)
