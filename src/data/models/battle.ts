export interface Message {
    RoomID: string;
    Message: string;
    MessageType: MessageType;
}

export type MessageType =
  | "info"
  | "error"
  | "answer"
  | "question"
  | "next_question"
  | "get_next_question"
  | "result"
  | "finished"
  | "match_found"
  | "opponent_disconnected"