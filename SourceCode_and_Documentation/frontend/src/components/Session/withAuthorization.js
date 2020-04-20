import React from 'react'
import { withRouter } from 'react-router-dom'
import { compose } from 'recompose'

import { withFirebase } from '../Firebase'
import * as ROUTES from '../../constants/routes'

const withAuthorization = condition => Component => {
  class withAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
            let link = document.createElement("a")
            link.href = ROUTES.LANDING
            link.click()
          }
        }
      )
    }

    componentWillUnmount() {
      this.listener()
    }

    render() {
      return <Component {...this.props} />
    }
  }

  return compose(
    withRouter,
    withFirebase
  )(withAuthorization)
}

export default withAuthorization