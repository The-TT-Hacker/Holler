import { Faculty } from "./models/faculty";
import { Class } from "./models/class";

export async function getFaculties(): Promise<Faculty[]> {
  return fetch("")
    .then((response) => response.json())
    .then((body: Faculty[]) => body);
}

export async function getClassses(): Promise<Class[]> {
  return fetch("")
    .then((response) => response.json())
    .then((body: Class[]) => body);
}