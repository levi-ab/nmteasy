import { ILessonByGeneralTitle } from "../data/models/lessons";
import NetInfo from '@react-native-community/netinfo';
import {
  IQuestion,
  ISingleAnswersQuestion,
  IDoubleAnswersQuestion,
} from "../data/models/questions";

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

export const getLessonTitleById = (
  lessonID: string | null,
  lessons: ILessonByGeneralTitle[]
): string => {
  let foundTitle = "";
  if (!lessonID || !lessons) {
    return "";
  }

  lessons.some((lessonGroup) =>
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

export const secondsToTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = hours > 0 ? hours + 'г ' : '';
  const formattedMinutes = minutes > 0 ? minutes + 'хв ' : '';
  const formattedSeconds = remainingSeconds + 'с';

  return formattedHours + formattedMinutes + formattedSeconds;
}

export const isConnectedToInternet = async (): Promise<boolean | null> => {
  const state = await NetInfo.fetch();
  return state.isConnected;
}

export const mapSavedLessonToRealLesson = (lesson: string): ILessonByGeneralTitle => {
  const title = lesson.split("|")[0];
  const type = lesson.split("|")[1];

  return {
    title: title,
    data: [{
      id: title,
      title: title,
      questions: null,
      proper_title: lesson,
      lesson_analytic: null,
    }],
  }
}