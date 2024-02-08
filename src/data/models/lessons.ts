import { ILessonAnalytic } from "./analytics";

export interface ILesson {
    id: string;
    title: string;
    questions: null;
    proper_title: string;
    lesson_analytic: ILessonAnalytic
}

export interface ILessonByGeneralTitle {
  title: string,
  data: ILesson[];
}