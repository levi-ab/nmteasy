export interface Message {
    RoomID: string;
    Message: string;
    MessageType: MessageType;
}

export interface FinishedResult {
  UserResult: number;
  OpponentResult: number;
  AnsweredLast: boolean;
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