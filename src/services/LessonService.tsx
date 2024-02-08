import { IExplanation, IQuestion } from "../data/models/questions";
import { LessonTypes } from "../utils/constants";
const apiURL = process.env.EXPO_PUBLIC_API_URL
class _LessonService {
   getQuestionsByLesson = (token: string, lessonType: string, lessonID: string,): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/questions/${lessonType}/${lessonID}`,{
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          }
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  getLessons = (token: string, lessonType: string): Promise<any> => {
    return fetch(
      `${apiURL}/lessons/${lessonType}`,{
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          }
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  getExplanationByQuestion = (token: string, questionID: string, lessonType: string): Promise<IExplanation> => {
    return fetch(
      `${apiURL}/question-explanation/${lessonType}/${questionID}`,{
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          }
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };
}

const LessonService = new _LessonService();
export default LessonService;