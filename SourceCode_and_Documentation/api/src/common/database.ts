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

export async function getUID(token: string, req: any): Promise<string> {
  try {
    const decodedToken = await admin.verifyIdToken(token);
    const user = await admin.getUser(decodedToken.uid);
    if (!user.emailVerified) return "User had not been verified";
    req.uid = decodedToken.uid;
    return null;
  } catch (e) {
    return "An error occurred"
  }
}

export async function loginUser(login: UserLogin): Promise<string> {
  try {
    const cred = await client.signInWithEmailAndPassword(login.email, login.password);
    const token = await cred.user.getIdToken();
    return token;
  } catch (e) {
    return null;
  };
}

export async function signOutUser(token: string): Promise<boolean> {
  try {
    await client.signInWithCustomToken(token);
    await client.signOut();
    return true;
  } catch (e) {
    console.log(e);
    return false;
  };
}

export async function registerUser(registration: UserRegistration): Promise<boolean> {
  try {
    const userRecord = await admin.createUser({
      email: registration.email,
      emailVerified: false,
      password: registration.password,
      disabled: false
    });
  
    db.collection("users").doc(userRecord.uid).set({
      firstName: null,
      lastName: null,
      email: registration.email,
      faculties: null,
      classes: null,
      signedUp: false
    });

    const cred = await client.signInWithEmailAndPassword(registration.email, registration.password);
    cred.user.sendEmailVerification();
    //const token = await cred.user.getIdToken();
  
    return true;
  } catch (e) {
    return false;
  }
}

export async function updateUser(uid: string, user: User): Promise<boolean> {
  try {
    await db.collection("users").doc(uid).update({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      faculties: user.faculties,
      classes: user.classes,
      signedUp: true
    });

    return true;
  } catch (e) {
    return false;
  }
}

export async function resetPassword(token: string, req: UserPasswordResetRequest): Promise<boolean> {
  try {
    await client.signInWithCustomToken(token);
    await client.sendPasswordResetEmail(req.email);
    return true;
  } catch (e) {
    return false;
  }
}

export async function deleteUser(uid: string): Promise<boolean> {
  try {
    const prom1 = admin.deleteUser(uid);
    const prom2 = db.collection("users").doc(uid).delete();
    await Promise.all([prom1, prom2]);
    return true;
  } catch (e) {
    return false;
  }
}

export async function getUser(uid: string): Promise<User> {
  try {
    const user = await db.collection("users").doc(uid).get();
    return <User> user.data();
  } catch (e) {
    return null;
  }
}

/*
  Faculties
*/

export async function getFaculties(): Promise<Faculty[]> {
  const snapshot = await db.collection('faculties').get();
  const faculties: Faculty[] = <Faculty[]> snapshot.docs.map(doc => doc.data());
  
  return faculties;
}

export async function getClasses(): Promise<Class[]> {
  const snapshot = await db.collection('classes').get();
  const classes: Class[] = <Class[]> snapshot.docs.map(doc => doc.data());
  
  return classes;
}

/*
  Events
*/

export async function getEvents(): Promise<Class[]> {
  const docRef = await db.collection("events").doc("event1").get();
  return docRef.get("date");
}

export async function setEvents(events: Event[]): Promise<boolean> {
  try {
    var promises: Promise<FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>>[] = [];

    events.forEach((event: Event) => {
      var promise = db.collection("events").add(event);
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    return false;
  }
}

/*
  Test
*/

export async function get(): Promise<Class[]> {
  return db.collection("events").doc("event1").get().then(res => res.get("date"));
}