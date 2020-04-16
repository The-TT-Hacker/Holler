// Import dependencies
import { v4 as uuidv4 } from 'uuid';

// Import services
import * as eventService from "../services/eventService";
import * as userService from "../services/userService";
import * as chatService from "../services/chatService";
import * as matchService from "../services/matchService";

// Import models
import { Event, EventInterest } from "../models/event";
import { User } from "../models/user";
import { Match } from "../models/match";

// Define types

type SortedEventInterests = {
  [eventId: string]: InterestedUser[]
}

type MatchCombinations = {
  [matchPoints: string]: Match[]
};

interface InterestedUser {
  uid: string;
  user: User;
}

const HOURS_BETWEEN_MATCHES = 1

setInterval(async () => {

  // Get all event interests
  const eventInterests = await eventService.getAllEventInterests();

  const sortedEventInterests: SortedEventInterests = await compileAndSortEventInterests(eventInterests);

  Object.entries(sortedEventInterests).forEach(async ([eventId, interestedUsers]) => {

    const event = await eventService.getEvent(eventId);

    // 
    const matchCombinations = getWeightedCombinations(eventId, event, interestedUsers);

    makeMatches(event, matchCombinations);

  });

}, HOURS_BETWEEN_MATCHES * 60 * 60 * 1000);

/**
 * Compiles a list of event interests into an object containing lists of users + user data for each event
 * @param eventInterests 
 */
async function compileAndSortEventInterests(eventInterests: EventInterest[]): Promise<SortedEventInterests> {

  var sortedEventInterests: SortedEventInterests = {};
  var promises: Promise<void>[] = [];

  eventInterests.forEach((eventInterest: EventInterest) => {

    const promise: Promise<void> = userService.getUser(eventInterest.uid)
      .then((user: User) => {
        
        const interestedUser: InterestedUser = {
          uid: eventInterest.uid,
          user: user
        };

        if (sortedEventInterests[eventInterest.eventId]) {
          sortedEventInterests[eventInterest.eventId].push(interestedUser);
        } else {
          sortedEventInterests[eventInterest.eventId] = [
            interestedUser
          ];
        }

      })
      .catch((error) => console.log(error));

    promises.push(promise);

  });

  return Promise.all(promises).then(() => sortedEventInterests);

}

/**
 * Loops through all of the users interested in a given event
 * Returns on object with combinations sorted into groups depending on how much they have in common
 * @param eventId 
 * @param event 
 * @param interestedUsers 
 */
function getWeightedCombinations(eventId: string, event: Event, interestedUsers: InterestedUser[]): MatchCombinations {

  var matchCombinations: MatchCombinations = {};

  // Loop over all combinations of groups of 3
  for (var i = 0; i < interestedUsers.length; i++) {

    const firstUser: User = interestedUsers[i].user;

    for (var j = i + 1; j < interestedUsers.length; j++) {

      const secondUser: User = interestedUsers[i].user;

      const matchPoints = computeMatchPoints(firstUser, secondUser);

      // Build potential match
      const potentialMatch: Match = {
        users: [
          { 
            uid: interestedUsers[i].uid,
            firstName: firstUser.firstName,
            lastName: firstUser.lastName
          },
          { 
            uid: interestedUsers[j].uid,
            firstName: secondUser.firstName,
            lastName: secondUser.lastName
          }
        ],
        events: [
          {
            eventId: eventId,
            title: event.title,
            time_start: event.time_start,
            location: event.location
          }
        ],
        chatId: null
      }

      // Add potential match to list with potential matches with an equal amount of match points
      if (matchCombinations[matchPoints]) matchCombinations[matchPoints].push(potentialMatch);
      else matchCombinations[matchPoints] = [ potentialMatch ];
    }
  }

  return matchCombinations;
}

/**
 * 
 * @param firstUser 
 * @param secondUser 
 */
function computeMatchPoints(firstUser: User, secondUser: User): number {

  var matchPoints = 0;

  // Check classes
  firstUser.classes.forEach(className => {
    if (secondUser.classes.includes(className)) matchPoints++;
  });

  // Check interests
  firstUser.interests.forEach((interest) => {
    if (secondUser.interests.includes(interest)) matchPoints++;
  });

  return matchPoints;

}

/**
 * 
 * @param event 
 * @param matchCombinations 
 */
function makeMatches(event: Event, matchCombinations: MatchCombinations) {
  var matches: Match[] = []; // for testing
  var matchedUsers: string[] = [];

  // Get list of valid match points
  var keys = Object.keys(matchCombinations).sort((a, b) => +b - +a);

  keys.forEach((matchPoints: string) => {
    matchCombinations[matchPoints].forEach(match => {
      var userAlreadyMatched = false;
      
      // Check if any users have been matched before
      match.users.forEach(user => {
        if (matchedUsers.includes(user.uid)) userAlreadyMatched = true;
      });

      // If any of the users have been matched before then skip this potential match
      // Otherwise make the match
      if (userAlreadyMatched) {
        return;
      } else {
        matchedUsers.concat(match.users.map(user => user.uid));
      }

      matches.push(match); // debugging

      match.chatId = uuidv4();

      // Add match to firestore
      matchService.setMatch(match);

      // Create chat
      chatService.createConverstaion({
        id: match.chatId,
        subject: event.title,
        participants: match.users.map(user => user.uid),
      });
    });
  });

  console.log(`Matches for event: ${event.title}`);
  console.log(matches);
}