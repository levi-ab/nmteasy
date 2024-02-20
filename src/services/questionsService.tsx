import { IQuestion } from "../data/models/questions";

const apiURL = process.env.EXPO_PUBLIC_API_URL
class _QuestionService {
  getRandomQuestions = (token: string, lessonType: string): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/random-questions/${lessonType}`,{
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

  getMatchQuestions = (token: string, lessonType: string): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/match-questions/${lessonType}`,{
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

  getWrongAnsweredQuestions = (token: string, lessonType: string): Promise<IQuestion[]> => {
    return fetch(
      `${apiURL}/wrong-answer-questions/${lessonType}`,{
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

const questionService = new _QuestionService();
export default questionService;