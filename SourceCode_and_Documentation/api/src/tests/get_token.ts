import * as firebaseService from "../services/firebaseService";

firebaseService.client.signInWithEmailAndPassword("timthacker97@gmail.com", "password")
  .then(res => res.user.getIdToken())
  .then(token => console.log(token))
  .catch(e => console.log(e));