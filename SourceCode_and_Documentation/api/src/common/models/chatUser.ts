export type ChatUserId = string;
type UnixMilliseconds = number;

export interface ChatUser {
  id: ChatUserId;
  name: string;
  photoUrl?: string;
  headerPhotoUrl?: string;
  custom?: { [name: string]: string };
  availabilityText?: string;
  locale?: string;
  createdAt: UnixMilliseconds;
}

export interface CreateChatUserRequest {
  id: ChatUserId;
}

export interface UpdateUserRequest {
  name?: string;
  photoUrl?: string;
  custom?: { [name: string]: string };
}
