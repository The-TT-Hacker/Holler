// Import services
import { db, admin } from "./firebaseService";
import * as chatService from "./chatService";

// Import models
import { EventInterest } from "../models/event";
import { User, UpdateUserRequest, UpdateUser } from "../models/user";

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
      const result = await chatService.createChatUser({
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