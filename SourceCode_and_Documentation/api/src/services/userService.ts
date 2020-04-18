// Import services
import { db, admin } from "./firebaseService";
import * as chatService from "./chatService";
import * as sendgridService from "./sendgridService";

// Import models
import { EventInterest } from "../models/event";
import { User, UpdateUserRequest, UpdateUser } from "../models/user";
import { Notification } from "../models/notification";

// Import UUIDs
import * as ids from "../UUIDs";

/**
 * 
 * @param uid 
 * @param updateUserRequest 
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
        id: uid
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

    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 
 * @param uid 
 */
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

/**
 * 
 * @param uid 
 */
export async function getUser(uid: string): Promise<User> {
  try {
    const user = await db.collection("users").doc(uid).get();
    return <User> user.data();
  } catch (e) {
    return null;
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
export async function setNotification(uid: string, message: string): Promise<void> {
  try {

    const notifcation: Notification = {
      uid: uid,
      time: new Date(),
      message: message,
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