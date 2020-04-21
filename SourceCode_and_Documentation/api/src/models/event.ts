export interface Event {
  url: string;
  image_url: string;
  title: string;
  time_start: Date;
  time_finish: Date;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  hosts: string[];
  categories: string[];
}

export interface AddEventRequest {
  id: string;
  url: string;
  image_url: string;
  title: string;
  time_start: Date;
  time_finish: Date;
  description: string;
  location: string;
  latitude?: number;
  longitude?: number;
  hosts: string[];
  categories: string[];
}

export interface EventInterest {
  uid: string;
  eventId: string;
  expiry: Date;
}