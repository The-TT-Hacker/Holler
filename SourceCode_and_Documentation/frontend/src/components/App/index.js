import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import './styles.css'
import * as ROUTES from '../../constants/routes'

import Landing from '../Landing'
import Login from '../Login'
import Signup from '../Signup'
import ResetPassword from '../ResetPassword'
import VerifyEmail from '../VerifyEmail'
import ProfileSetup from '../ProfileSetup'
import Dashboard from '../Dashboard'

const App = () => {
  return (
    <Router>
      <Route exact path={ROUTES.LANDING} component={Landing} />
      <Route path={ROUTES.SIGNUP} component={Signup} />
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
      <Route path={ROUTES.VERIFY_EMAIL} component={VerifyEmail} />
      <Route path={ROUTES.PROFILE_SETUP} component={ProfileSetup} />
      <Route path={ROUTES.DASHBOARD} component={Dashboard} />
    </Router>
  )
}

export default App