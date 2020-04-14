export class User {
  firstName: string;
  lastName: string;
  email: string;
  faculties: string[];
  classes: string[];
  interests: string[];
  signedUp: boolean;
  firstLogin: boolean;
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