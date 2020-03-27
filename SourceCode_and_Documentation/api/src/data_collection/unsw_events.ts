import fetch from 'node-fetch';
import { setEvents } from "../common/database";
import { Event } from "../common/models/event";

export async function getEvents(): Promise<Event[]> {
  return fetch("https://api.eventlink.me/events?uni=unsw")
    .then((res) => <Promise<Event[]>> res.json());
}

export async function getSocieties(): Promise<Society[]> {
  return fetch("https://api.eventlink.me/societies?uni=unsw")
    .then((res) => <Promise<Event[]>> res.json());
}

getEvents().then(async (events: Event[]) => {
  console.log(events);
  await setEvents(events);
});