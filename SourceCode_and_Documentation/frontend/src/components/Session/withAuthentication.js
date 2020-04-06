import React from 'react'

import AuthUserContext from './context'
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class withAuthentication extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        authUser: null,
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          authUser
            ? this.setState({ authUser })
            : this.setState({ authUser: null })

          authUser.getIdToken().then(token => localStorage.setItem('token', token))
        }
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.token}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(withAuthentication)
}

export default withAuthentication