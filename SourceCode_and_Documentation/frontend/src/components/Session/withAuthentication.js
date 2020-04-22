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

    getProfile = () => {
      const token = localStorage.getItem('token')
      axios({
        url: BACKEND + "/user",
        method: "GET",
        headers: { 'Authorization' : `${token}` }
      })
      .then(response => {
        sessionStorage.setItem('avatar', response.data.image)
        sessionStorage.setItem('name', response.data.firstName + " " + response.data.lastName)
        sessionStorage.setItem('dob', new Date(response.data.dob).toLocaleDateString(undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}))
        sessionStorage.setItem('faculties', JSON.stringify(response.data.faculties))
        sessionStorage.setItem('classes', JSON.stringify(response.data.classes))
        sessionStorage.setItem('interests', JSON.stringify(response.data.interests))
      })
      .catch(error => {
        console.log(error)
      })
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          
          if (authUser) {

            this.setState({ authUser })
            authUser.getIdToken().then((token) => localStorage.setItem('token', token))
            localStorage.setItem('firebase_id', authUser.uid)
            this.getProfile()
            
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