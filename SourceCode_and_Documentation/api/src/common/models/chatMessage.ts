import { ChatUserId } from './ChatUser';
import { ConversationId } from './Conversation';
import { UnixMilliseconds } from './common';

export type MessageId = string;

export interface SendMessageRequest {
  senderId: ChatUserId;
  conversationId: ConversationId;
  text: string;
}

export interface Message {
  id: MessageId;
  senderId: ChatUserId;
  text: string;
  createdAt: UnixMilliseconds;
}
