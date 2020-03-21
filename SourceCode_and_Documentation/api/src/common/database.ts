import { Faculty } from "./models/faculty";
import { Class } from "./models/class";
import { Event } from "./models/event";
import {
  User,
  UserRegistration,
  UserLogin,
  UserPasswordResetRequest
} from "./models/user";

import { db, admin, client } from "./dbConnect";

/*
  Authentication and Users
*/

export async function getUID(token: string) {
  const decodedToken = await admin.verifyIdToken(token);
  return decodedToken.uid;
}

export async function loginUser(login: UserLogin): Promise<string> {
  try {
    const cred = await client.signInWithEmailAndPassword(login.email, login.password);
    const token = await cred.user.getIdToken();
    return token;
  }

  catch (e) {
    return null;
  };
}

export async function signOutUser(token: string): Promise<string> {
  try {
    // hack way of using client to sign out
    client.signInWithCustomToken(token);
    client.signOut();
  }

  catch (e) {
    return null;
  };
}

export async function registerUser(registration: UserRegistration): Promise<string> {
  const userRecord = await admin.createUser({
    email: registration.email,
    emailVerified: false,
    password: registration.password,
    disabled: false
  });

  const result = await db.collection("users").doc(userRecord.uid).set({
    firstName: null,
    lastName: null,
    email: registration.email,
    faculties: null,
    classes: null,
    signedUp: false
  });

  const token: string = await admin.createCustomToken(userRecord.uid);
  const cred = await client.signInWithCustomToken(token);
  cred.user.sendEmailVerification();

  return token;
}

export async function updateUser(uid: string, user: User): Promise<void> {
  db.collection("users").doc(uid).update({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    faculties: user.faculties,
    classes: user.classes,
    signedUp: true
  });
}

export async function resetPassword(token: string, req: UserPasswordResetRequest) {
  client.signInWithCustomToken(token);
  client.sendPasswordResetEmail(req.email);
}

export async function deleteUser(uid: string): Promise<void> {
  admin.deleteUser(uid);
  db.collection("users").doc(uid).delete();
}

export async function getUser(uid: string): Promise<User> {
  const user = await db.collection("users").doc(uid).get();
  return <User> user.data();
}

/*
  Faculties
*/

export async function getFaculties(): Promise<Faculty[]> {
  const faculties: Faculty[] = [];//await db.collection("faculties").get();
  return faculties;
}

export async function getClasses(): Promise<Class[]> {
  const classes: Class[] = [];//await db.collection("classes").get();
  return classes;
}

/*
  Events
*/

export async function getEvents(): Promise<Class[]> {
  const docRef = await db.collection("events").doc("event1").get();
  return docRef.get("date");
}

export async function setEvents(events: Event[]): Promise<void> {
  var promises: Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>[] = [];

  events.forEach((event: Event) => {
    var promise = db.collection("events").add(event);
    promises.push(promise);
  });

  await Promise.all(promises);
}

/*
  Test
*/

export async function get(): Promise<Class[]> {
  return db.collection("events").doc("event1").get().then(res => res.get("date"));
}