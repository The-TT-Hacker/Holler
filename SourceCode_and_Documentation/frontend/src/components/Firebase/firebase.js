import app from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyDIOcR16d1uuvT136olaUdFNQthKNTN1xE",
  authDomain: "seng-holler.firebaseapp.com",
  databaseURL: "https://seng-holler.firebaseio.com",
  projectId: "seng-holler",
  appId: "1:381485969613:web:d3155223d8640ca3757984",
  measurementId: "G-04NFC1QKBT"
};

class Firebase {
  constructor() {
      app.initializeApp(config)

      this.auth = app.auth()
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password)

  doLoginWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password)

  doLogout = () => this.auth.signOut()

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email)

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password)
    
}

export default Firebase