import express from "express";
import bodyParser from 'body-parser';
import {
  getClassses
} from "./common/database";
import { getUnswTimetable } from "./data_collection/unsw_timetable";

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
  Timtable endpoints

  Get all faculties
  Get all classes
*/

// Get all classes
app.get('/events/classes', async (req, res) => {
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
*/

app.post('/user/login', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  Match endpoints

  
*/

app.post('/match', async (req, res) => {
  const classes = await getClassses();
  res.send(JSON.stringify(classes));
});

/*
  Chat endpoints
*/

/*

*/

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});