//import { db } from "./dbConnect";

const db = require("./dbConnect");

let docRef = db.collection('events').doc('event1');

let setAda = docRef.set({
  name: 'CSESoc BBQ',
  date: 'dd/MM/YY'
});
