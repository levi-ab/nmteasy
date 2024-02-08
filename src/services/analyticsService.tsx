import { IQuestionAnalytic } from "../data/models/analytics";

const apiURL = process.env.EXPO_PUBLIC_API_URL;
class _analyticsService {
  addAnalytic = (
    token: string,
    lesson_id: string,
    time_spent: number,
    right_answers_count: number,
    questions_count: number,
    questionsAnalytics: IQuestionAnalytic[]
  ): Promise<null> => {
    return fetch(`${apiURL}/history-lessons/analytic`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        lesson_analytic: {
          lesson_id: lesson_id,
          time_spent: time_spent,
          right_answers_count: right_answers_count,
          questions_count: questions_count,
        },
        question_analytics: questionsAnalytics
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  };

  getWeeklyAnalytic = (
    token: string
  ): Promise<any> => {
    return fetch(`${apiURL}/weekly-history-analytics`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then((text) => {
        throw new Error(text);
      });
    });
  }
}

const analyticsService = new _analyticsService();
export default analyticsService;
