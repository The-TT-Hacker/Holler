import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Dashboard from '../Dashboard'
import Login from '../Login'
import Signup from '../Signup'
import ResetPassword from '../ResetPassword'
import VerifyEmail from '../VerifyEmail'

import { Step1, Step2, Step3 } from '../ProfileSetup'
import { Explore, Going, Matches, Profile, GroupChat, Achievements } from '../Dashboard'
import { withAuthentication } from '../Session'

import * as ROUTES from '../../constants/routes'
import { LANDING } from '../../constants/roles'

import '../../styles/responsive.css'
import '../../styles/text.css'
import '../../styles/buttons.css'
import '../../styles/search_bar.css'
import '../../styles/explore.css'
import '../../styles/MatchList.css'
import '../../styles/Chat.css'

const Redirect = () => {
  let link = document.createElement("a")
  link.href = LANDING
  link.click()

  return (
    <div></div>
  )
}

const App = () => {
  return (
    <Router>
      <Route path={ROUTES.SIGNUP} render={({history}) => <Signup history={history} />} />
      <Route path={ROUTES.LOGIN} component={() => <Login />} />
      <Route path={ROUTES.RESET_PASSWORD} component={() => <ResetPassword />} />
      <Route path={ROUTES.VERIFY_EMAIL} component={() => <VerifyEmail />} />

      <Route exact path={ROUTES.PROFILE_SETUP} component={() => <Step1 />} />
      <Route exact path={ROUTES.PROFILE_SETUP2} component={() => <Step2 />} />
      <Route exact path={ROUTES.PROFILE_SETUP3} component={() => <Step3 />} />

      <Route exact path={ROUTES.LANDING} component={Redirect} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
      <Route path={ROUTES.PROFILE} component={() => <Profile />} />
      <Route path={ROUTES.ACHIEVEMENTS} component={Achievements} />
      <Route path={ROUTES.EXPLORE} component={() => <Explore />} />
      <Route path={ROUTES.GOING} component={() => <Going />} />
      <Route path={ROUTES.MATCHES} component={() => <Matches />} />
      <Route path={ROUTES.GROUP_CHAT} render={(matchProps) => <GroupChat {...matchProps} />} />
    </Router>
  )
}

export default withAuthentication(App)
