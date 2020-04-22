// Import dependencies
import axios, { AxiosResponse } from 'axios';

// Import services
import * as userService from "./userService";

// Import models
import { CreateChatUserRequest, ChatUser, UpdateUserRequest } from '../models/chatUser';
import { CreateConversationRequest, Conversation } from '../models/chatConversation';
import { SendMessageRequest, Message, LastMessage, MessageId, TalkJsMessage } from '../models/chatMessage';
import { UnixMilliseconds } from '../models/chatCommon';

// - All methods throw AxiosError and return JSON data directly if successful.
// - We set the ID for all entities, TalkJS does not auto generate IDs.

const APP_ID = 'tvuH4E7J';
const SECRET_KEY = 'sk_test_GnvhfSvDzuJf73GHCDD3SjWZ';

const client = axios.create({
  baseURL: `https://api.talkjs.com/v1/${APP_ID}/`,
  headers: {
    Authorization: `Bearer ${SECRET_KEY}`,
    'Content-type': 'application/json',
  },
});

// Chat User API Service
// Users have 1-to-1 mapping with users in Firestore.

/**
 * Creates a new chat user to be able to use the API.
 * If a user with the specified ID already exists, updates their data.
 * Returns true if successful.
 */
export const createChatUser = (newUser: CreateChatUserRequest) => {
  return client
    .put(`/users/${newUser.id}`, {
      name: newUser.name,
      custom: newUser.custom,
    })
    .then(() => true);
};

/**
 * Returns ChatUser by ID.
 * Throws an error if not found.
 */
export const getChatUserById = (uid: string) => {
  return client.get(`/users/${uid}`).then((response: AxiosResponse) => response.data as ChatUser);
};

/**
 * Updates ChatUser.
 * Creates the ChatUser if no ChatUser exists with the specified ID.
 */
export const updateUser = (uid: string, update: UpdateUserRequest) => {
  return client.put(`/users/${uid}`, update).then((response: AxiosResponse) => response.data);
};

// Conversations API
// Has a 1-to-1 relationship with matches in Firestore.

/**
 * Creates a new conversation.
 * Updates the conversation if one already exists with the specified ID.
 * Returns true on successful creation.
 */
export const createConverstaion = (newConversation: CreateConversationRequest) => {
  return client.put(`/conversations/${newConversation.id}`, newConversation).then(() => true);
};

/**
 * Returns Conversation by ID.
 * Throws an error if not found.
 */
export const getConverstaionById = (conversationId: string) => {
  return client.get(`/conversations/${conversationId}`).then((response: AxiosResponse) => {
    response.data.participants = Object.keys(response.data.participants);
    return response.data as Conversation;
  });
};

/**
 * Adds user to the conversation.
 * Throws errors if user/conversation do not exist.
 * Returns true when successful.
 */
export const addUserToConversation = (conversationId: string, uidToAdd: string) => {
  return client.put(`/conversations/${conversationId}/participants/${uidToAdd}`).then(() => true);
};

/**
 * Removes the given user from the conversation.
 * Throws an error if user/conversation do not exist.
 * Returns true when successful.
 */
export const removeUserFromConversation = (conversationId: string, uidToRemove: string) => {
  return client
    .delete(`/conversations/${conversationId}/participants/${uidToRemove}`)
    .then(() => true);
};

// Messages API

/**
 * Returns the most recent 100 messages in the given conversation.
 * Empty array if no messages are sent in the conversation yet.
 * if afterMessageId is specified, returns the 100 most recent messages after that message.
 */
export const getAllMessages = async (conversationId: string, afterMessageId?: string) => {
  try {
    const talkJsMessages = await client
      .get(`conversations/${conversationId}/messages`, {
        params: {
          limit: 100,
          startingAfter: afterMessageId
        },
      }).then((response) => response.data.data as TalkJsMessage[]);
    
    const messages: Message[] = talkJsMessages.map(talkJsMessage => {
      return {
        id: talkJsMessage.id,
        senderId: talkJsMessage.senderId,
        text: talkJsMessage.text,
        createdAt: talkJsMessage.createdAt
      }
    })
    
    return messages;
  } catch (e) {
    console.log(e.response.data);
  }
};

/**
 *
 * Returns the most recent message in the conversation (*in an array).
 * Empty array if no messages are sent in the conversation yet.
 */
export const getLastMessage = async (conversationId: string) => {
  try {
    const lastMessageArray = await client
      .get(`conversations/${conversationId}/messages`, {
        params: {
          limit: 1,
        },
      })
      .then((response) => response.data.data as Message[]);

    if (lastMessageArray.length < 1) return null;

    console.log("lastMessageArray", lastMessageArray);

    const user = await userService.getUser(lastMessageArray[0].senderId);

    const lastMessage: LastMessage = {
      firstName: user.firstName,
      text: lastMessageArray[0].text,
      createdAt: lastMessageArray[0].createdAt
    }
    
    return lastMessage;
  } catch (e) {
    throw e;
  }
  
};

/**
 * Sends the given message on behalf of the user in the specified conversation.
 */
export const sendMessage = (newMessage: SendMessageRequest) => {
  return client.post(`/conversations/${newMessage.conversationId}/messages`, [
    {
      text: newMessage.text,
      sender: newMessage.senderId,
      type: 'UserMessage',
    },
  ]);
};
