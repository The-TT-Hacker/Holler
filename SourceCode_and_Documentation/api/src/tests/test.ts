import * as matchService from "../services/matchService";
import * as chatService from "../services/chatService";
import { Match } from "../models/match";

const chatId = "43234234";

const uids: string[] = [
  "aH069sOkv1QKt3uuWgKYZfMx30q2",
  "uGAX57PKjSMZc5liS9BbK5JRy363",
  "y8gjL79sLcguYhS7sYiMDBejBol1"
];

const eventIds: string[] = [
  "249845289743423"
];

chatService.createConverstaion({
  id: chatId,
  subject: "Test Match",
  participants: uids
}).then(res => console.log("chat", res));

const match: Match = {
  chatId: chatId,
  uids: uids,
  eventIds: eventIds
}

matchService.setMatch(match).then(res => console.log("match", res));

/*
import * as dataService from "../services/dataService";
import { Event } from "../models/event";

import * as sendgridService from "../services/sendgridService";
*/

//sendgridService.sendEmailVerfification("8vhRFp1uo1Q7E6B0fFQ4a6ceyUa2", "timthacker97@gmail.com");

/*
db.registerUser({
  email: "timthacker97@gmail.com",
  password: "test123"
}).then((res: string) => console.log(res)).catch((e: string) => console.log(e));
*/

//const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmODhiODE0MjljYzQ1MWEzMzVjMmY1Y2RiM2RmYjM0ZWIzYmJjN2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9sbGVyLTI3MDkwMiIsImF1ZCI6ImhvbGxlci0yNzA5MDIiLCJhdXRoX3RpbWUiOjE1ODUyMDMxNDQsInVzZXJfaWQiOiJRYVlJRk9YTWRFUUJpQ3VYTXpudGpZaU45SDkyIiwic3ViIjoiUWFZSUZPWE1kRVFCaUN1WE16bnRqWWlOOUg5MiIsImlhdCI6MTU4NTIwMzE0NCwiZXhwIjoxNTg1MjA2NzQ0LCJlbWFpbCI6InRpbXRoYWNrZXI5N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGltdGhhY2tlcjk3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.GnxBONsXKivPu3nhFA4N_gilCNHxGtyMcGYMGxzYXqFJqOHfvws-a4Gw13wXE01yZal7ktCXbQWKqlQISXp6dhiCwz5tKLUx4xap1ubM7M4hYLOih5r8AkUJe3Q4nrn5wNbOvkczs24tcL60Vgm1rPNHuXDK4ffp11qusDJ4xm-cJtQPm_qqMkcXsLH288WCMW3Xs5dATiqVLPbE8orgdXUVs6_DQeqskidhoXl9awcJK0UpJnIvhQNJH-I2ZFiWLV7GSRBZBDTpOCVSRm2yeG0BcgQpBRXgEjTc2Z_xNXIR6iTztMa-4DfAmhQ5lYr4PTZc8NIGLWeYGTFKCO7nFA";

/*
console.log("getting UID");
db.getUID(token).then((res: string) => console.log(res)).catch((e: string) => console.log(e));
*/

//db.signOutUser(token).then((res: string) => console.log(res)).catch((e: string) => console.log(e));

/*
db.loginUser({
  email: "timthacker97@gmail.com",
  password: "test123"
}).then((res: string) => console.log(res)).catch((e: string) => console.log(e));
*/

//db.getEvents().then(res => console.log(res));

// Testing scraper
//import { getUnswTimetable } from "./data_collection/unsw_timetable";

//var classes = await getAllClasses();
//getUnswTimetable().then((classes) => console.log(classes));

//db.getEvents().then((events: Event[]) => console.log(events));
//db.getEvent("1026547577732258").then((event: Event) => console.log(event));

//dataService.getFaculties("unsw").then(res => console.log(res));


//import { admin } from "../services/firebaseService";

//admin.getUser("qTOEZPNGRDPgtdNA0DuvDxc8Y5I3").then((user: any) => console.log(user));

/*import * as googleMapsService from "../services/googleMapsService";
googleMapsService.getCoordinates("128A Greenwich Road, Greenwich, NSW 2065").then(res => console.log(res));
*/