import React from 'react';
import './App.css';

import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom'

import Login from './Pages/Login'
import Signup from './Pages/Signup'
import VerifyEmail from './Pages/VerifyEmail'
import ProfileSetup1 from './Pages/ProfileSetup1'
import ProfileSetup2 from './Pages/ProfileSetup2'
import ProfileSetup3 from './Pages/ProfileSetup3'
import ProfileSetup4 from './Pages/ProfileSetup4'

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/verify-email" component={VerifyEmail} />
                <Route path="/profile-setup-1" component={ProfileSetup1} />
                <Route path="/profile-setup-2" component={ProfileSetup2} />
                <Route path="/profile-setup-3" component={ProfileSetup3} />
                <Route path="/profile-setup-4" component={ProfileSetup4} />
                <Route path="/" component={Login} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
