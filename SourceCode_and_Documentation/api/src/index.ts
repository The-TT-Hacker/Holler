import express from "express";
import bodyParser from 'body-parser';
var cors = require('cors');

// Import types
import { Response } from "express";
import { HollerRequest } from "./types/request";


// Import services
import * as authService from "./services/authService";
import * as dataService from "./services/dataService";
import * as eventService from "./services/eventService";
import * as userService from "./services/userService";
import * as matchService from "./services/matchService";
import * as chatService from "./services/chatService";

// Import models
import { User } from "./models/user";
import { Notification } from "./models/notification";

const PORT = 5001;
const NO_AUTH_ROUTES: string[] = [
  "/register",
  "/verify_email",
  "/events",
  "/badges"
];
const NO_SIGNUP_ROUTES: string[] = [
  "/user"
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
app.use(async (req: HollerRequest, res: Response, next) => {

    // Skip if it is a non auth route
    if (NO_AUTH_ROUTES.includes(req.path)) next();

    // Check if the auth token exists
    else if (!req.headers.authorization) res.status(403).send("No authorization token");
    
    // Handle authenticated routes
    else {

      try {
      
        // Check token and get uid, user object
        await authService.verifyUser(req, req.headers.authorization);
    
        // Continue if route does not require sign up completion or sign up is completed
        if (NO_SIGNUP_ROUTES.includes(req.path) || req.user.signupCompleted) next();
        else throw "Sign up not completed";

      } catch (e) {

        // Error authenticating with token
        res.status(401).send(e);
      
      }
    
    }

});

app.get('/', (req: HollerRequest, res: Response) => res.send({
  "name": "Holler API",
  "version": "1.0.0"
}));

/**
 * New user end points
 */

// Register a new user
app.post('/register', async (req: HollerRequest, res: Response) => {
  const error = await authService.registerUser(req.body);
  if (error) res.status(400).send(error);
  else res.sendStatus(200);
});

// Confirm email address
app.post('/verify_email', async (req: HollerRequest, res: Response) => {
  if (!req.query.uid) res.status(400).send("No uid given");
  if (!req.query.oobCode) res.status(400).send("No oobCode given");

  try {

    await authService.verifyEmail(req.query.uid, req.query.oobCode);

    res.redirect("http://localhost:3000/ps");

  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * User end points
 */

// Gets all the current user's information
app.get('/user', async (req: HollerRequest, res: Response) => {
  const user: User = await userService.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

// Updates the current users infomation
app.put('/user', async (req: HollerRequest, res: Response) => {
  const result: boolean = await userService.updateUser(req.uid, req.body);
  if (result) res.sendStatus(203);
  else res.sendStatus(400);
});

// Deletes the current user
app.delete('/user', async (req: HollerRequest, res: Response) => {
  const result: boolean = await userService.deleteUser(req.uid);
  if (result) res.sendStatus(200);
  else res.sendStatus(400);
});

// Gets the list of events the current user is interested in
app.get('/user/events', async (req: HollerRequest, res: Response) => {
  const user: User = await userService.getUser(req.uid);
  if (user) res.send(user);
  else res.sendStatus(400);
});

// Gets all notifications
app.get('/user/notifications', async (req: HollerRequest, res: Response) => {
  try {
    var notifications: Notification[];

    // Pagination given
    if (req.query.start && req.query.end) notifications = await userService.getAllNotifications(req.uid, req.query.start, req.query.end);
    
    // Returns first 10
    else notifications = await userService.getAllNotifications(req.uid);

    res.send(notifications);
  } catch (e) {
    res.status(400).send(e);
  }
});

// Gets all new notifications
app.get('/user/new_notifications', async (req: HollerRequest, res: Response) => {
  try {
    const notifications = await userService.getNewNotifications(req.uid);
    res.send(notifications);
  } catch (e) {
    res.status(400).send(e);
  }
});

/**
 * User metadata endpoints
 */

// Gets all of the faculties and classes for a given university
app.get('/timetable/faculties/:university', async (req: HollerRequest, res: Response) => {
  if (!UNIVERSITIES.includes(req.params.university)) res.status(400).send("No university provided");
  const classes = await dataService.getFaculties(req.params.university);
  res.send(classes);
});

// Gets all of the faculties and classes for a given university
app.get('/interests', async (req: HollerRequest, res: Response) => {
  const interests = await dataService.getInterests();
  res.send(interests);
});

/**
 * Events end points
 */

// Gets all current events
app.get('/events', async (req: HollerRequest, res: Response) => {
  const events = await eventService.getEvents(req.query.searchText, req.query.tags, req.query.startDate, req.query.endDate);
  res.send(events);
});

// Gets the details about the specified event
app.get('/event/:id', async (req: HollerRequest, res: Response) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const events = await eventService.getEvent(req.params.id);
  res.send(events);
});

// Sets the current user as interested in the specified event
app.post('/event/:id/add_interest', async (req: HollerRequest, res: Response) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await eventService.addEventInterest(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

// Removes the current users interest in a specified event
app.delete('/event/:id/remove_interest', async (req: HollerRequest, res: Response) => {
  if (!req.params.id) res.status(400).send("No event id provided");
  const error = await eventService.removeEventInterest(req.uid, req.params.id);
  if (error) res.status(400).send(error);
  else res.send();
});

/**
 * Badges
 */

// Gets a list of all possible badges
app.get('/badges', async (req: HollerRequest, res: Response) => {
  const badges = await dataService.getBadges();
  res.send(badges);
});

/*
  Chat
*/

// Gets a list of all possible badges
app.get('/chat/:conversationId/messages', async (req: HollerRequest, res: Response) => {
  const messages = await chatService.getAllMessages(req.params.conversationId);
  res.send(messages);
});

// Gets a list of all possible badges
app.get('/badges', async (req: HollerRequest, res: Response) => {
  const badges = await dataService.getBadges();
  res.send(badges);
});

// Run the API
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});