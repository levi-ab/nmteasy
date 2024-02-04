export interface ILesson {
    id: string;
    title: string;
    questions: null;
    proper_title: string;
}

export interface ILessonByGeneralTitle {
  title: string,
  data: ILesson[];
}