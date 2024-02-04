import { IQuestion } from "../data/models/questions";
const apiURL = process.env.EXPO_PUBLIC_API_URL
class _historyLessonService {
   getQuestionsByLesson = (lessonID: string): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/history-questions/${lessonID}`,{
          method: "GET",
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

  getHistoryLessons = (): Promise<any> => {
    return fetch(
      `${apiURL}/history-lessons`,{
          method: "GET",
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

const historyLessonService = new _historyLessonService();
export default historyLessonService;