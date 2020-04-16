import { ChatUserId } from './chatUser';

export type ConversationId = string;
type UnixMilliseconds = number;

export interface Conversation {
  id: ConversationId;
  subject: string;
  participants: ChatUserId[];
  welcomeMessages?: string[];
  custom?: { [name: string]: string };
  createdAt: UnixMilliseconds;
}

export interface CreateConversationRequest {
  id: ConversationId;
  subject: string;
  participants: ChatUserId[];
  welcomeMessages?: string[];
  custom?: { [name: string]: string };
}
