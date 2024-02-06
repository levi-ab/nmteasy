import { IHistoryLessonAnalytic } from "./analytics";

export interface ILesson {
    id: string;
    title: string;
    questions: null;
    proper_title: string;
    history_lesson_analytic: IHistoryLessonAnalytic
}

export interface ILessonByGeneralTitle {
  title: string,
  data: ILesson[];
}