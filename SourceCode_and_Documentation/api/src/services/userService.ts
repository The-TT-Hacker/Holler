// Import services
import { db, admin } from "./firebaseService";
import * as chatService from "./chatService";
import * as sendgridService from "./sendgridService";
import * as eventService from "./eventService";

// Import models
import { Event, EventInterest } from "../models/event";
import { User, UpdateUserRequest, UpdateUser, UserResponse } from "../models/user";
import { Notification } from "../models/notification";

// Import UUIDs
import * as ids from "../UUIDs";

/**
 * 
 * @param uid 
 * @param updateUserRequest 
 */
export async function updateUser(uid: string, updateUserRequest: UpdateUserRequest): Promise<void> {
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
      const result = await chatService.createChatUser({
        id: uid,
        name: currentUserData.firstName + " " + currentUserData.lastName
      });

      // Check if chat user was created successfully
      if (result) updateUserValues.chatUserCreated = true;
      
    }

    await db.collection("users").doc(uid).update(updateUserValues);

    // Update email - TODO what if sendgrid fails? we will return an error but everything else updated
    if (updateUserRequest.email) {

      admin.updateUser(uid, {
        email: updateUserRequest.email,
        emailVerified: false
      });

      await sendgridService.sendEmailVerfification(uid, updateUserRequest.email);

    }
  } catch (e) {
    throw e;
  }
}

/**
 * 
 * @param uid 
 */
export async function deleteUser(uid: string): Promise<void> {
  try {
    const prom1 = admin.deleteUser(uid);
    const prom2 = db.collection("users").doc(uid).delete();
    await Promise.all([prom1, prom2]);
  } catch (e) {
    throw e;
  }
}

/**
 * 
 * @param uid 
 */
export async function getUser(uid: string): Promise<UserResponse> {
  try {
    const docRef = await db.collection("users").doc(uid).get();
    const user = <User> docRef.data();

    const userResponse: UserResponse = {
      uid: docRef.id,
      firstName: user.firstName,
      lastName: user.lastName,
      dob: user.dob,
      image: user.image,
      faculties: user.faculties,
      classes: user.classes,
      interests: user.interests,
      badges: user.badges
    }

    return userResponse;
  } catch (e) {
    throw e;
  }
}

/**
 * 
 * @param uid 
 */
export async function getUserEventInterests(uid: string): Promise<EventInterest[]> {
  try {
    const snapshot = await db.collection("event_interests").where("uid", "==", uid).get();
    const eventInterests: EventInterest[] = <EventInterest[]> snapshot.docs.map(doc => doc.data());

    return eventInterests;
  } catch (e) {
    return null;
  }
}

/**
 * Adds a new notification for a user
 * @param uid 
 * @param message 
 */
export async function setNotification(uid: string, message: string, url: string): Promise<void> {
  try {

    const notifcation: Notification = {
      uid: uid,
      time: new Date(),
      message: message,
      url: url,
      seen: false
    }
    
    await db.collection("notifications").add(notifcation);
  
  } catch (e) {
    if (e.errorInfo) throw e.errorInfo.message;
    else throw "Error";
  }
}

/**
 * Gets all notifications for a user
 * start and end define the pagination parameters
 * @param uid 
 * @param start 
 * @param end 
 */
export async function getAllNotifications(uid: string, start: string="0", end: string="9"): Promise<Notification[]> {
  try {

    const pagStart = parseInt(start);
    const pagEnd = parseInt(end);

    if (pagStart === NaN) throw "start must be an integer";
    if (pagEnd === NaN) throw "end must be an integer";
    
    const snapshot = await db.collection("notifications")
      .where("uid", "==", uid)
      .orderBy('time', 'desc')
      .get();
    
      const notifcations: Notification[] = <Notification[]> snapshot.docs.map(doc => doc.data());

    return notifcations.slice(pagStart, pagEnd);
  
  } catch (e) {
    if (e.errorInfo) throw e.errorInfo.message;
    else throw "Error";
  }
}

/**
 * Gets all unseen notifications
 * @param uid 
 */
export async function getNewNotifications(uid: string): Promise<Notification[]> {
  try {
    
    const snapshot = await db.collection("notifications")
      .where("uid", "==", uid)
      .where("seen", "==", false)
      .orderBy('time', 'desc')
      .get();

    const notifcations: Notification[] = <Notification[]> snapshot.docs.map(doc => doc.data());

    return notifcations;
  
  } catch (e) {
    if (e.errorInfo) throw e.errorInfo.message;
    else throw "Error";
  }
}

/**
 * Gets all event ids for event interests for a user
 */
export async function getEventInterestIds(uid: string): Promise<string[]> {
  try {

    const snapshot = await db.collection("event_interests").where('uid', '==', uid).get();
    
    const events: string[] =  snapshot.docs.map(doc => {
      const eventInterest = <EventInterest> doc.data();
      return eventInterest.eventId;
    });

    return events;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}

/**
 * Gets all events for event interests for a user
 */
export async function getEventInterests(uid: string): Promise<Event[]> {
  try {

    const eventIds = await getEventInterestIds(uid);

    var promises: Promise<Event>[] = [];

    eventIds.forEach(eventId => {
      const promise: Promise<Event> = eventService.getEvent(eventId);

      promises.push(promise);
    })

    const events = await Promise.all(promises);

    return events;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}