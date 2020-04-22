// Import services
import { db } from "./firebaseService";

// Import models
import { Faculty } from "../models/faculty";
import { Class } from "../models/class";
import { Badge } from "../models/badge";

//Import badges
import badges from "../../data/badges.json";
//const badges: Badge[] = require("../../data/badges.json");

// Faculties

/**
 * 
 * @param university 
 */
export async function getFaculties(university: string): Promise<Faculty[]> {
  const snapshot = await db.collection('faculties').where("university", "==", university).get();
  const faculties: Faculty[] = <Faculty[]> snapshot.docs.map(doc => doc.data());
  
  return faculties;
}

export async function getClasses(university: string): Promise<Class[]> {
  const snapshot = await db.collection('faculties').where("university", "==", university).get();
  
  var classes: Class[] = [];

  snapshot.docs.forEach(doc => {
    const faculty = <Faculty> doc.data();
    classes = classes.concat(faculty.classes);
  });
  
  return classes;
}

export async function getClassCodes(university: string): Promise<string[]> {
  const snapshot = await db.collection('faculties').where("university", "==", university).get();
  
  var classes: string[] = [];

  snapshot.docs.forEach(doc => {
    const faculty = <Faculty> doc.data();
    classes = classes.concat(faculty.classes.map(classObj => classObj.code));
  });
  
  return classes;
}

/**
 * 
 * @param university 
 * @param faculties 
 */
export async function setFaculties(university: string, faculties: Faculty[]): Promise<boolean> {
  try {
    // Delete current faculties
    var querySnapshot = await db.collection('faculties').where('university', '==', university).get();
    querySnapshot.forEach((doc) => {
      doc.ref.delete();
    });

    var promises: Promise<FirebaseFirestore.WriteResult>[] = [];

    // Add new faculties
    faculties.forEach(async (faculty: Faculty) => {
      const promise = db.collection('faculties').doc(university.toUpperCase() + "_" + faculty.code).set(faculty);
      promises.push(promise);
    });

    await Promise.all(promises);

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

// Interests

export async function setInterest(interest: string): Promise<void> {
  const snapshot = await db.collection('interests').doc(interest).set({});
}

/**
 * 
 */
export async function getInterests(): Promise<string[]> {
  const snapshot = await db.collection('interests').get();
  const interests = snapshot.docs.map(doc => doc.id);
  return interests;
}

// Badges

/**
 * 
 */
export function getBadges(): Badge[] {
  return <Badge[]> badges;
}

export function getBadge(badgeId: string): Badge {
  try {
    const badge = (<Badge[]>badges).find(badge => badge.id = badgeId);
    
    if (!badge) throw "Invalid badgeId"
    
    return badge;
  } catch (e) {
    throw e;
  }
}
// Tags

/**
 * 
 */
export async function getTags() {
  try {
    const snapshot = await db.collection("tags").get();
    const tags = snapshot.docs.map(doc => doc.id);
    return tags;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}