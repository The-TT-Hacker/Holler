import axios from 'axios';
import { CreateChatUserRequest, ChatUser, UpdateUserRequest } from './models/ChatUser';
import { CreateConversationRequest, Conversation } from './models/Conversation';

// - For Messages API (send/get/etc) Front end should call TalkJS directly.
// - All methods throw AxiosError and return JSON data directly if successful.
// - We set the ID for all entities, TalkJS does not generate IDs.

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
// - ChatUser ID will be the same as UID used in our database.

/**
 * Creates a new chat user to be able to use the API.
 * If a user with the specified ID already exists, updates their data.
 * Returns true if successful.
 */
export const createChatUser = (newUser: CreateChatUserRequest) => {
  return client
    .put(`/users/${newUser.id}`, {
      name: newUser.name,
      photoUrl: newUser.photoUrl,
      custom: newUser.custom,
    })
    .then(() => true);
};

/**
 * Returns ChatUser by ID (UID in Firestore) or throws an error if not found.
 */
export const getChatUserById = (uid: string) => {
  return client.get(`/users/${uid}`).then((response) => response.data as ChatUser);
};

/**
 * Updates ChatUser with specified data.
 * Creates the ChatUser if no ChatUser with the specified ID exists.
 */
export const updateUser = (uid: string, update: UpdateUserRequest) => {
  return client.put(`/users/${uid}`, update).then((response) => response.data);
};

/****************************
 *
 * Conversations (chats) API
 *
 ****************************/
// - Should have 1-to-1 relationship with matches in Firestore.
// - Conversation ID will be the same as Match ID in Firestore.

/**
 * Creates a new conversation with the specified deatils.
 * Updates the conversation if one already exists with the specified ID.
 * Returns true on successful creation.
 */
export const createConverstaion = (newConversation: CreateConversationRequest) => {
  return client.put(`/conversations/${newConversation.id}`, newConversation).then(() => true);
};

/**
 * Returns Conversation by ID (should be match ID in Firestore) or throws an error if not found.
 */
export const getConverstaionById = (conversationId: string) => {
  return client.get(`/conversations/${conversationId}`).then((response) => {
    response.data.participants = Object.keys(response.data.participants);
    return response.data as Conversation;
  });
};

/**
 * Adds the specifeid user to the specified conversation.
 * Throws errors if user/conversation do not exist.
 * Returns true when successful.
 */
export const addUserToConversation = (conversationId: string, uidToAdd: string) => {
  return client.put(`/conversations/${conversationId}/participants/${uidToAdd}`).then(() => true);
};

/**
 * Removes the given user ID from the conversation, throws an error if user/conversation do not exist.
 */
export const removeUserFromConversation = async (conversationId: string, uidToRemove: string) => {
  return client
    .delete(`/conversations/${conversationId}/participants/${uidToRemove}`)
    .then(() => true);
};
