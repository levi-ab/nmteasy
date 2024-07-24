
export enum QuestionTypes {
  Image = "image",
  Text = "text",
  Select = "select",
  Match = "match",
  MatchWithTwoRows = "match_two_answers_rows",
}

export const LetterOptions = [
  "А" ,
  "Б",
  "В",
  "Г",
  "Д"
]

export const StorageUserKey = "nmteasy_user"

interface StringMapType {
  [key: string]: string;
}

export const ErrorsMap: StringMapType = {
  "name is not correct": "Ім'я неправильне",
  "email is not correct": "Пошта неправильна",
  "username is not correct": "Юзернейм неправильний",
  "password must contain 1 uppercase, 1 lowercase, 1 number": "Пароль має мати 1 велику літеру, 1 маленьку літеру, 1 цифру",
  "password must be 8 characters or more": "Пароль має мати 8 символів або більше",
  "user already exists": "Користувач уже існує",
  "email already exists": "Пошта уже існує",
  "username already exists": "Юзернейм уже існує",
  "no user found": "Пароль чи Пошта неправильні"
};

export enum LessonTypes {
  History = "history",
  Ukrainian = "ukrainian",
  Biology = "biology"
}

export const LessonTypesToUkrainianMap: StringMapType = {
  "history": "Історія",
  "ukrainian": "Українська",
  "biology": "Біологія"
}

export const LessonTypesToUkrainianMapWithStupidEnding: StringMapType = {
  "history": "Історії",
  "ukrainian": "Української",
  "biology": "Біології"
}

export const AvailableLessons = [
  LessonTypes.History,
  LessonTypes.Ukrainian,
  LessonTypes.Biology
]

export enum LeagueTypes {
  Wooden = "wooden",
  Bronze = "bronze",
  Silver = "silver",
  Golden = "golden"
}

export const AvailableLeagues = [
  LeagueTypes.Wooden,
  LeagueTypes.Bronze,
  LeagueTypes.Silver,
  LeagueTypes.Golden,
]

export const LeaguesToUkrainianMap: StringMapType = {
  "wooden": "Дерев'яна",
  "bronze": "Мідна",
  "silver": "Срібна",
  "golden": "Золота",
}

export const NULL_UUID = "00000000-0000-0000-0000-000000000000"

export const INFO = "info";
export const ERROR = "error";
export const ANSWER = "answer";
export const QUESTION = "question";
export const NEXT_QUESTION = "next_question";
export const GET_NEXT_QUESTION = "get_next_question";
export const RESULT = "result";
export const FINISHED = "finished";
export const MATCH_FOUND = "match_found";
export const OPPONENT_DISCONNECTED = "opponent_disconnected"
export const NOT_FIRST_TIME = "first_time_user"