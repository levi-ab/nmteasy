import { IDoubleAnswersQuestion, ISingleAnswersQuestion } from "../../data/models/questions";
import { colors } from "../../styles";
import { QuestionTypes } from "../../utils/constants";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../../utils/themes";
import PressableButton from "../common/PressableButton";
import ImageQuestion from "../questions/Image/ImageQuestion";
import MatchQuestion from "../questions/Match/MatchQuestion";
import MatchTwoRowsQuestion from "../questions/Match/MatchTwoRowsQuestion";
import SelectQuestion from "../questions/Select/SelectQuestion";
import * as Progress from "react-native-progress";

const BattleInProgressView = ({
  timer,
  initialTime,
  currentQuestion,
  setSelectedAnswer,
  handleAnswerPressed,
  currentQuestionLocked,
  lessonType,
}: {
    timer: number
  initialTime: number
  currentQuestion: ISingleAnswersQuestion | IDoubleAnswersQuestion | null
  setSelectedAnswer: Function
  handleAnswerPressed: () => void
  currentQuestionLocked: boolean
  lessonType: string
}) => (
  <>
    <Progress.Bar progress={timer / initialTime} width={200} height={10} />
    <GetCurrentQuestionElement
      question={currentQuestion}
      setNextQuestionActive={() => {}}
      setIsAnswerRight={() => {}}
      answerResultVisible={false}
      setSelectedAnswer={setSelectedAnswer}
    />
    <PressableButton
      onPress={handleAnswerPressed}
      text={"Відповісти"}
      style={{
        backgroundColor: getThemePrimaryColor(lessonType),
        height: 60,
        width: "60%",
        borderRadius: 20,
      }}
      disabled={currentQuestionLocked}
      buttonShadow={getThemeSecondaryColor(lessonType)}
      textStyle={{
        color: colors.grays80,
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
      }}
    />
  </>
);

export default BattleInProgressView;

const GetCurrentQuestionElement = ({
    question,
    setNextQuestionActive,
    setIsAnswerRight,
    answerResultVisible,
    setSelectedAnswer,
  }: {
    question: IDoubleAnswersQuestion | ISingleAnswersQuestion | null;
    setNextQuestionActive: any;
    setIsAnswerRight: any;
    setSelectedAnswer: any;
    answerResultVisible: any;
  }) => {
    switch (question?.type) {
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
              setSelectedAnswer={setSelectedAnswer}
            />
          );
        return (
          <SelectQuestion
            key={question.id}
            question={question as ISingleAnswersQuestion}
            setNextQuestionActive={setNextQuestionActive}
            setIsAnswerRight={setIsAnswerRight}
            answerResultVisible={answerResultVisible}
            setSelectedAnswer={setSelectedAnswer}
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
      default:
        return null;
    }
  };