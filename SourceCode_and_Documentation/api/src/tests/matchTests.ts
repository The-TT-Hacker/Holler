import * as matchService from "../services/matchService";
import * as chatService from "../services/chatService";
import * as eventService from "../services/eventService";
import * as matchGenerator from "../match_generator/match_generator";
import * as constants from "./constants";
import { Match } from "../models/match";

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

/**
 * uids in testing chat
 */
const testiungMatchUids: string[] = [
  "eOi7acKh8aUgLekpAqWl3yR0wB73",
  "OwSHJ1Pz4fgyusJ4GBSf6eTXK8c2",
  "3W6QRVrE40hDR1Y7XwrRzVtezgB3",
  "9M5wTSdrmMQs6e4Exi0yH8na8PU2",
  "VFIRq8KBTQMl3hrzJHNWwBIrCvv1",
  "b2dh4DvgceW8nDSRulKPWKfL0r13"
];

const eventId = "2410098122635775"; // 10th May

export async function matchTest() {
  
  await Promise.all(testiungMatchUids.map(async uid => eventService.addEventInterest(uid, eventId)));

  matchGenerator.generateMatches(100);

}