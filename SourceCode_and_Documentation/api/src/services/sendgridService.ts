// Import dependencies
import sgMail from "@sendgrid/mail";
import { v4 as uuidv4 } from 'uuid';

sgMail.setApiKey("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");

export async function sendEmailVerfification(uid: string, email: string): Promise<string> {

  const oobCode = uuidv4();

  const msg = {
    to: email,
    from: "holler270902@gmail.com",
    subject: "Welcome To Holler! Please confirm your email to use the app",
    html: `
      <strong>Welcome to Holler!</strong>
      <p><a href="http://localhost:5001/verify_email?oobCode=${oobCode}&uid=${uid}">Click to Verify Email Address</a></p>
    `
  };

  try {
    await sgMail.send(msg);
  } catch (e) {
    throw e.response.body.errors[0].message;
  }
  
  return oobCode;

}