export interface IHistoryLessonAnalytic {
    id: string,
    history_lesson_id: string,
    created_at:string,
    updated_at: string,
    time_spent: number,
    questions_count: number,
    right_answers_count: number,
}