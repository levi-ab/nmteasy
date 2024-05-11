import AsyncStorage from "@react-native-async-storage/async-storage";
import { IQuestion } from "../data/models/questions";
import { ILessonByGeneralTitle } from "../data/models/lessons";

export const saveLessonLocally = async (
  lessonTitle: string,
  lessonType: string,
  questions: IQuestion[]
): Promise<boolean> => {
  try {
    await AsyncStorage.setItem(lessonTitle + "|" + lessonType, JSON.stringify(questions));
    return true
  } catch (e) {
    return false;
  }
};

export const handleRemoveLocalLesson = (
  lessonTitle: string,
  setSavedLessons: Function,
  savedLessons: ILessonByGeneralTitle[] | undefined
) => {
  AsyncStorage.removeItem(lessonTitle);
  setSavedLessons(
    savedLessons?.filter((item) => item.data[0].proper_title != lessonTitle)
  );
};