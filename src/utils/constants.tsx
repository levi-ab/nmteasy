
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

export const AvailableLessons = [
  LessonTypes.History,
  LessonTypes.Ukrainian,
  LessonTypes.Biology
]

export const NULL_UUID = "00000000-0000-0000-0000-000000000000"