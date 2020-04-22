import React from 'react'
import axios from 'axios'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase';
import { BACKEND } from '../../constants/roles'

const withAuthentication = Component => {

  class withAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
        isLoading: false
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          
          if (authUser) {

            this.setState({ authUser })
            authUser.getIdToken().then((token) => localStorage.setItem('token', token))
            localStorage.setItem('firebase_id', authUser.uid)
            
          } else {
            this.setState({ authUser: null })
          }
         
        }
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(withAuthentication)
}

export default withAuthentication