//import admin from 'firebase-admin';
const admin = require("firebase-admin");

let serviceAccount = require('../../secrets/holler-270902-4230fc220e88.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://kickoff-72089.firebaseio.com'
});

var db = admin.firestore();

module.exports = db;