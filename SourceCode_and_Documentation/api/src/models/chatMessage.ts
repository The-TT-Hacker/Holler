import { ChatUserId } from './ChatUser';
import { ConversationId } from './chatConversation';
import { UnixMilliseconds } from './chatCommon';

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
