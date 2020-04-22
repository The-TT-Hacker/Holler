// Import services
import { db } from "./firebaseService";
import * as userService from "./userService";
import * as eventService from "./eventService";
import * as chatService from "./chatService";

// Import models
import { Match, MatchResponse, MatchUserInfo, MatchEventInfo } from "../models/match";

// Matches

/**
 * 
 * @param match 
 */
export async function setMatch(match: Match) {
  try {
    const newMatch: Match = {
      chatId: match.chatId,
      uids: match.uids,
      eventIds: match.eventIds
    };

    db.collection("matches").add(newMatch);

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
export async function getMatches(uid: string): Promise<MatchResponse[]> {
  try {
    const snapshot = await db.collection("matches").where('uids', 'array-contains', uid).get();
    
    const promises: Promise<MatchResponse>[] = snapshot.docs.map(async doc => {
      const match = <Match> doc.data();

      const users = await Promise.all(match.uids.map(async uid => await userService.getUser(uid)))
      const events = await Promise.all(match.eventIds.map(async eventId => await eventService.getEvent(eventId)))

      const matchUserInfo: MatchUserInfo[] = users.map(user => {
        return {
          uid: user.uid,
          firstName: user.firstName,
          lastName: user.lastName
        }        
      })

      const matchEventInfo: MatchEventInfo[] = events.map(event => {
        return {
          id: event.id,
          title: event.title,
          time_start: event.time_start,
          location: event.location
        }        
      })

      const lastMessage = await chatService.getLastMessage(match.chatId);

      console.log(lastMessage);

      const matchResponse: MatchResponse = {
        chatId: match.chatId,
        users: matchUserInfo,
        events: matchEventInfo,
        lastMessage: lastMessage
      }

      return matchResponse;
    });

    const matches = await Promise.all(promises);

    return matches;
  } catch (e) {
    console.log(e);
    throw "Error"
  }
}