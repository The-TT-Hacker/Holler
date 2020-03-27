import express from "express";
import bodyParser from 'body-parser';
import {
  getUID,
  registerUser,
  getFaculties,
  getClasses,
  getEvents,
  getUser,
  deleteUser,
  resetPassword,
  updateUser,
  signOutUser,
  loginUser
} from "./common/database";
import { User } from "./common/models/user";

const PORT = 5000;
const NO_AUTH_ROUTES: string[] = [
  "/auth/register"
];

const app = express();

app.use(bodyParser.json());
app.use(async (req, res, next) => {
  if (NO_AUTH_ROUTES.includes(req.path)) {
    next();
  } else if (!req.headers.authorization) {
    res.sendStatus(403);
    return;
  } else {
    const token: string = req.headers.authorization;
    const error: string = await getUID(token, req);
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

  Post Login
  Post Logout
  Post Register
*/

app.post('/auth/register', async (req, res) => {
  const result = await registerUser(req.body);
  if (result) res.sendStatus(200);
  else res.sendStatus(400);
});

app.post('/auth/delete', async (req, res) => {
  const result: boolean = await deleteUser(req.uid);
  if (result) res.sendStatus(200);
  else res.sendStatus(400);
});

/*
  User end points

  Puts User
  Get  Users - Search
  Get  User
*/

app.get('/user', async (req, res) => {
  const user: User = await getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

app.put('/user', async (req, res) => {
  const result: boolean = await updateUser(req.uid, req.body);
  if (result) res.sendStatus(203);
  else res.sendStatus(400);
});

/*
  Timetable endpoints

  Get all faculties
  Get all classes
*/

// Get all faculties
app.get('/timetable/faculties', async (req, res) => {
  const classes = await getFaculties();
  res.send(classes);
});

// Get all classes
app.get('/timetable/classes', async (req, res) => {
  const classes = await getClasses();
  res.send(classes);
});

/*
  Event end points

  Get latest events
  Get event by id
  Post - Going to event
  Puts - Undo going to event
*/

app.get('/events', async (req, res) => {
  const events = await getEvents();
  res.send(events);
});

/*
  Group endpoints

  Get groups
  Get new groups

*/

app.post('/match', async (req, res) => {
  const classes = await getClasses();
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