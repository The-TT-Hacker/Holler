import fetch from 'node-fetch';
import * as eventService from "../services/eventService";
import { Event, AddEventRequest } from "../models/event";
import { Society } from "../models/society";

export async function getEvents(): Promise<any[]> {
  return fetch("https://api.eventlink.me/events?uni=unsw")
    .then((res) => <Promise<Event[]>> res.json());
}

export async function getSocieties(): Promise<Society[]> {
  return fetch("https://api.eventlink.me/societies?uni=unsw")
    .then((res) => <Promise<Society[]>> res.json());
}

getEvents().then(async (events) => {

  var tags: string[] = [];

  const addEventRequests: AddEventRequest[] = events.map((event) => {

    event.categories.forEach((category: string) => {
      if (!tags.includes(category)) {
        tags.push(category);
      }
    });

    event.hosts.forEach((host: any) => {
      if (!tags.includes(host.name)) {
        tags.push(host.name);
      }
    });

    const hollerEvent: AddEventRequest = {
      id: event.id,
      url: event.url,
      image_url: event.image_url,
      title: event.title,
      time_start: new Date(event.time_start),
      time_finish: new Date(event.time_finish),
      description: event.description,
      location: event.location,
      hosts: event.hosts.map((host: any) => host.name),
      categories: event.categories
    }

    return hollerEvent;
  });

  try {
    await eventService.setEvents(addEventRequests);
  } catch (e) {
    console.log(e);
  }

  try {
    await eventService.setTags(tags);
  } catch (e) {
    console.log(e);
  }
  
});