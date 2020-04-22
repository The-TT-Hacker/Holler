import { Message } from "./chatMessage";

/**
 * Match object stored in firestore
 */
export interface Match {
  chatId: string;
  uids: string[];
  eventIds: string[];
}

/**
 * 
 */
export interface MatchResponse {
  chatId: string;
  users: MatchUserInfo[];
  events: MatchEventInfo[];
  lastMessage: Message;
}

export interface MatchUserInfo {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface MatchEventInfo {
  id: string;
  title: string;
  time_start: Date;
  location: string;
}