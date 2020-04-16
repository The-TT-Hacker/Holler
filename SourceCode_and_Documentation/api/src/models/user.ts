// Firestore objects

/**
 * The main user object 
 */
export interface User {
  signupCompleted: boolean;
  chatUserCreated: boolean;
  firstName: string;
  lastName: string;
  dob: Date;
  image: string;
  faculties: string[];
  classes: string[];
  interests: string[];
  badges: string[];
}

// Update objects

/**
 * The object sent to firestore to update a user
 * Fields are optional so that only required fields are updated
 */
export interface UpdateUser {
  signupCompleted?: boolean;
  chatUserCreated?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: Date;
  image?: string;
  faculties?: string[];
  classes?: string[];
  interests?: string[];
  badges?: string[];
}

// API request objects

/**
 * The object sent from the frontend to register a new user
 */
export interface UserRegistrationRequest {
  email: string;
  password: string;
}

/**
 * The object sent from the frontend to update user data
 */
export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: Date;
  image?: string;
  faculties?: string[];
  classes?: string[];
  interests?: string[];
  appendFaculties?: boolean;
  appendClasses?: boolean;
  appendInterests?: boolean;
}