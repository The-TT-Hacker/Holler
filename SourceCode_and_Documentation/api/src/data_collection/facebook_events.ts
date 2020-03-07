import fetch from 'node-fetch';

import { Event } from "../common/models/event";

export async function getEvents(): Promise<Event[]> {
  const token = "EhBKtALqu398CV85W9CTq98VpKT9k7Fq7Aj8OOnb";
  return fetch("https://api.eventlink.me/unsw/events?token=" + token)
    .then((res) => res.json());
}