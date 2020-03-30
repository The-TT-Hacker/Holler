export class Event {
  id: string;
  url: string;
  title: string;
  time_start: Date;
  time_finish: Date;
  description: string;
  location: string;
  host_name: string;
  host_url: string;
  host_image: string;
  image_url: string;
  category: string;
}

export class EventInterest {
  uid: string;
  eventId: string;
}