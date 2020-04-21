
/**
 * Firebase object for EventInterest
 */
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

/**
 * Object used for adding an event
 */
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

/**
 * Object that is returned when an event is requested
 */
export interface GetEventResponse {
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

/**
 * Firebase object for EventInterest
 */
export interface EventInterest {
  uid: string;
  eventId: string;
  expiry: Date;
}