import firebase_admin from "firebase-admin";
import firebase_client from "firebase";

let serviceAccount = require('../../secrets/holler-270902-4230fc220e88.json');

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(serviceAccount),
  databaseURL: 'https://kickoff-72089.firebaseio.com'
});

firebase_client.initializeApp({
  apiKey: "AIzaSyCuPGJ3v1gb-GMdazOlHPW0IbuDIDJ_7Qk",
  authDomain: "holler-270902.firebaseapp.com",
  databaseURL: "https://holler-270902.firebaseio.com",
  projectId: "holler-270902",
  storageBucket: "holler-270902.appspot.com",
  messagingSenderId: "55892426851",
  appId: "1:55892426851:web:dee79feedfb77dd1d23856",
  measurementId: "G-439E2HGLD1"
});

export var db = firebase_admin.firestore();
export var admin = firebase_admin.auth();
export var client = firebase_client.auth();