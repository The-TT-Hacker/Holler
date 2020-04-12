import * as db from "../common/database";
import { EventInterest } from "../common/models/event";
import { User } from "../common/models/user";
import { Match } from "../common/models/match";

interface CompiledEventInterest {
    uid: string;
    user: User
}

var sortedEventInterests: {
    [eventId: string]: CompiledEventInterest[]
} = {};

// Get all interests
db.getAllEventInterests(new Date()).then(async (eventInterests) => {

    var promises: Promise<void>[] = [];

    eventInterests.forEach((eventInterest: EventInterest) => {

        const promise: Promise<void> = db.getUser(eventInterest.uid)
            .then((user: User) => {
                if (sortedEventInterests[eventInterest.eventId]) {
                    sortedEventInterests[eventInterest.eventId].push({
                        uid: eventInterest.uid,
                        user: user
                    });
                } else {
                    sortedEventInterests[eventInterest.eventId] = [{
                        uid: eventInterest.uid,
                        user: user
                    }];
                }
            })
            .catch((error) => {
                console.log(error);
            });

        promises.push(promise);

    });

    await Promise.all(promises);

    for (const eventId in sortedEventInterests) {
        const compiledEventInterests = sortedEventInterests[eventId];
        console.log(sortedEventInterests[eventId]);

        // Loop through all of the event interests and find the users who have the most in common

        var matchPermutations: { [matchPoints: string]: Match[] } = {};

        var matches: Match[] = [];
        var matchedUsers: string[] = [];

        // Compute match points
        for (var i = 0; i < compiledEventInterests.length; i++) {

            const currentUser: User = compiledEventInterests[i].user;

            // loop through all of the users the current user hasn't been matches with
            for (var j = i + 1; j < compiledEventInterests.length; j++) {

                const tempUser: User = compiledEventInterests[i].user;

                var matchPoints = 0;

                // Check classes
                currentUser.classes.forEach(className => {
                    if (tempUser.classes.includes(className)) matchPoints++;
                });

                // Check interests
                currentUser.interests.forEach((interest) => {
                    if (tempUser.interests.includes(interest)) matchPoints++;
                });

                // Add potential match
                if (matchPermutations[`${matchPoints}`]) {
                    matchPermutations[`${matchPoints}`].push({
                        uids: [ compiledEventInterests[i].uid, compiledEventInterests[j].uid ],
                        eventIds: [ eventId ]
                    });
                } else {
                    matchPermutations[`${matchPoints}`] = [{
                        uids: [ compiledEventInterests[i].uid, compiledEventInterests[j].uid ],
                        eventIds: [ eventId ]
                    }];
                }

            }

        }

        // Get list of valid match points
        var keys = Object.keys(matchPermutations).sort((a, b) => +b - +a);

        keys.forEach((matchPoints: string) => {
            matchPermutations[matchPoints].forEach(match => {
                var userAlreadyMatched = false;
                
                // Check if any users have been matched before
                match.uids.forEach(uid => {
                    if (matchedUsers.includes(uid)) userAlreadyMatched = true;
                });

                // Add match
                matches.push(match);
            });
        });

        console.log(`Matches for eventId: ${eventId}`);
        console.log(matches);
    }
});