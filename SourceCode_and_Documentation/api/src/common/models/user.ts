export class User {
  firstName: string;
  lastName: string;
  email: string;
  faculties: string[];
  classes: string[];
  signedUp: boolean;
}

export class UserRegistration {
  email: string;
  password: string;
  confirm_password: string;
}

export class UserLogin {
  email: string;
  password: string;
}

export class UserPasswordResetRequest {
  email: string;
}