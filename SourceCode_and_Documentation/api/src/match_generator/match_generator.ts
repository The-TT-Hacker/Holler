// Import dependencies
import { v4 as uuidv4 } from 'uuid';

// Import services
import * as eventService from "../services/eventService";
import * as userService from "../services/userService";
import * as chatService from "../services/chatService";
import * as matchService from "../services/matchService";

// Import models
import { Event, EventInterest } from "../models/event";
import { User, UserResponse } from "../models/user";
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
  user: UserResponse;
}

const HOURS_BETWEEN_MATCHES = 1

/**
 * Run match generator on a given schedule defined by HOURS_BETWEEN_MATCHES
 */
export async function runMatchGeneratorOnInterval(hoursBetweenMatches: number, daysBeforeEventToStartMatching: number): Promise<NodeJS.Timeout> {
  return setInterval(async () => 
    await generateMatches(daysBeforeEventToStartMatching),
    hoursBetweenMatches  * 60 * 60 * 1000
  );
}

/**
 * Generate matches for all events within the given time window
 */
export async function generateMatches(daysBeforeEventToStartMatching: number) {

  // Get list of all event interests
  const eventInterests = await eventService.getAllEventInterests(daysBeforeEventToStartMatching);

  // Sort event interests by their events
  // and fetch user data from the uid in the event interests
  const sortedEventInterests: SortedEventInterests = await compileAndSortEventInterests(eventInterests);

  // Loop over event interests for each event
  Object.entries(sortedEventInterests).forEach(async ([eventId, interestedUsers]) => {

    // Get event from the eventId
    const event = await eventService.getEvent(eventId);

    // Get all possible combinations for matches and calculate a metric for how much in common the group has
    // Sort the event interests by this metric
    const matchCombinations = getWeightedCombinations(eventId, event, interestedUsers);

    // Make one match for each user
    // Remove event interests for matched users
    makeMatches(eventId, event, matchCombinations);

  });

}

/**
 * Compiles a list of event interests into an object containing lists of users + user data for each event
 * @param eventInterests 
 */
async function compileAndSortEventInterests(eventInterests: EventInterest[]): Promise<SortedEventInterests> {

  var sortedEventInterests: SortedEventInterests = {};
  var promises: Promise<void>[] = [];

  // Get user data from uid for each event interest
  // and compile list of interested users for each event
  eventInterests.forEach((eventInterest: EventInterest) => {

    // Only add interested user if successful in getting user data
    const promise: Promise<void> = userService.getUser(eventInterest.uid)
      .then((user) => {
        
        // Build object with both the uid and user object
        const interestedUser: InterestedUser = {
          uid: eventInterest.uid,
          user: user
        };

        // Add interested user to list of interested users for the psrticular event
        // Initialise list if it is the first user for the event
        if (sortedEventInterests[eventInterest.eventId]) sortedEventInterests[eventInterest.eventId].push(interestedUser);
        else sortedEventInterests[eventInterest.eventId] = [ interestedUser ];

      })
      .catch((error) => console.log(error));

    promises.push(promise);

  });

  // Return promise which resolves when sortedEventInterests is compiled
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

    const firstUser = interestedUsers[i].user;

    for (var j = i + 1; j < interestedUsers.length; j++) {

      const secondUser = interestedUsers[j].user;

      for (var k = j + 1; k < interestedUsers.length; k++) {

        const thirdUser = interestedUsers[k].user;

        const matchPoints = computeMatchPoints(firstUser, secondUser, thirdUser);

        // Build potential match
        const potentialMatch: Match = {
          uids: [
            interestedUsers[i].uid,
            interestedUsers[j].uid,
            interestedUsers[k].uid
          ],
          eventIds: [
            eventId
          ],
          chatId: null
        }

        // Add potential match to list with potential matches with an equal amount of match points
        if (matchCombinations[matchPoints]) matchCombinations[matchPoints].push(potentialMatch);
        else matchCombinations[matchPoints] = [ potentialMatch ];

      }
    }
  }

  return matchCombinations;
}

/**
 * Quantifies how much in common 2 users have in common
 * @param firstUser 
 * @param secondUser 
 */
function computeMatchPoints(firstUser: UserResponse, secondUser: UserResponse, thirdUser: UserResponse): number {

  var matchPoints = 0;

  var commonAttributes: { [attribute: string]: number } = {};

  // Check classes
  firstUser.classes.forEach(className =>  commonAttributes[className] = (commonAttributes[className] || 0) + 1);
  secondUser.classes.forEach(className => commonAttributes[className] = (commonAttributes[className] || 0) + 1);
  thirdUser.classes.forEach(className =>  commonAttributes[className] = (commonAttributes[className] || 0) + 1);

  // Check interests
  firstUser.interests.forEach(interest =>  commonAttributes[interest] = (commonAttributes[interest] || 0) + 1);
  secondUser.interests.forEach(interest => commonAttributes[interest] = (commonAttributes[interest] || 0) + 1);
  thirdUser.interests.forEach(interest =>  commonAttributes[interest] = (commonAttributes[interest] || 0) + 1);

  // Check faculties
  firstUser.faculties.forEach(faculty =>  commonAttributes[faculty] = (commonAttributes[faculty] || 0) + 1);
  secondUser.faculties.forEach(faculty => commonAttributes[faculty] = (commonAttributes[faculty] || 0) + 1);
  thirdUser.faculties.forEach(faculty =>  commonAttributes[faculty] = (commonAttributes[faculty] || 0) + 1);

  // Add square of how many in the group have the attribute in common
  // This means the more group members have an attribute in common, the amount of matchpoints increases exponentially
  Object.entries(commonAttributes).forEach(([attribute, numInCommon]) => matchPoints += numInCommon ** 2);

  // TODO - Add match points for age

  return matchPoints;

}

/**
 * Loops over the potential matches from most match points to least
 * creates the match if the users have not been matches already
 * @param event 
 * @param matchCombinations 
 */
function makeMatches(eventId: string, event: Event, matchCombinations: MatchCombinations) {

  var matches: Match[] = []; // For debugging
  var matchedUsers: string[] = [];

  // Get list of valid match points
  var keys = Object.keys(matchCombinations).sort((a, b) => +b - +a);

  keys.forEach((matchPoints: string) => {
    matchCombinations[matchPoints].forEach(match => {

      var userAlreadyMatched: boolean;
      
      // Check if any users have been matched before
      match.uids.forEach(uid => {
        if (matchedUsers.includes(uid)) userAlreadyMatched = true;
      });

      // If any of the users have been matched before then skip this potential match
      // Otherwise make the match
      if (userAlreadyMatched) return;
      else matchedUsers = matchedUsers.concat(match.uids);

      matches.push(match); // Add matches for debugging

      // Create unique ID for the chat
      match.chatId = uuidv4();

      // Add match to firestore
      matchService.setMatch(match).catch(e => console.log(e));

      // Create chat
      chatService.createConverstaion({
        id: match.chatId,
        subject: event.title,
        participants: match.uids,
      }).catch(e => console.log(e));

      // Send notifications
      match.uids.forEach(uid => userService.setNotification(uid, `You have been matched for ${event.title}`, `/matches`).catch(e => console.log(e)));
      
    });
    
  });

  // Remove all event interests for matched users
  matchedUsers.forEach((uid) => eventService.removeEventInterest(uid, eventId).catch(e => console.log(e)));

  // Print matches for debugging
  console.log(`Matches for event: ${event.title}`);
  console.log(matches);
}