import * as matchService from "../services/matchService";
import * as chatService from "../services/chatService";
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