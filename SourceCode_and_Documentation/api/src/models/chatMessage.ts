import { ChatUserId } from './chatUser';
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

export interface TalkJsMessage {
  id: MessageId;
  senderId: ChatUserId;
  text: string;
  createdAt: UnixMilliseconds;
}

export interface LastMessage {
  firstName: string;
  text: string;
  createdAt: UnixMilliseconds;
}