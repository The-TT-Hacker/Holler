import * as matchService from "../services/matchService";
import * as chatService from "../services/chatService";
import * as eventService from "../services/eventService";
import * as matchGenerator from "../match_generator/matchGenerator";
import * as constants from "./constants";
import { Match } from "../models/match";

/*
export async function makeMatch() {
  chatService.createConverstaion({
    id: constants.chatId,
    subject: "Test Match",
    participants: constants.testiungChatUids
  }).then(res => console.log("chat", res));
  
  const match: Match = {
    chatId: constants.chatId,
    uids: constants.testiungChatUids,
    eventIds: constants.testingChatEventIds
  }
  
  matchService.setMatch(match).then(res => console.log("match", res));
}
*/

/**
 * uids in testing chat
 */
const testiungMatchUids: string[] = [
  "eOi7acKh8aUgLekpAqWl3yR0wB73", // timthacker97@gmail.com
  //"OwSHJ1Pz4fgyusJ4GBSf6eTXK8c2", // sapkotaniraj7@gmail.com
  "rnipShMRKrZ0jhfgQ7TvKU50ioQ2" // ajh5273@gmail.com
  //"VFIRq8KBTQMl3hrzJHNWwBIrCvv1", // o@caldera.vc
  //"b2dh4DvgceW8nDSRulKPWKfL0r13"  // omarlotfi@outlook.com
];

const eventId = "2639538569654394"; // Sunday 26th 8pm

export async function matchTest() {
  
  await Promise.all(testiungMatchUids.map(async uid => eventService.addEventInterest(uid, eventId)));

  matchGenerator.generateMatches(1);

}

matchTest().then(res => console.log(res));