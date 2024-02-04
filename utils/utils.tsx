import { ILessonByGeneralTitle } from "../src/data/models/lessons";
import {
  IQuestion,
  ISingleAnswersQuestion,
  IDoubleAnswersQuestion,
} from "../src/data/models/questions";

export const mapToSingleOrDoubleAnswersQuestion = (
  question: IQuestion
): ISingleAnswersQuestion | IDoubleAnswersQuestion => {
  const parsedAnswers = JSON.parse(question.answers);
  if (question.type === "match_two_answers_rows") {
    const mappedQuestion: IDoubleAnswersQuestion = {
      ...question,
      answers: {
        first_row_answers: parsedAnswers.first_row_answers,
        second_row_answers: parsedAnswers.second_row_answers,
      },
    };

    return mappedQuestion;
  }

  const answersArray = JSON.parse(question.answers);

  const mappedQuestion: ISingleAnswersQuestion = {
    ...question,
    answers: answersArray.map((answer: { type: string; text: string }) => ({
      type: answer.type,
      text: answer.text,
    })),
  };

  return mappedQuestion;
};

export function copyMatrix(matrix: string | any[]) {
  var copy = [];

  for (var i = 0; i < matrix.length; i++) {
    copy[i] = matrix[i].slice();
  }

  return copy;
}

export const isMatrixSolved = (answerKey: string | any[], matrix: any[]) => {
  const flattenedMatrix = matrix.flat();

  // Check if lengths match
  if (answerKey.length !== flattenedMatrix.length) {
    return false;
  }

  // Check if each value in the answer key matches the corresponding value in the matrix
  for (let i = 0; i < answerKey.length; i++) {
    if (answerKey[i] !== flattenedMatrix[i]) {
      return false;
    }
  }

  return true;
};

export const getLessonTitleById = (
  lessonID: string | null,
  historyLessons: ILessonByGeneralTitle[]
): string => {
  let foundTitle = "";
  if (!lessonID || !historyLessons) {
    return "";
  }

  historyLessons.some((lessonGroup) =>
    lessonGroup.data.some((lesson) => {
      if (lesson.id === lessonID) {
        foundTitle = lesson.proper_title;
        return true;
      }
      return false;
    })
  );

  return foundTitle;
};