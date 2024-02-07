import { IHistoryQuestionAnalytic } from "../data/models/analytics";

const apiURL = process.env.EXPO_PUBLIC_API_URL;
class _analyticsService {
  addHistoryAnalytic = (
    token: string,
    history_lesson_id: string,
    time_spent: number,
    right_answers_count: number,
    questions_count: number,
    questionsAnalytics: IHistoryQuestionAnalytic[]
  ): Promise<null> => {
    return fetch(`${apiURL}/history-lessons/analytic`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        history_lesson_analytic: {
          history_lesson_id: history_lesson_id,
          time_spent: time_spent,
          right_answers_count: right_answers_count,
          questions_count: questions_count,
        },
        history_question_analytics: questionsAnalytics
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
}

const analyticsService = new _analyticsService();
export default analyticsService;
