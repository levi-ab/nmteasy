import { Modal, StyleSheet, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { colors } from "../styles";
import ImageQuestion from "../components/questions/Image/ImageQuestion";
import { useContext, useEffect, useState } from "react";
import { NULL_UUID, QuestionTypes } from "../utils/constants";
import {
  isConnectedToInternet,
  mapToSingleOrDoubleAnswersQuestion,
} from "../utils/utils";
import PressableButton from "../components/common/PressableButton";
import AnswerResultSlideUp from "../components/questions/AnswerResultSlideUp";
import SelectQuestion from "../components/questions/Select/SelectQuestion";
import LevelFinished from "../components/LevelFinished";
import LessonHeader from "../components/LessonHeader";
import MatchTwoRowsQuestion from "../components/questions/Match/MatchTwoRowsQuestion";
import {
  IDoubleAnswersQuestion,
  ISingleAnswersQuestion,
} from "../data/models/questions";
import lessonService from "../services/lessonService";
import MatchQuestion from "../components/questions/Match/MatchQuestion";
import { useAuth } from "../data/AuthContext";
import GlobalLoader from "../components/common/GlobalLoader";
import ExplainQuestionModal from "../components/modals/ExplainQuestionModal";
import ComplainQuestionModal from "../components/modals/ComplainQuestionModal";
import Toast from "react-native-toast-message";
import { IQuestionAnalytic } from "../data/models/analytics";
import LessonTypeContext from "../data/LessonsTypeContext";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";

type ParamList = {
  Lesson: {
    lessonID: string;
    lessonTitle: string;
    questions: (ISingleAnswersQuestion | IDoubleAnswersQuestion)[];
  };
};

const Lesson = () => {
  const route = useRoute<RouteProp<ParamList, "Lesson">>();
  const lessonID: string = route.params.lessonID;
  const lessonTitle = route.params.lessonID;
  const navigatedQuestions = route.params.questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [nextQuestionActive, setNextQuestionActive] = useState(false);
  const [answerResultVisible, setAnswerResultVisible] = useState(false);
  const [isAnswerRight, setIsAnswerRight] = useState(false);
  const [showLevelFinished, setShowLevelFinished] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [
    elapsedTimeWithoutCurrentQuestion,
    setElapsedTimeWithoutCurrentQuestion,
  ] = useState(0);
  const [rightAnswersCount, setRightAnswersCount] = useState(0);
  const [showExplainModal, setShowExplainModal] = useState(false);
  const [showComplainModal, setShowComplainModal] = useState(false);
  const [questionsAnalytics, setQuestionAnalytics] = useState<
    IQuestionAnalytic[]
  >([]);
  const [questions, setQuestions] = useState<
    (ISingleAnswersQuestion | IDoubleAnswersQuestion)[]
  >(navigatedQuestions ?? []);
  const lastQuestionFinished = currentQuestionIndex === questions.length - 1;
  const {
    state: { token },
  } = useAuth();
  const { lessonType } = useContext(LessonTypeContext);

  useEffect(() => {
    fetchQuestions();
  }, []);

  async function fetchQuestions() {
    if (lessonID && (await isConnectedToInternet())) {
      lessonService
        .getQuestionsByLesson(token, lessonType, lessonID)
        .then((res) =>
          setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion))
        )
        .catch((err) => console.error(err));
      return;
    }

    lessonService
      .getLocalQuestionsByLesson(lessonType, lessonID)
      .then((res) => setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion)))
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    let timerId: NodeJS.Timeout;

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
    if (!question) {
      return <></>;
    }

    switch (question.type) {
      case QuestionTypes.MatchWithTwoRows:
        return (
          <MatchTwoRowsQuestion
            key={question.id}
            question={question as IDoubleAnswersQuestion}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
            answerResultVisible={answerResultVisible}
          />
        );
      case QuestionTypes.Select:
        if (
          (question as ISingleAnswersQuestion).answers.every(
            (answer) => answer.type === QuestionTypes.Image
          )
        )
          return (
            <ImageQuestion
              key={question.id}
              question={question as ISingleAnswersQuestion}
              setNextQuestionActive={setNextQuestionActive}
              setIsAnswerRight={setIsAnswerRight}
              answerResultVisible={answerResultVisible}
            />
          );
        return (
          <SelectQuestion
            key={question.id}
            question={question as ISingleAnswersQuestion}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
            answerResultVisible={answerResultVisible}
          />
        );
      case QuestionTypes.Match:
        return (
          <MatchQuestion
            key={question.id}
            question={question as ISingleAnswersQuestion}
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
      setQuestionAnalytics([
        ...questionsAnalytics,
        {
          id: "",
          question_id: questions[currentQuestionIndex].id,
          created_at: "",
          updated_at: "",
          time_spent: elapsedTime - elapsedTimeWithoutCurrentQuestion,
          answered_right: isAnswerRight,
          user_id: "",
        },
      ]);
      setElapsedTimeWithoutCurrentQuestion(elapsedTime);
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

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grays100, paddingTop: 80 }}>
      {questions?.length ? (
        <>
          <LessonHeader
            progress={(currentQuestionIndex + 1) / questions.length}
          />
          <View style={styles.questionContainer}>
            {renderCurrentQuestion()}
          </View>
          <ExplainQuestionModal
            questionID={questions[currentQuestionIndex].id}
            showExplainModal={showExplainModal}
            setShowExplainModal={setShowExplainModal}
          />
          <ComplainQuestionModal
            showComplainModal={showComplainModal}
            setShowComplainModal={setShowComplainModal}
            questionID={questions[currentQuestionIndex].id}
            lessonID={lessonID}
            showToast={showToast}
          />
          <View style={styles.buttonContainer}>
            <AnswerResultSlideUp
              setShowExplainModal={setShowExplainModal}
              setShowComplainModal={setShowComplainModal}
              isVisible={answerResultVisible}
              isRight={isAnswerRight}
              isFinished={lastQuestionFinished}
              rightText={"Чудово! Це правильно!"}
              wrongText="Отакої( Це неправильно"
            />
            <PressableButton
              onPress={handleNextQuestionClicked}
              style={{
                backgroundColor:
                  !isAnswerRight && answerResultVisible
                    ? colors.red
                    : getThemePrimaryColor(lessonType),
                height: 50,
                width: "100%",
                borderRadius: 20,
              }}
              disabled={!nextQuestionActive && !answerResultVisible}
              buttonShadow={
                !isAnswerRight && answerResultVisible
                  ? colors.redShadow
                  : getThemeSecondaryColor(lessonType)
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
            lessonID={lessonID}
            questionsAnalytics={questionsAnalytics}
          />
        </>
      ) : (
        <GlobalLoader isVisible={true} />
      )}
      <Toast />
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
