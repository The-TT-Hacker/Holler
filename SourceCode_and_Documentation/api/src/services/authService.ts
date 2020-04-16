
// Import services
import { db, admin, client } from "./firebaseService";

// Import models
import {
  User,
  UserRegistrationRequest
} from "../models/user";

/**
 * 
 * @param token 
 * @param req 
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

/**
 * 
 * @param oobCode 
 */
export async function verifyEmail(oobCode: string): Promise<void> {
  try {
    await client.applyActionCode(oobCode);
  } catch (e) {
    throw "Invalid oobCode";
  }
}