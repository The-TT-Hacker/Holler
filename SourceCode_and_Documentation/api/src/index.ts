import express from "express";
import bodyParser from 'body-parser';
var cors = require('cors');

import * as db from "./common/database";
import { User } from "./common/models/user";

const PORT = 5001;
const NO_AUTH_ROUTES: string[] = [
  "/auth/register"
];
const UNIVERSITIES: string[] = [
  "unsw"
];

const app = express();

app.use(cors());
app.use(bodyParser.json());
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

/*
  Authentication end points

  POST - Register user
  DELETE - Deletes user
*/

app.post('/auth/register', async (req, res) => {
  const error = await db.registerUser(req.body);
  console.log(error);
  if (error) res.status(400).send(error);
  else res.sendStatus(200);
});

app.delete('/auth/delete', async (req, res) => {
  const result: boolean = await db.deleteUser(req.uid);
  if (result) res.sendStatus(200);
  else res.sendStatus(400);
});

/*
  User end points

  GET - User
  PUT - User
*/

app.get('/user', async (req, res) => {
  const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

app.put('/user', async (req, res) => {
  const result: boolean = await db.updateUser(req.uid, req.body);
  if (result) res.sendStatus(203);
  else res.sendStatus(400);
});

app.get('/user/events', async (req, res) => {
  const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

app.get('/user/badges', async (req, res) => {
  /*const user: User = await db.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);*/
});

/*
  Timetable endpoints

  GET - All faculties
  GET - All classes
*/

app.get('/timetable/faculties:university', async (req, res) => {
  if (!UNIVERSITIES.includes(req.params.university)) res.status(400).send("No university provided");
  const classes = await db.getFaculties(req.params.university);
  res.send(classes);
});

app.get('/timetable/classes', async (req, res) => {
  const classes = await db.getClasses();
  res.send(classes);
});

/*
  Events end points

  GET - Latest events
  GET - Event by id
  POST - Going to event
  DELETE - Undo going to event
*/

app.get('/events', async (req, res) => {
  const events = await db.getEvents(req.query.searchText, req.query.tags, req.query.startDate, req.query.endDate);
  res.send(events);
});

app.get('/event/:id', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const events = await db.getEvent(req.params.id);
  res.send(events);
});

app.post('/event/:id/add_interest', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await db.goingToEvent(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

app.delete('/event/:id/remove_interest', async (req, res) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await db.undoGoingToEvent(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

/*
  Group endpoints

  GET - Groups
  GET - New groups
*/

app.post('/match', async (req, res) => {
  //const classes = await db.getClasses();
  res.send();
});

/*
  Chat endpoints

  GET - Messages
  GET - New message - could be websocket?
*/

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});