import express from "express";
import {
  getClassses
} from "./common/database";
import { getUnswTimetable } from "./data_collection/unsw_timetable";

const PORT = 8080;

// Testing scraper
//var classes = await getAllClasses();
getUnswTimetable().then((classes) => console.log(classes));

const app = express();

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
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});