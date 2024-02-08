export interface ILessonAnalytic {
    id: string,
    lesson_id: string,
    created_at:string,
    updated_at: string,
    time_spent: number,
    questions_count: number,
    right_answers_count: number,
}

export interface IQuestionAnalytic {
    id: string,
    question_id: string,
    created_at:string,
    updated_at: string,
    time_spent: number,
    answered_right: boolean,
    user_id: string
}