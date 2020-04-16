export class User {
  signupCompleted: boolean;
  firstName: string;
  lastName: string;
  email: string;
  dob: Date;
  faculties: string[];
  classes: string[];
  interests: string[];
  badges: string[];
}

export class UpdateUser {
  signupCompleted?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  dob?: Date;
  faculties?: string[];
  classes?: string[];
  interests?: string[];
  badges?: string[];
}

export class UserRegistration {
  email: string;
  password: string;
}

export class UserLogin {
  email: string;
  password: string;
}

export class UserPasswordResetRequest {
  email: string;
}