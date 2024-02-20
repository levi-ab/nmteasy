import { IQuestionAnalytic } from "../data/models/analytics";

const apiURL = process.env.EXPO_PUBLIC_API_URL;
class _analyticsService {
  addLessonAnalytics = (
    token: string,
    lesson_id: string,
    time_spent: number,
    right_answers_count: number,
    questions_count: number,
    questionsAnalytics: IQuestionAnalytic[],
    lessonType: string
  ): Promise<null> => {
    return fetch(`${apiURL}/lessons-analytic/${lessonType}`, {
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
        question_analytics: questionsAnalytics,
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

  addQuestionsAnalytics = (
    token: string,
    questionsAnalytics: IQuestionAnalytic[],
    lessonType: string,
    right_answers_count: number
  ): Promise<null> => {
    return fetch(`${apiURL}/questions-analytic/${lessonType}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        question_analytics: questionsAnalytics,
        right_answers_count: right_answers_count,
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

  getWeeklyAnalytic = (token: string, lessonType: string): Promise<any> => {
    return fetch(`${apiURL}/weekly-analytics/${lessonType}`, {
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
  };
}

const analyticsService = new _analyticsService();
export default analyticsService;
