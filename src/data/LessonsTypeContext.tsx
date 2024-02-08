import { SetStateAction, createContext } from "react";
import { ILessonByGeneralTitle } from "./models/lessons";
import { LessonTypes } from "../utils/constants";

const LessonTypeContext = createContext<{
  lessonType: string;
  setLessonType: React.Dispatch<SetStateAction<string>>;
  lessonTypeSelectorOpen: boolean;
  setLessonTypeSelectorOpen: React.Dispatch<SetStateAction<boolean>>;
}>({
  lessonType: LessonTypes.History,
  setLessonType: () => null,
  lessonTypeSelectorOpen: false,
  setLessonTypeSelectorOpen: () => null
});

export default LessonTypeContext;