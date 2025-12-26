
export enum ChatSender {
  USER = 'user',
  BOT = 'model'
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: ChatSender;
  timestamp: Date;
  sources?: Array<{
    web?: {
      uri: string;
      title: string;
    }
  }>;
}
