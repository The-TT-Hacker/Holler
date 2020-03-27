import fetch from 'node-fetch';
import { setEvents } from "../common/database";
import { Event } from "../common/models/event";
import { Society } from "../common/models/society";

export async function getEvents(): Promise<Event[]> {
  return fetch("https://api.eventlink.me/events?uni=unsw")
    .then((res) => <Promise<Event[]>> res.json());
}

export async function getSocieties(): Promise<Society[]> {
  return fetch("https://api.eventlink.me/societies?uni=unsw")
    .then((res) => <Promise<Society[]>> res.json());
}

getEvents().then(async (events: Event[]) => {
  console.log(events);
  const result = await setEvents(events.map((event) => {
    return {
      id: event.id,
      url: event.url,
      title: event.title,
      time_start: event.time_start,
      time_finish: event.time_finish,
      description: event.description,
      location: event.location,
      host_name: event.host_name[0],
      host_url: event.host_url[0],
      host_image: event.host_image[0],
      image_url: event.image_url,
      category: event.category
    }
  }));
  console.log(result);
});