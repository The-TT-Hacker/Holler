import express from "express";
import bodyParser from 'body-parser';
import {
  getFaculties,
  getClassses
} from "./common/database";
import { getUnswTimetable } from "./data_collection/unsw_timetable"

const PORT = 8080;

// Testing scraper
//var classes = await getAllClasses();
//getUnswTimetable().then((classes) => console.log(classes));

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => res.send(JSON.stringify({
  "name": "Connect on Campus API",
  "version": "1.0.0"
})));

/*
  Timetable endpoints

  Get all faculties
  Get all classes
*/

// Get all faculties
app.get('/timetable/faculties', async (req, res) => {
  const classes = await getFaculties();
  res.send(JSON.stringify(classes));
});

// Get all classes
app.get('/timetable/classes', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  Event end points

  Get latest events
  Get event by id
  Post - Going to event
  Puts - Undo going to event
*/

app.get('/events', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  User end points

  Post Login
  Post Logout
  Post Register
  Puts Updates
  Get Users - Search
  Get User
*/

app.post('/user/login', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  Group endpoints

  Get groups
  Get new groups

*/

app.post('/match', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  Chat endpoints

  Get messages
  Get new message - could be websocket?
*/

/*

*/

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});