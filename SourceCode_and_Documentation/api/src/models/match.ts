export class Match {
  chatId: string;
  users: MatchUserInfo[];
  events: MatchEventInfo[];

}

export interface MatchUserInfo {
  uid: string;
  firstName: string;
  lastName: string;
}

export interface MatchEventInfo {
  eventId: string;
  title: string;
  time_start: Date;
  location: string;
}