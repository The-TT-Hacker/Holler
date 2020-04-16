// Import services
import { db } from "./firebaseService";

// Import models
import { Faculty } from "../models/faculty";

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
export async function getBadges() {
  try {
    const snapshot = await db.collection("badges").get();
    const badges = snapshot.docs.map(doc => doc.id);
    return badges;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}