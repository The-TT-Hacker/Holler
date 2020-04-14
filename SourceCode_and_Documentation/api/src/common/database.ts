import { Faculty } from "./models/faculty";
import { Class } from "./models/class";
import { Event, EventInterest } from "./models/event";
import { Match } from "./models/match";
import {
  User,
  UserRegistration,
  UserLogin,
  UserPasswordResetRequest
} from "./models/user";

import { db, admin, client } from "./dbConnect";
import * as chat from "../chat/chatService";

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

Date.prototype.addDays = function (days: number): Date {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

/*
  Authentication
*/

export async function getUID(token: string, req: any): Promise<string> {
  try {
    console.log(token)
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
      signedUp: false,
      firstLogin: true
    });

    const cred = await client.signInWithEmailAndPassword(registration.email, registration.password);
    cred.user.sendEmailVerification();
    //const token = await cred.user.getIdToken();

    const result = await chat.createChatUser({
        id: userRecord.uid,
        name: "",
        //photoUrl?: string;
        //custom?: { [name: string]: string };
    });
  
    return null;
  } catch (e) {
    console.log(e);
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
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

/*
  Users
*/

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

export async function getUserEventInterests(uid: string): Promise<EventInterest[]> {
  try {
    const snapshot = await db.collection("event_interests").where("uid", "==", uid).get();
    const eventInterests: EventInterest[] = <EventInterest[]> snapshot.docs.map(doc => doc.data());

    return eventInterests;
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

/*
  Events
*/

export async function getEvents(searchText: string, tags: string, startDate: string, endDate: string): Promise<Event[]> {
  try {
    var time_start: Date;

    if (searchText) searchText = searchText.toUpperCase();

    // Query events occuring after start date
    if (startDate) {
      time_start = new Date(startDate);
    } else {
      time_start = new Date();
    }

    var query = db.collection('events').where('time_start', '>', time_start);
    
    // Get events
    const snapshot = await query.get()
    var events = <Event[]> snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: docData.id,
        url: docData.url,
        title: docData.title,
        time_start: docData.time_start.toDate(),
        time_finish: docData.time_finish.toDate(),
        description: docData.description,
        location: docData.location,
        hosts: docData.hosts,
        categories: docData.categories
      }
    });

    // Filter events

    events = events.filter((event) => {

      // Filter by matching search text with title
      if (searchText) {
        if (!event.title.toUpperCase().includes(searchText)) {
          return false;
        }
      }

      // Query events occuring after end date
      if (endDate) {
        if (event.time_start > new Date(endDate)) return false;
      }

      // Filter based on tags
      if (tags) {
        var tagList = tags.split(",");

        var valid = false;

        for (var i = 0; i < tagList.length; i++) {
          if (event.categories.includes(tagList[i]) || event.hosts.includes(tagList[i])) {
            valid = true;
            break;
          }
        }

        if (!valid) return false;
      }

      // Passed all filters
      return true;

    });

    // Sort events in chronologically order
    events.sort((a, b) => +a.time_start - +b.time_start);

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
      hosts: docData.hosts,
      categories: docData.categories
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

export async function setTags(tags: string[]): Promise<boolean> {
  try {
    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    console.log(tags);

    tags.forEach((tag: string) => {
      var promise = db.collection("tags").doc(tag).set({});
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addEventInterest(uid: string, eventId: string) {
  try {
    const docRef = await db.collection("events").doc(eventId).get();
    const event: Event = <Event> docRef.data();

    if (!event) throw "Invalid eventId";

    const eventInterest: EventInterest = {
      uid: uid,
      eventId: eventId,
      expiry: event.time_start
    };

    db.collection("event_interests").add(eventInterest);

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function removeEventInterest(uid: string, eventId: string) {
  try {
    const snapshot = await db.collection('event_interests')
      .where("uid", "==", uid)
      .where("eventId", "==", eventId)
      .get();
      
    snapshot.forEach((doc) => doc.ref.delete());

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Gets all event interests for events occuring in the next 2 days
export async function getAllEventInterests() {
  try {
    const snapshot = await db.collection("event_interests").where('expiry', '>', new Date()).get();
    const eventInterests: EventInterest[] = <EventInterest[]> snapshot.docs.map(doc => doc.data());

    return eventInterests.filter(eventInterest => eventInterest.expiry < (new Date).addDays(2));
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}

/*
  Matches
*/

export async function makeMatch(match: Match) {
  try {
    const matchToAdd: Match = {
      chatId: match.chatId,
      uids: match.uids,
      eventIds: match.eventIds
    };

    db.collection("matches").add(matchToAdd);

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getMatches(uid: string) {
  try {
    const snapshot = await db.collection("matches").where('uids', 'array-contains', uid).get();
    const matches: Match[] = <Match[]> snapshot.docs.map(doc => doc.data());
    return matches;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}