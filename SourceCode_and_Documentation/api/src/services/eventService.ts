// Import services
import { db } from "./firebaseService";

// Import models
import { Event, EventInterest } from "../models/event";

declare global {
  interface Date {
    addDays(days: number): Date;
  }
}

/**
 * 
 */
Date.prototype.addDays = function (days: number): Date {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

/**
 * 
 * @param searchText 
 * @param tags 
 * @param startDate 
 * @param endDate 
 */
export async function getEvents(searchText: string, tags: string, startDate: string, endDate: string): Promise<Event[]> {
  try {

    var time_start: Date;

    if (searchText) searchText = searchText.toUpperCase();

    // Query events occuring after start date
    if (startDate) {
      time_start = new Date(startDate);
    } else {
      time_start = new Date();
    }

    var query = db.collection('events')
      .where('time_start', '>', time_start)
      .orderBy('time_start', 'desc');
    
    // Get events
    const snapshot = await query.get()
    var events = <Event[]> snapshot.docs.map(doc => {
      const docData = doc.data();
      return {
        id: docData.id,
        url: docData.url,
        title: docData.title,
        time_start: docData.time_start.toDate(),
        time_finish: docData.time_finish.toDate(),
        description: docData.description,
        location: docData.location,
        hosts: docData.hosts,
        categories: docData.categories,
        image_url: docData.image_url
      }
    });

    // Filter events
    events = events.filter((event) => {

      // Filter by matching search text with title
      if (searchText) {
        if (!event.title.toUpperCase().includes(searchText)) {
          return false;
        }
      }

      // Query events occuring after end date
      if (endDate) {
        if (event.time_start > new Date(endDate)) return false;
      }

      // Filter based on tags
      if (tags) {
        var tagList = tags.split(",");

        var valid = false;

        for (var i = 0; i < tagList.length; i++) {
          if (event.categories.includes(tagList[i]) || event.hosts.includes(tagList[i])) {
            valid = true;
            break;
          }
        }

        if (!valid) return false;
      }

      // Passed all filters
      return true;

    });

    return events;

  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * 
 * @param id 
 */
export async function getEvent(id: string): Promise<Event> {
  try {
    const docRef = await db.collection("events").doc(id).get();
    const docData: FirebaseFirestore.DocumentData = docRef.data();
    return {
      id: docData.id,
      url: docData.url,
      image_url: docData.image_url,
      title: docData.title,
      time_start: docData.time_start.toDate(),
      time_finish: docData.time_finish.toDate(),
      description: docData.description,
      location: docData.location,
      hosts: docData.hosts,
      categories: docData.categories
    }
  } catch (e) {
    console.log(e);
  }
}

/**
 * 
 * @param events 
 */
export async function setEvents(events: Event[]): Promise<boolean> {
  try {
    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    events.forEach((event: Event) => {
      var promise = db.collection("events").doc(event.id).set(event);
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * 
 * @param tags 
 */
export async function setTags(tags: string[]): Promise<boolean> {
  try {
    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    console.log(tags);

    tags.forEach((tag: string) => {
      var promise = db.collection("tags").doc(tag).set({});
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * 
 * @param uid 
 * @param eventId 
 */
export async function addEventInterest(uid: string, eventId: string) {
  try {
    const docRef = await db.collection("events").doc(eventId).get();
    const event: Event = <Event> docRef.data();

    if (!event) throw "Invalid eventId";

    const eventInterest: EventInterest = {
      uid: uid,
      eventId: eventId,
      expiry: event.time_start
    };

    db.collection("event_interests").add(eventInterest);

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * 
 */
export async function removeEventInterest(uid: string, eventId: string) {
  try {
    const snapshot = await db.collection('event_interests')
      .where("uid", "==", uid)
      .where("eventId", "==", eventId)
      .get();
      
    snapshot.forEach((doc) => doc.ref.delete());

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * Gets all event interests for events occuring in the next 2 days
 */
export async function getAllEventInterests() {
  try {
    const snapshot = await db.collection("event_interests").where('expiry', '>', new Date()).get();
    const eventInterests: EventInterest[] = <EventInterest[]> snapshot.docs.map(doc => doc.data());

    return eventInterests.filter(eventInterest => eventInterest.expiry < (new Date).addDays(2));
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}