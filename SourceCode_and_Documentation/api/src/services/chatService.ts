// Import dependencies
import axios, { AxiosResponse } from 'axios';

// Import services
import * as userService from "./userService";

// Import models
import { CreateChatUserRequest, ChatUser, UpdateUserRequest } from '../models/chatUser';
import { CreateConversationRequest, Conversation } from '../models/chatConversation';
import { SendMessageRequest, Message, LastMessage, TalkJsMessage } from '../models/chatMessage';

// Constants TODO move to json in api/secrets
const APP_ID = 'tvuH4E7J';
const SECRET_KEY = 'sk_test_GnvhfSvDzuJf73GHCDD3SjWZ';

// TalkJs API Service
//  - Users have 1-to-1 mapping with users in Firestore.
//  - Conversation have a 1-to-1 relationship with matches in Firestore.
//  - All methods throw AxiosError and return JSON data directly if successful.
//  - We set the ID for all entities, TalkJS does not auto generate IDs.

const client = axios.create({
  baseURL: `https://api.talkjs.com/v1/${APP_ID}/`,
  headers: {
    Authorization: `Bearer ${SECRET_KEY}`,
    'Content-type': 'application/json',
  },
});

/**
 * Creates a new chat user to be able to use the API.
 * If a user with the specified ID already exists, updates their data.
 * Returns true if successful.
 */
export async function createChatUser(newUser: CreateChatUserRequest): Promise<void> {
  try {
    return await client
      .put(`/users/${newUser.id}`, {
        name: newUser.name,
        custom: newUser.custom,
      });
  } catch (e) {
    throw e;
  }
};

/**
 * Returns ChatUser by ID.
 * Throws an error if not found.
 */
export async function getChatUserById(uid: string): Promise<ChatUser> {
  try {
    return await client.get(`/users/${uid}`).then((response: AxiosResponse) => {
      return {
        id: response.data.id,
        name: response.data.name,
        createdAt: response.data.createdAt
      }
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Updates ChatUser.
 * Creates the ChatUser if no ChatUser exists with the specified ID.
 */
export async function updateUser(uid: string, update: UpdateUserRequest): Promise<void> {
  try {
    return await client.put(`/users/${uid}`, update);
  } catch (e) {
    throw e;
  }
};

/**
 * Creates a new conversation.
 * Updates the conversation if one already exists with the specified ID.
 * Returns true on successful creation.
 */
export async function createConverstaion(newConversation: CreateConversationRequest): Promise<void> {
  try {
    return await client.put(`/conversations/${newConversation.id}`, newConversation);
  } catch (e) {
    throw e;
  }
};

/**
 * Returns Conversation by ID.
 * Throws an error if not found.
 */
export async function getConverstaionById(conversationId: string): Promise<Conversation> {
  try {
    return await client.get(`/conversations/${conversationId}`).then((response: AxiosResponse) => {
      response.data.participants = Object.keys(response.data.participants);
      return {
        id: response.data.id,
        subject: response.data.subject,
        participants: response.data.participants,
        createdAt: response.data.createdAt
      }
    });
  } catch (e) {
    throw e;
  }
};

/**
 * Adds user to the conversation.
 * Throws errors if user/conversation do not exist.
 * Returns true when successful.
 */
export async function addUserToConversation(conversationId: string, uidToAdd: string): Promise<void> {
  try {
    return client.put(`/conversations/${conversationId}/participants/${uidToAdd}`);
  } catch (e) {
    throw e;
  }
};

/**
 * Removes the given user from the conversation.
 * Throws an error if user/conversation do not exist.
 * Returns true when successful.
 */
export async function removeUserFromConversation(conversationId: string, uidToRemove: string): Promise<void> {
  try {
    return await client.delete(`/conversations/${conversationId}/participants/${uidToRemove}`);
  } catch (e) {
    throw e;
  }
};

/**
 * Returns the most recent 100 messages in the given conversation.
 * Empty array if no messages are sent in the conversation yet.
 * if afterMessageId is specified, returns the 100 most recent messages after that message.
 */
export async function getAllMessages(conversationId: string, afterMessageId?: string): Promise<Message[]> {
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
    throw e;
  }
};

/**
 * Returns the most recent message in the conversation (*in an array).
 * Empty array if no messages are sent in the conversation yet.
 * @param conversationId chatId / conversationId
 */
export async function getLastMessage(conversationId: string): Promise<LastMessage> {
  
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
export async function sendMessage(newMessage: SendMessageRequest): Promise<void> {
  try {
    return await client.post(`/conversations/${newMessage.conversationId}/messages`, [
      {
        text: newMessage.text,
        sender: newMessage.senderId,
        type: 'UserMessage',
      },
    ]);
  } catch (e) {
    throw e;
  }
};
