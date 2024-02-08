import { SetStateAction, createContext } from "react";
import { ILessonByGeneralTitle } from "./models/lessons";
import { LessonTypes } from "../utils/constants";

const LessonTypeContext = createContext<{
  lessonType: string;
  setLessonType: React.Dispatch<SetStateAction<string>>;
}>({
  lessonType: LessonTypes.History,
  setLessonType: () => null,
});

export default LessonTypeContext;