// Import types
import { HollerRequest } from "../types/request";

// Import services
import { db, admin, client } from "./firebaseService";
import * as sendgridService from "./sendgridService";
import * as userService from "./userService";

// Import models
import {
  User,
  UserRegistrationRequest
} from "../models/user";

/**
 * Checks if user's email has been verified
 * Adds the uid and user objects to req
 * @param req 
 * @param token 
 */
export async function verifyUser(req: HollerRequest, token: string): Promise<void> {
  try {
    const uid = await getUID(token);

    const authUser = await admin.getUser(uid);

    if (!authUser.emailVerified) throw "Email has not been verified";

    const user = await userService.getUserObject(uid);

    req.uid = uid;
    req.user = user;

  } catch (e) {
    throw e;
  }
}

/**
 * 
 * @param token 
 * @param req 
 */
export async function getUID(token: string): Promise<string> {
  try {
    const decodedToken = await admin.verifyIdToken(token);
    
    return decodedToken.uid;
  } catch (e) {
    if (e.errorInfo) throw e.errorInfo.message;
    else throw e;
  }
}

/**
 * 
 * @param registration 
 */
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

    const userRecord = await admin.createUser(userAuthData);

    const oobCode = await sendgridService.sendEmailVerfification(userRecord.uid, registration.email);

    const userData: User = {
      signupCompleted: false,
      chatUserCreated: false,
      oobCode: oobCode,
      firstName: null,
      lastName: null,
      dob: null,
      image: null,
      faculties: [],
      classes: [],
      interests: [],
      badges: {}
    }

    const writeResult = await db.collection("users").doc(userRecord.uid).set(userData);
  
    return null;
  } catch (e) {
    console.log(e);
    if (e.errorInfo) return e.errorInfo.message;
    else return "Error";
  }
}

/**
 * 
 * @param oobCode 
 */
export async function verifyEmail(uid: string, oobCode: string): Promise<void> {

  var user: User;

  try {
    const doc = await db.collection("users").doc(uid).get();
    user = <User> doc.data();
  } catch (e) {
    throw "Invalid uid";
  }

  try {

    // Check if code is valid
    if (user.oobCode === oobCode) {
      
      // Reset oobCode
      await db.collection("users").doc(uid).update({
        oobCode: null
      });

      // Verify email
      await admin.updateUser(uid, {
        emailVerified: true
      });

    } else throw "Invalid oobCode";

  } catch (e) {
    console.log(e);
    throw e;
  }
}