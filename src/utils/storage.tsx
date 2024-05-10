import AsyncStorage from "@react-native-async-storage/async-storage";
import { IQuestion } from "../data/models/questions";

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