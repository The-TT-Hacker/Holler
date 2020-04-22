import * as chatService from "../services/chatService";

import * as constants from "./constants";

export async function sendMessage() {
  console.log("sending message");
  await chatService.sendMessage({
    senderId: constants.testingChatSenderUid,
    conversationId: constants.chatId,
    text: "Holler World"
  })
}

export async function getLastMessage() {
  console.log("getting last message");
  const lastMessage = await chatService.getLastMessage(constants.chatId);

  return lastMessage;
}