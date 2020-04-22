import { UnixMilliseconds, CustomFields } from './chatCommon';

export type ChatUserId = string;

export interface ChatUser {
  id: ChatUserId;
  name: string;
  createdAt: UnixMilliseconds;
}

export interface CreateChatUserRequest {
  id: ChatUserId;
  name: string;
  custom?: CustomFields;
}

export interface UpdateUserRequest {
  name?: string;
  custom?: CustomFields;
}
