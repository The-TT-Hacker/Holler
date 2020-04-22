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
 * Gets the uid of a user given their login token
 * @param token Firebase token
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
 * Registers a user in firebase auth and firestore database
 * @param registration Registration request
 */
export async function registerUser(registration: UserRegistrationRequest): Promise<void> {
  
  try {

    // Input checking
    if (!registration.email) throw "Email is required";
    if (!registration.password) throw "Password is required";

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

    await db.collection("users").doc(userRecord.uid).set(userData);

  } catch (e) {
    if (e.errorInfo) throw e.errorInfo.message;
    else throw e;
  }
  
}

/**
 * Email verification handler
 * @param uid uid of the user
 * @param oobCode one time code used to verfify the email
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