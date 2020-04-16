import { Faculty } from "../models/faculty";
import { Event, EventInterest } from "../models/event";
import { Match } from "../models/match";
import {
  User,
  UserRegistrationRequest,
  UpdateUserRequest,
  UpdateUser
} from "../models/user";

import { db, admin, client } from "../dbConnect";
import * as chat from "./chat";
import { captureRejectionSymbol } from "events";
import * as ids from "../ids";

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
    if (!user.emailVerified) return "User has not been verified";
    req.uid = decodedToken.uid;
    return null;
  } catch (e) {
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
  }
}

export async function registerUser(registration: UserRegistrationRequest): Promise<string> {
  try {
    if (!registration.email) return "Email is required";
    if (!registration.password) return "Password is required";

    const userAuthData = {
      email: registration.email,
      emailVerified: false,
      password: registration.password,
      disabled: false
    }

    const userData: User = {
      signupCompleted: false,
      chatUserCreated: false,
      firstName: null,
      lastName: null,
      dob: null,
      image: null,
      faculties: [],
      classes: [],
      interests: [],
      badges: []
    }

    const userRecord = await admin.createUser(userAuthData);
    const writeResult = await db.collection("users").doc(userRecord.uid).set(userData);

    const cred = await client.signInWithEmailAndPassword(registration.email, registration.password);
    cred.user.sendEmailVerification();
  
    return null;
  } catch (e) {
    console.log(e);
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
  }
}

export async function verifyEmail(oobCode: string): Promise<void> {
  try {
    await client.applyActionCode(oobCode);
  } catch (e) {
    throw "Invalid oobCode";
  }
}

/*
  Users
*/

export async function updateUser(uid: string, updateUserRequest: UpdateUserRequest): Promise<boolean> {
  try {

    const currentUser = await db.collection("users").doc(uid).get();
    const currentUserData = <User> currentUser.data();

    const updateUserValues: UpdateUser = {};

    // Update first name
    if (updateUserRequest.firstName) {
      updateUserValues.firstName = updateUserRequest.firstName;
      currentUserData.firstName = updateUserValues.firstName;
    }
    
    // Update last name
    if (updateUserRequest.lastName) {
      updateUserValues.lastName = updateUserRequest.lastName;
      currentUserData.lastName = updateUserValues.lastName;
    }

    // TODO Update email
    
    // Update dob
    if (updateUserRequest.dob) {
      updateUserValues.dob = updateUserRequest.dob;
      currentUserData.dob = updateUserValues.dob;
    }

    // Update image
    if (updateUserRequest.image) {
      updateUserValues.image = updateUserRequest.image;
      currentUserData.image = updateUserValues.image;
    }

    // Update faculties
    if (updateUserRequest.faculties) {
      if (updateUserRequest.appendFaculties) updateUserValues.faculties = currentUserData.faculties.concat(updateUserRequest.faculties);
      else updateUserValues.faculties = updateUserRequest.faculties;

      currentUserData.dob = updateUserValues.dob;
    }
    
    // Update classes
    if (updateUserRequest.classes) {
      if (updateUserRequest.appendClasses) updateUserValues.classes = currentUserData.faculties.concat(updateUserRequest.classes);
      else updateUserValues.classes = updateUserRequest.classes;

      currentUserData.classes = updateUserValues.classes;
    }

    // Update interests
    if (updateUserRequest.interests) {
      if (updateUserRequest.appendInterests) updateUserValues.interests = currentUserData.interests.concat(updateUserRequest.interests);
      else updateUserValues.interests = updateUserRequest.interests;

      currentUserData.interests = updateUserValues.interests;
    }

    // Check if signup has just been completed
    if (!currentUserData.signupCompleted &&
        currentUserData.firstName &&
        currentUserData.lastName &&
        currentUserData.dob &&
        currentUserData.image &&
        currentUserData.faculties.length &&
        currentUserData.classes.length &&
        currentUserData.interests.length) {

      updateUserValues.signupCompleted = true;

      // Add signup badge
      updateUserValues.badges = currentUserData.badges.concat([ ids.badges.completedProfile ]);

    }

    if (updateUserValues.signupCompleted) {
      
      // Create chat user
      const result = await chat.createChatUser({
        id: uid
      });

      // Check if chat user was created successfully
      if (result) updateUserValues.chatUserCreated = true;
      
    }

    await db.collection("users").doc(uid).update(updateUserValues);

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
  Interests
*/

export async function getInterests(): Promise<string[]> {
  const snapshot = await db.collection('interests').get();
  const interests = snapshot.docs.map(doc => doc.id);
  return interests;
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

/**
 * Badges
 */

export async function getBadges() {
  try {
    const snapshot = await db.collection("badges").get();
    const badges = snapshot.docs.map(doc => doc.id);
    return badges;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}