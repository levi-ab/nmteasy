import { SetStateAction, createContext } from "react";
import { ILessonByGeneralTitle } from "./models/lessons";

const LessonsContext = createContext<{
  lessons: ILessonByGeneralTitle[];
  setLessons: React.Dispatch<SetStateAction<ILessonByGeneralTitle[]>>;
}>({
  lessons: [],
  setLessons: () => null,
});

export default LessonsContext;