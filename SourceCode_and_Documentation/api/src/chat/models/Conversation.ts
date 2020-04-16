import { UnixMilliseconds, CustomFields } from './common';
import { ChatUserId } from './ChatUser';

export type ConversationId = string;

export interface Conversation {
  id: ConversationId;
  subject: string;
  participants: ChatUserId[];
  custom?: CustomFields;
  createdAt: UnixMilliseconds;
}

export interface CreateConversationRequest {
  id: ConversationId;
  subject: string;
  participants: ChatUserId[];
  custom?: CustomFields;
}

export interface UpdateConversationRequest {
  subject?: string;
  custom?: CustomFields;
}
