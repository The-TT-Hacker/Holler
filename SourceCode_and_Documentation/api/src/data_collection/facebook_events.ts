import { Event } from "../common/models/event";

export async function getEvents(): Promise<Event[]> {
  return fetch("https://api.eventlink.me/unsw/events?token=EhBKtALqu398CV85W9CTq98VpKT9k7Fq7Aj8OOnb")
    .then((response) => {
      return response.json();
    });
}