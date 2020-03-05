import express from "express";
import {
  getClassses
} from "./common/database";
import { getEvents } from "./data_collection/unsw_timetable";

getEvents().then((x) => {});

const app = express();
const port = 8080; // default port to listen

// Root
app.get('/', (req, res) => res.send(JSON.stringify({
  "name": "Connect on Campus API",
  "version": "1.0.0"
})));

// Classes
app.get('/classes', async (req, res) => {

  const classes = await getClassses();

  res.send(JSON.stringify(classes));

});

app.get('/timetable', async (req, res) => {

  const classes = await getClassses();

  res.send(JSON.stringify(classes));

});

// Run Server
app.listen(port, () => {
  console.log(`server started at http://localhost:${ port }`);
} );