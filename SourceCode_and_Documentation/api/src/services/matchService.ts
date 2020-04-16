// Import services
import { db } from "./firebaseService";

// Import models
import { Match } from "../models/match";

// Matches

/**
 * 
 * @param match 
 */
export async function setMatch(match: Match) {
  try {
    const matchToAdd: Match = {
      chatId: match.chatId,
      users: match.users,
      events: match.events
    };

    db.collection("matches").add(matchToAdd);

    return null;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * 
 * @param uid 
 */
export async function getMatches(uid: string) {
  try {
    const snapshot = await db.collection("matches").where('uids', 'array-contains', uid).get();
    const matches: Match[] = <Match[]> snapshot.docs.map(doc => doc.data());
    return matches;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}