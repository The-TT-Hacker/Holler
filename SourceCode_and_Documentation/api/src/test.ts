const db = require("./common/database");

/*
db.registerUser({
  email: "timthacker97@gmail.com",
  password: "test123"
}).then((res: string) => console.log(res)).catch((e: string) => console.log(e));
*/

const token = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFmODhiODE0MjljYzQ1MWEzMzVjMmY1Y2RiM2RmYjM0ZWIzYmJjN2YiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vaG9sbGVyLTI3MDkwMiIsImF1ZCI6ImhvbGxlci0yNzA5MDIiLCJhdXRoX3RpbWUiOjE1ODUyMDMxNDQsInVzZXJfaWQiOiJRYVlJRk9YTWRFUUJpQ3VYTXpudGpZaU45SDkyIiwic3ViIjoiUWFZSUZPWE1kRVFCaUN1WE16bnRqWWlOOUg5MiIsImlhdCI6MTU4NTIwMzE0NCwiZXhwIjoxNTg1MjA2NzQ0LCJlbWFpbCI6InRpbXRoYWNrZXI5N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGltdGhhY2tlcjk3QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.GnxBONsXKivPu3nhFA4N_gilCNHxGtyMcGYMGxzYXqFJqOHfvws-a4Gw13wXE01yZal7ktCXbQWKqlQISXp6dhiCwz5tKLUx4xap1ubM7M4hYLOih5r8AkUJe3Q4nrn5wNbOvkczs24tcL60Vgm1rPNHuXDK4ffp11qusDJ4xm-cJtQPm_qqMkcXsLH288WCMW3Xs5dATiqVLPbE8orgdXUVs6_DQeqskidhoXl9awcJK0UpJnIvhQNJH-I2ZFiWLV7GSRBZBDTpOCVSRm2yeG0BcgQpBRXgEjTc2Z_xNXIR6iTztMa-4DfAmhQ5lYr4PTZc8NIGLWeYGTFKCO7nFA";

/*
console.log("getting UID");
db.getUID(token).then((res: string) => console.log(res)).catch((e: string) => console.log(e));
*/

db.signOutUser(token).then((res: string) => console.log(res)).catch((e: string) => console.log(e));

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