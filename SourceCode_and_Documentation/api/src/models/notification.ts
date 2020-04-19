export interface Notification {
  uid: string;
  time: Date;
  message: string;
  url: string;
  seen: boolean;
}