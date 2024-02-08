import { IExplanation, IQuestion } from "../data/models/questions";
const apiURL = process.env.EXPO_PUBLIC_API_URL
class _LessonService {
   getQuestionsByLesson = (lessonID: string, token: string): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/history-questions/${lessonID}`,{
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

  getLessons = (token: string): Promise<any> => {
    return fetch(
      `${apiURL}/history-lessons`,{
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

  getExplanationByQuestion = (token: string, questionID: string): Promise<IExplanation> => {
    return fetch(
      `${apiURL}/history-question-explanation/${questionID}`,{
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