import express from "express";
import bodyParser from 'body-parser';
import {
  getUID,
  registerUser,
  getFaculties,
  getClasses,
  getEvents,
  getUser,
  loginUser,
  signOutUser,
  deleteUser,
  resetPassword,
  updateUser
} from "./common/database";
import { User } from "./common/models/user";

const PORT = 8080;
const NO_AUTH_ROUTES: string[] = [
  "/login",
  "/register"
];

const app = express();

app.use(bodyParser.json());
app.use(function (req, res, next) {
  if (NO_AUTH_ROUTES.includes(req.path)) next();
  else {
    if (!req.headers.Authorization) res.send(400);
    
    var token: string = req.headers.authorization;

    getUID(token)
      .then((uid) => {
        req.uid = uid;
        next();
      })
      .catch(() => res.send(401));
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

app.post('/auth/login', async (req, res) => {
  const token: string = await loginUser(req.body);
  res.send();
});

app.post('/auth/logout', async (req, res) => {
  const token: string = await signOutUser(req.headers.authorization);
  res.send();
});

app.post('/auth/register', async (req, res) => {
  await registerUser(req.body);
  res.send();
});

app.post('/auth/forget_password', async (req, res) => {
  await resetPassword(req.headers.authorization, req.body);
  res.send();
});

app.post('/auth/delete', async (req, res) => {
  await deleteUser(req.uid);
  res.send();
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
  User end points

  Puts User
  Get  Users - Search
  Get  User
*/

app.get('/user', async (req, res) => {
  const user: User = await getUser(req.uid);
  res.send(user);
});

app.put('/user', async (req, res) => {
  await updateUser(req.uid, req.body);
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