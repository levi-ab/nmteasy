import { Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../styles";
import ImageQuestion from "../components/questions/ImageQuestion";
import { useState } from "react";
import { QuestionTypes } from "../../utils/contants";
import PressableButton from "../components/common/PressableButton";

type ParamList = {
  Lesson: {
    lessonID: string;
  };
};

const questions = [
  {
    id: 1,
    type: "image",
    text: "Identify the fruit in the image.",
    question_data: ["apple.jpg"],
    right_answer: "Apple",
  },
  {
    id: 2,
    type: "text",
    text: "What is the capital of France?",
    question_data: [],
    right_answer: "Paris",
  },
  {
    id: 3,
    type: "select",
    text: "Choose the correct color for the sky.",
    question_data: [],
    right_answer: "Blue",
  },
  {
    id: 4,
    type: "multipleselect",
    text: "Select the countries in Europe.",
    question_data: [],
    right_answer: ["France", "Germany", "Italy"],
  },
  {
    id: 5,
    type: "match",
    text: "Match the country with its capital.",
    question_data: [
      { country: "USA", capital: "Washington D.C." },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" },
    ],
    right_answer: [
      { country: "USA", capital: "Washington D.C." },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" },
    ],
  },
];

const Lesson = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, "Lesson">>();
  const lessonID: string = route.params.lessonID;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const renderCurrentQuestion = () => {
    const question = questions[currentQuestion];
    switch (question.type) {
      case QuestionTypes.Image:
        return <ImageQuestion question={question} />;
      case QuestionTypes.Match:
        return <ImageQuestion question={question} />;
      case QuestionTypes.MultipleSelect:
        return <ImageQuestion question={question} />;
      case QuestionTypes.Select:
        return <ImageQuestion question={question} />;
      case QuestionTypes.Text:
        return <ImageQuestion question={question} />;
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grays100 }}>
      <Text style={{ color: "white" }}>{lessonID}</Text>
      {renderCurrentQuestion()}
      {currentQuestion !== 0 && <PressableButton
        onPress={() => setCurrentQuestion(currentQuestion - 1)}
        style={{
          backgroundColor: colors.white,
          height: 50,
          width: "100%",
          borderRadius: 20,
        }}
        buttonShadow={colors.grays20}
        textStyle={{
          color: colors.themeSecondary,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
        text="Previous Question"
      />}
      {currentQuestion !== questions.length-1 &&<PressableButton
        onPress={() => setCurrentQuestion(currentQuestion + 1)}
        style={{
          backgroundColor: colors.white,
          height: 50,
          width: "100%",
          borderRadius: 20,
        }}
        buttonShadow={colors.grays20}
        textStyle={{
          color: colors.themeSecondary,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
        text="Next question"
      />}
    </View>
  );
};

export default Lesson;
