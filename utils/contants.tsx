import { IQuestion } from "../src/screens/Lesson";

export enum QuestionTypes {
  Image = "image",
  Text = "text",
  Select = "select",
  MultipleSelect = "multipleSelect",
  Match = "match",
}

export const questions: IQuestion[] = [
  {
    id: "1",
    type: "image",
    text: "Identify the fruit in the image.",
    question_data: [
      "https://zno.osvita.ua/doc/images/znotest/174/17462/ansd_17462.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17462/ansc_17462.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17462/ansb_17462.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17462/ansa_17462.jpg",
    ],
    right_answer:
      "https://zno.osvita.ua/doc/images/znotest/174/17462/ansd_17462.jpg",
  },
  {
    id: "2",
    type: "image",
    text: "Identify the second fruit in the image.",
    question_data: [
      "https://zno.osvita.ua/doc/images/znotest/174/17453/ansa_17453.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17453/ansb_17453.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17453/ansc_17453.jpg",
      "https://zno.osvita.ua/doc/images/znotest/174/17453/ansd_17453.jpg",
    ],
    right_answer:
      "https://zno.osvita.ua/doc/images/znotest/174/17453/ansd_17453.jpg",
  },
  {
    id: "3",
    type: "select",
    text: `Прочитайте фрагмент історичного документа
    та виконайте завдання 44–46.
    
    «Кошового вибирають безпосередньо із самих козаків. У мирний час турецький уряд видає жалування на курінь по 200 левів,.. а коли бувають у поході, тоді на кожну людину видають жалування по 6 левів на місяць.
    
    Січ і курені є в управлінні кошового та курінних отаманів, і турецький уряд не втручається не тільки до запорожців, а й до поселень, що їм належать, у яких живуть із сім’ями запорожці... Але якщо трапиться кому відлучитися в міста та села турецькі на заробітки, то нерідко тії козаки зазнають від турків утисків...»
    
    Про яку Січ ідеться в уривку документа?`,
    question_data: ["Османської імперії. ", "Німецької імперії. ", "Російської імперії. ", "Австрійської імперії."],
    right_answer: "Османської імперії. ",
  },
  {
    id: "4",
    type: "select",
    text: "Select the countries in Europe.",
    question_data: ["Europer", "afasdf", "asdf233","asfasdflasdfjkhaslkdfhalskdfhkjalsdfhasldfjkshadf"],
    right_answer: "afasdf",
  },
];