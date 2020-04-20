export interface Event {
  id: string;
  url: string;
  image_url: string;
  title: string;
  time_start: Date;
  time_finish: Date;
  description: string;
  location: string;
  hosts: string[];
  categories: string[];
}

export interface EventInterest {
  uid: string;
  eventId: string;
  expiry: Date;
}