import { ChatUserId } from './chatUser';
import { UnixMilliseconds, CustomFields } from './chatCommon';

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
