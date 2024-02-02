export interface IQuestion {
  id: string;
  question_text: string;
  question_image: string;
  answers: string;
  type: string;
  right_answer: string;
  topic: string;
  created_at: string;
  updated_at: string;
}

export interface ISingleAnswersQuestion {
  id: string;
  question_text: string;
  question_image: string;
  answers: Array<IAnswer>;
  type: string;
  right_answer: string;
  topic: string;
  created_at: string;
  updated_at: string;
}

export interface IDoubleAnswersQuestion {
  id: string;
  question_text: string;
  question_image: string;
  answers: {
    first_row_answers: Array<IAnswer>;
    second_row_answers: Array<IAnswer>;
  };
  type: string;
  right_answer: string;
  topic: string;
  created_at: string;
  updated_at: string;
}

export interface IAnswer {
  type: string;
  text: string;
};
