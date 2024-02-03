import { ILessonByGeneralTitle } from "../models/lessons";
import {
  IQuestion,
  ISingleAnswersQuestion,
  IDoubleAnswersQuestion,
} from "../models/questions";
import { colors } from "../src/styles";

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

export const checkIfMatchQuestionMatrixIsCorrect = (
  matrixState: any[],
  right_answer: string
) => {
  const answerArray = right_answer.split("|").filter(Boolean).map(Number);
  if (
    matrixState[answerArray[0]][answerArray[1]] &&
    matrixState[answerArray[2]][answerArray[3]] &&
    matrixState[answerArray[4]][answerArray[5]] &&
    matrixState[answerArray[6]][answerArray[7]]
  )
    return true;
  return false;
};

export const getUnCheckedFillColorForMatrix = (
  rowIndex: number,
  columnIndex: number,
  right_answer: string,
  answerResultVisible: boolean
) => {
  const answerArray = right_answer.split("|").filter(Boolean).map(Number);

  if (
    answerResultVisible &&
    ((answerArray[0] === rowIndex && answerArray[1] === columnIndex) ||
      (answerArray[2] === rowIndex && answerArray[3] === columnIndex) ||
      (answerArray[4] === rowIndex && answerArray[5] === columnIndex) ||
      (answerArray[6] === rowIndex && answerArray[7] === columnIndex))
  ) {
    return colors.themeSecondary;
  }

  return colors.white;
};

export const getSelectFillColorForMatrix = (
  rowIndex: number,
  columnIndex: number,
  right_answer: string,
  answerResultVisible: boolean,
  matrixState: any
) => {
  const answerArray = right_answer.split("|").filter(Boolean).map(Number);

  const isRight =
    (answerArray[0] === rowIndex && answerArray[1] === columnIndex) ||
    (answerArray[2] === rowIndex && answerArray[3] === columnIndex) ||
    (answerArray[4] === rowIndex && answerArray[5] === columnIndex) ||
    (answerArray[6] === rowIndex && answerArray[7] === columnIndex);

  if (isRight && answerResultVisible) {
    return colors.themeSecondary;
  }

  if (matrixState[rowIndex][columnIndex]) {
    if (answerResultVisible && !isRight) {
      return colors.red;
    }

    return colors.themeSecondary;
  }

  return colors.themeSecondary;
};
