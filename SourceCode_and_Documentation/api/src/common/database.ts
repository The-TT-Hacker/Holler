import { Faculty } from "./models/faculty";
import { Class } from "./models/class";
import { Event, EventInterest } from "./models/event";
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
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
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

export async function registerUser(registration: UserRegistration): Promise<string> {
  try {
    if (!registration.email) return "Email is required";
    if (!registration.password) return "Password is required";

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
  
    return null;
  } catch (e) {
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
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

export async function getFaculties(university: string): Promise<Faculty[]> {
  const snapshot = await db.collection('faculties').where("university", "==", university).get();
  const faculties: Faculty[] = <Faculty[]> snapshot.docs.map(doc => doc.data());
  
  return faculties;
}

export async function setFaculties(university: string, faculties: Faculty[]): Promise<boolean> {
  try {
    // Delete current faculties
    var querySnapshot = await db.collection('faculties').where('university', '==', university).get();
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });

    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    // Add new faculties
    faculties.forEach(async (faculty: Faculty) => {
      const promise = db.collection('faculties').doc(university.toUpperCase() + "_" + faculty.code).set(faculty);
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getClasses(): Promise<Class[]> {
  const snapshot = await db.collection('classes').get();
  const classes: Class[] = <Class[]> snapshot.docs.map(doc => doc.data());
  
  return classes;
}

/*
  Events
*/

export async function getEvents(): Promise<Event[]> {
  try {
    const snapshot = await db.collection('events').where('time_start', '>', new Date()).get();
    const events = <Event[]> snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: docData.id,
        url: docData.url,
        title: docData.title,
        time_start: docData.time_start.toDate(),
        time_finish: docData.time_finish.toDate(),
        description: docData.description,
        location: docData.location,
        host_name: docData.host_name,
        host_url: docData.host_url,
        host_image: docData.host_image,
        image_url: docData.image_url,
        category: docData.category
      }
    });

    events.sort((a, b) => +b.time_start - +a.time_start);

    return events;
  } catch (e) {
    console.log(e);
  }
}

export async function getEvent(id: string): Promise<Event> {
  try {
    const docRef = await db.collection("events").doc(id).get();
    const docData: FirebaseFirestore.DocumentData = docRef.data();
    return {
      id: docData.id,
      url: docData.url,
      title: docData.title,
      time_start: docData.time_start.toDate(),
      time_finish: docData.time_finish.toDate(),
      description: docData.description,
      location: docData.location,
      host_name: docData.host_name,
      host_url: docData.host_url,
      host_image: docData.host_image,
      image_url: docData.image_url,
      category: docData.category
    }
  } catch (e) {
    console.log(e);
  }
}

export async function setEvents(events: Event[]): Promise<boolean> {
  try {
    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    events.forEach((event: Event) => {
      var promise = db.collection("events").doc(event.id).set(event);
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function selectEvent(uid: string, eventId: string) {
  try {
    const eventInterest: EventInterest = {
      uid: uid,
      eventId: eventId
    };

    db.collection("event_interests").add(eventInterest);

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}