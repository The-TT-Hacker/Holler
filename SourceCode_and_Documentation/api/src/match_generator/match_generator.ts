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

// Run match generator on a given schedule defined by HOURS_BETWEEN_MATCHES
setInterval(async () => {

  // Get list of all event interests
  const eventInterests = await eventService.getAllEventInterests();

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

}, HOURS_BETWEEN_MATCHES * 60 * 60 * 1000);

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
      .then((user: User) => {
        
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

    const firstUser: User = interestedUsers[i].user;

    for (var j = i + 1; j < interestedUsers.length; j++) {

      const secondUser: User = interestedUsers[i].user;

      for (var k = j + 1; j < interestedUsers.length; j++) {

        const thirdUser: User = interestedUsers[i].user;

        const matchPoints = computeMatchPoints(firstUser, secondUser, thirdUser);

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
            },
            { 
              uid: interestedUsers[k].uid,
              firstName: thirdUser.firstName,
              lastName: thirdUser.lastName
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
  }

  return matchCombinations;
}

/**
 * Quantifies how much in common 2 users have in common
 * @param firstUser 
 * @param secondUser 
 */
function computeMatchPoints(firstUser: User, secondUser: User, thirdUser: User): number {

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
      match.users.forEach(user => {
        if (matchedUsers.includes(user.uid)) userAlreadyMatched = true;
      });

      // If any of the users have been matched before then skip this potential match
      // Otherwise make the match
      if (userAlreadyMatched) return;
      else matchedUsers.concat(match.users.map(user => user.uid));

      matches.push(match); // Add matches for debugging

      // Create unique ID for the chat
      match.chatId = uuidv4();

      // Add match to firestore
      matchService.setMatch(match).catch(e => console.log(e));

      // Create chat
      chatService.createConverstaion({
        id: match.chatId,
        subject: event.title,
        participants: match.users.map(user => user.uid),
      }).catch(e => console.log(e));

      // Send notifications
      match.users.forEach(user => userService.setNotification(user.uid, `You have been matched for ${event.title}`, `/conversation/${match.chatId}`).catch(e => console.log(e)));
      
    });
    
  });

  // Remove all event interests for matched users
  matchedUsers.forEach((uid) => eventService.removeEventInterest(uid, eventId).catch(e => console.log(e)));

  // Print matches for debugging
  console.log(`Matches for event: ${event.title}`);
  console.log(matches);
}