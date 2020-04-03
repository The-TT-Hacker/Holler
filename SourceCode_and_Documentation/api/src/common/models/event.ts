export class Event {
  id: string;
  url: string;
  title: string;
  time_start: Date;
  time_finish: Date;
  description: string;
  location: string;
  hosts: string[];
  categories: string[];
}

export class EventInterest {
  uid: string;
  eventId: string;
  expiry: Date;
}