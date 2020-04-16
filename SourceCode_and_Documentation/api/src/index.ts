import express from "express";
import bodyParser from 'body-parser';
var cors = require('cors');

import * as db from "./common/database";
import { User } from "./common/models/user";

const PORT = 5001;
const NO_AUTH_ROUTES: string[] = [
  "/auth/register",
  "/events"
];
const UNIVERSITIES: string[] = [
  "unsw"
];

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});
app.use(async (req, res, next) => {
  if (NO_AUTH_ROUTES.includes(req.path)) {
    next();
  } else if (!req.headers.authorization) {
    res.status(403).send("No authorization token");
    return;
  } else {
    const token: string = req.headers.authorization;
    const error: string = await db.getUID(token, req);
    if (error) res.status(401).send(error);
    else next();
  }
});

app.get('/', (req, res) => res.send({
  "name": "Holler API",
  "version": "1.0.0"
}));

/**
 * New user end points
 */

// Register a new user
app.post('/register', async (req, res) => {
  const error = await db.registerUser(req.body);
  if (error) res.status(400).send(error);
  else res.sendStatus(200);
});

// Confirm email address
app.post('/email_handler', async (req, res) => {
  if (!req.params.mode) res.status(400).send("No mode given");
  if (!req.params.oobCode) res.status(400).send("No oobCode given");

  try {
    if (req.params.mode === "resetPassword") {
      //error = await db.resetPassword(req.params.oobCode);
    } else if (req.params.mode === "recoverEmail") {
      //error = await db.recoverEmail(req.params.oobCode);
    } else if (req.params.mode === "verifyEmail") {
      await db.verifyEmail(req.params.oobCode);
    } else {
      throw "Unknown mode given";
    }

    res.sendStatus(200);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * User end points
 */

// Gets all the current user's information
app.get('/user', async (req, res) => {
  const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

// Updates the current users infomation
app.put('/user', async (req, res) => {
  const result: boolean = await db.updateUser(req.uid, req.body);
  if (result) res.sendStatus(203);
  else res.sendStatus(400);
});

// Deletes the current user
app.delete('/user', async (req, res) => {
  const result: boolean = await db.deleteUser(req.uid);
  if (result) res.sendStatus(200);
  else res.sendStatus(400);
});

// Gets the list of events the current user is interested in
app.get('/user/events', async (req, res) => {
  const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

// Gets all of the current users badges
app.get('/user/badges', async (req, res) => {
  /*const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);*/
  res.send("not implemented yet");
});

/**
 * User metadata endpoints
 */

// Gets all of the faculties and classes for a given university
app.get('/timetable/faculties:university', async (req, res) => {
  if (!UNIVERSITIES.includes(req.params.university)) res.status(400).send("No university provided");
  const classes = await db.getFaculties(req.params.university);
  res.send(classes);
});

// Gets all of the faculties and classes for a given university
app.get('/interests', async (req, res) => {
  const interests = await db.getInterests();
  res.send(interests);
});

/**
 * Events end points
 */

// Gets all current events
app.get('/events', async (req, res) => {
  const events = await db.getEvents(req.query.searchText, req.query.tags, req.query.startDate, req.query.endDate);
  res.send(events);
});

// Gets the details about the specified event
app.get('/event/:id', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const events = await db.getEvent(req.params.id);
  res.send(events);
});

// Sets the current user as interested in the specified event
app.post('/event/:id/add_interest', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await db.addEventInterest(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

// Removes the current users interest in a specified event
app.delete('/event/:id/remove_interest', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await db.removeEventInterest(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

/**
 * Badges
 */

// Gets a list of all possible badges
app.get('/badges', async (req, res) => {
  const badges = await db.getBadges();
  res.send(badges);
});

// Run the API
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});