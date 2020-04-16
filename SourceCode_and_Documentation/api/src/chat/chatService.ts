import axios, { AxiosResponse } from 'axios';
import { CreateChatUserRequest, ChatUser, UpdateUserRequest } from './models/ChatUser';
import { CreateConversationRequest, Conversation } from './models/Conversation';
import { SendMessageRequest, Message } from './models/Message';

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

/****************************
 *
 * Chat User API
 *
 ****************************/
// - Should have 1-to-1 mapping with users in Firestore.

/**
 * Creates a new chat user to be able to use the API.
 * If a user with the specified ID already exists, updates their data.
 * Returns true if successful.
 */
export const createChatUser = (newUser: CreateChatUserRequest) => {
  return client
    .put(`/users/${newUser.id}`, {
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

/****************************
 *
 * Conversations API
 *
 ****************************/
// - Should have 1-to-1 relationship with matches in Firestore.

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

/****************************
 *
 * Messages API
 *
 ****************************/

export const getAllMessages = (conversationId: string) => {
  return client
    .get(`conversations/${conversationId}/messages`, {
      params: {
        limit: 1,
      },
    })
    .then((response) => response.data.data as Message[]);
};

export const getLastMessage = (conversationId: string) => {
  return client
    .get(`conversations/${conversationId}/messages`, {
      params: {
        limit: 1,
      },
    })
    .then((response) => response.data.data as Message[]);
};

export const sendMessage = (newMessage: SendMessageRequest) => {
  return client.post(`/conversations/${newMessage.conversationId}/messages`, [
    {
      text: newMessage.text,
      sender: newMessage.senderId,
      type: 'UserMessage',
    },
  ]);
};
