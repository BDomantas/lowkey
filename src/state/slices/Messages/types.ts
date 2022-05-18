export interface Option {
  id: string;
  content: string;
}

export interface MessagesStateExtraFields {
  poll?: {
    question: string;
    options: Option[];
  };
}

export enum ContentType {
  poll = 'poll',
  text = 'text',
}

export type Message = {
  messageId: string;
  channelId: string;
  author: string;
  type: ContentType;
  message: MessageContent;
};

export interface SendMessageParams {
  message: MessageContent;
  channelId: string;
  type: ContentType;
}

export interface PollMessage {
  question: string;
  options: Option[];
  votes: number;
}
export interface MessageContent {
  content: string | PollMessage;
}

export interface PollMessageContent {
  content: PollMessage;
}
export interface Option {
  id: string;
  content: string;
}

export interface SendMessageResult {
  success: boolean;
  message: MessageContent;
  channelId: string;
  type: ContentType;
  author: string;
}

export interface SendVoteParams {
  messageId: string;
  optionId: string;
  channelId: string;
}

// TypeGuard to safetly typecheck message type
export const isPollMessage = (
  message: MessageContent,
): message is PollMessageContent => {
  return (message as PollMessageContent).content.question !== undefined;
};
