import { StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../styles";
import ImageQuestion from "../components/questions/ImageQuestion";
import { useEffect, useState } from "react";
import { QuestionTypes } from "../../utils/contants";
import PressableButton from "../components/common/PressableButton";
import AnswerResultSlideUp from "../components/questions/AnswerResultSlideUp";

type ParamList = {
  Lesson: {
    lessonID: string;
  };
};

export interface IQuestion {
  id: string;
  type: string;
  text: string;
  question_data: Array<any>;
  right_answer: string;
}

const questions: IQuestion[] = [
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
    type: "text",
    text: "What is the capital of France?",
    question_data: [],
    right_answer: "Paris",
  },
  {
    id: "3",
    type: "select",
    text: "Choose the correct color for the sky.",
    question_data: [],
    right_answer: "Blue",
  },
  {
    id: "4",
    type: "multipleselect",
    text: "Select the countries in Europe.",
    question_data: [],
    right_answer: "asdf",
  },
  {
    id: "5",
    type: "match",
    text: "Match the country with its capital.",
    question_data: [
      { country: "USA", capital: "Washington D.C." },
      { country: "Japan", capital: "Tokyo" },
      { country: "Brazil", capital: "Brasília" },
    ],
    right_answer: "asdf",
  },
];

const Lesson = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, "Lesson">>();
  const lessonID: string = route.params.lessonID;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQuestionActive, setNextQuestionActive] = useState(false);
  const [answerResultVisible, setAnswerResultVisible] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(false);
  const lastQuestionFinished = currentQuestionIndex === questions.length - 1;

  const renderCurrentQuestion = () => {
    const question = questions[currentQuestionIndex];
    switch (question.type) {
      case QuestionTypes.Image:
        return (
          <ImageQuestion
            question={question}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
          />
        );
      // case QuestionTypes.Match:
      //   return <ImageQuestion question={question} />;
      // case QuestionTypes.MultipleSelect:
      //   return <ImageQuestion question={question} />;
      // case QuestionTypes.Select:
      //   return <ImageQuestion question={question} />;
      // case QuestionTypes.Text:
      //   return <ImageQuestion question={question} />;
      default:
        return null;
    }
  };

  const handleNextQuestionClicked = () => {
    if (lastQuestionFinished) {
      //last question finishing the lesson
      navigation.navigate("Home");
      return;
    }

    if (answerResultVisible) {
      //answered the question, setting the next question
      setNextQuestionActive(true);
      setAnswerResultVisible(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    setNextQuestionActive(false); //selected the answer, setting check button
    setAnswerResultVisible(true);
  };

  const getTextForNextButton = () => {
    if (lastQuestionFinished) {
      return "Finish the lesson";
    }

    if (!answerResultVisible) {
      return "Check";
    }

    if (isAnswerRight) {
      return "Continue";
    }

    return "Got it";
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grays100 }}>
      <View style={styles.questionContainer}>{renderCurrentQuestion()}</View>
      <View style={styles.buttonContainer}>
        <AnswerResultSlideUp
          isVisible={answerResultVisible}
          isRight={isAnswerRight}
          rightText={`Nice! It is the right answer`}
          wrongText="Ooops that is wrong"
        />
        <PressableButton
          onPress={handleNextQuestionClicked}
          style={{
            backgroundColor:
              !isAnswerRight && answerResultVisible
                ? colors.red
                : colors.themeSecondary,
            height: 50,
            width: "100%",
            borderRadius: 20,
          }}
          disabled={!nextQuestionActive && !answerResultVisible}
          buttonShadow={
            !isAnswerRight && answerResultVisible
              ? colors.redShadow
              : colors.themeSecondary
          }
          textStyle={{
            color: colors.grays80,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
          text={getTextForNextButton()}
        />
      </View>
    </View>
  );
};

export default Lesson;

const styles = StyleSheet.create({
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "80%",
  },
  buttonContainer: {
    paddingHorizontal: 20,
    justifyContent: "flex-end",
    paddingBottom: 30,
    height: "20%",
  },
});
