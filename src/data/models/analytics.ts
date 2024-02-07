export interface IHistoryLessonAnalytic {
    id: string,
    history_lesson_id: string,
    created_at:string,
    updated_at: string,
    time_spent: number,
    questions_count: number,
    right_answers_count: number,
}

export interface IHistoryQuestionAnalytic {
    id: string,
    history_question_id: string,
    created_at:string,
    updated_at: string,
    time_spent: number,
    answered_right: boolean,
    user_id: string
}