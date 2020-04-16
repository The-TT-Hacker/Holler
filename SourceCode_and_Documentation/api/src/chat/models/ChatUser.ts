import { UnixMilliseconds, CustomFields } from './common';

export type ChatUserId = string;

export interface ChatUser {
  id: ChatUserId;
  custom?: CustomFields;
  createdAt: UnixMilliseconds;
}

export interface CreateChatUserRequest {
  id: ChatUserId;
  custom?: CustomFields;
}

export interface UpdateUserRequest {
  custom?: CustomFields;
}
