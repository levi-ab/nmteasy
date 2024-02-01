import { StyleSheet, Text, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../styles";
import ImageQuestion from "../components/questions/Image/ImageQuestion";
import { useEffect, useState } from "react";
import { QuestionTypes, questions } from "../../utils/contants";
import PressableButton from "../components/common/PressableButton";
import AnswerResultSlideUp from "../components/questions/AnswerResultSlideUp";
import SelectQuestion from "../components/questions/Select/SelectQuestion";
import LevelFinished from "../components/LevelFinished";
import LessonHeader from "../components/LessonHeader";

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

const Lesson = ({ navigation }) => {
  const route = useRoute<RouteProp<ParamList, "Lesson">>();
  const lessonID: string = route.params.lessonID;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQuestionActive, setNextQuestionActive] = useState(false);
  const [answerResultVisible, setAnswerResultVisible] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(false);
  const [showLevelFinished, setShowLevelFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const lastQuestionFinished = currentQuestionIndex === questions.length - 1;

  useEffect(() => {
    let timerId;

    if (!showLevelFinished) {
      timerId = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [showLevelFinished]);

  const renderCurrentQuestion = () => {
    const question = questions[currentQuestionIndex];
    switch (question.type) {
      case QuestionTypes.Image:
        return (
          <ImageQuestion
            question={question}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
            answerResultVisible={answerResultVisible}
          />
        );
      // case QuestionTypes.Match:
      //   return <ImageQuestion question={question} />;
      // case QuestionTypes.MultipleSelect:
      //   return <ImageQuestion question={question} />;
      case QuestionTypes.Select:
        return (
          <SelectQuestion
            question={question}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
            answerResultVisible={answerResultVisible}
          />
        );
      // case QuestionTypes.Text:
      //   return <ImageQuestion question={question} />;
      default:
        return null;
    }
  };

  const handleNextQuestionClicked = () => {
    if (lastQuestionFinished && nextQuestionActive === false) {
      setShowLevelFinished(true);
      return;
    }

    if (lastQuestionFinished) {
      setNextQuestionActive(false); //selected the answer, setting check button
      setAnswerResultVisible(true);
      if (isAnswerRight) {
        setRightAnswersCount(
          (prevRightAnswersCount) => prevRightAnswersCount + 1
        );
      }
      return;
    }

    if (answerResultVisible) {
      //answered the question, setting the next question
      setNextQuestionActive(false);
      setAnswerResultVisible(false);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      return;
    }

    setNextQuestionActive(false); //selected the answer, setting check button
    setAnswerResultVisible(true);
    if (isAnswerRight) {
      setRightAnswersCount(
        (prevRightAnswersCount) => prevRightAnswersCount + 1
      );
    }
  };

  const getTextForNextButton = () => {
    if (lastQuestionFinished) {
      return "Завершити урок";
    }

    if (!answerResultVisible) {
      return "Перевірити";
    }

    if (isAnswerRight) {
      return "Наступне питання!";
    }

    return "Йой!";
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grays100, paddingTop: 80 }}>
      <LessonHeader progress={(currentQuestionIndex + 1) / questions.length} />
      <View style={styles.questionContainer}>{renderCurrentQuestion()}</View>
      <View style={styles.buttonContainer}>
        <AnswerResultSlideUp
          isVisible={answerResultVisible}
          isRight={isAnswerRight}
          isFinished={lastQuestionFinished}
          rightText={"Чудово! Це правильна відповідь"}
          wrongText="Отакої( Це неправильно"
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
              : colors.themePrimary
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
      <LevelFinished
        isVisible={showLevelFinished}
        elapsedTime={elapsedTime}
        rightAnswersCount={rightAnswersCount}
        questionCount={questions.length}
      />
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
