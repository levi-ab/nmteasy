import { Dimensions, Text, View } from "react-native";
import { IDoubleAnswersQuestion, ISingleAnswersQuestion } from "../../data/models/questions";
import { colors } from "../../styles";
import { QuestionTypes } from "../../utils/constants";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../../utils/themes";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Circle, Line, Svg } from "react-native-svg";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PressableButton from "../common/PressableButton";
import ImageQuestion from "../questions/Image/ImageQuestion";
import MatchQuestion from "../questions/Match/MatchQuestion";
import * as Progress from "react-native-progress";
import MatchTwoRowsQuestion from "../questions/Match/MatchTwoRowsQuestion";
import SelectQuestion from "../questions/Select/SelectQuestion";
import GlobalLoader from "../common/GlobalLoader";

const BattleInProgressView = ({
  timer,
  initialTime,
  currentQuestion,
  setSelectedAnswer,
  handleAnswerPressed,
  currentQuestionLocked,
  lessonType,
  opponentName,
}: {
  timer: number;
  initialTime: number;
  currentQuestion: ISingleAnswersQuestion | IDoubleAnswersQuestion | null;
  setSelectedAnswer: Function;
  handleAnswerPressed: () => void;
  currentQuestionLocked: boolean;
  lessonType: string;
  opponentName: string;
}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return currentQuestion ? (
    <>
      <View style={{ flexDirection: "column", width: "100%" }}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            marginTop: 40,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Svg width="30" height="30" viewBox="0 0 30 30">
              <Circle
                cx="15"
                cy="15"
                r="14"
                stroke={colors.grays50}
                strokeWidth="2.5"
                fill="transparent"
              />
              <Line
                x1="7"
                y1="7"
                x2="23"
                y2="23"
                stroke={colors.grays50}
                strokeWidth="2.5"
              />
              <Line
                x1="23"
                y1="7"
                x2="7"
                y2="23"
                stroke={colors.grays50}
                strokeWidth="2.5"
              />
            </Svg>
          </TouchableOpacity>
          <Progress.Bar
            progress={timer / initialTime}
            width={Dimensions.get("window").width - 80}
            height={15}
          />
        </View>
        <Text
          style={{
            marginTop: 10,
            color: getThemePrimaryColor(lessonType),
            fontSize: 16,
            fontFamily: "Inter-Black",
          }}
        >
          Опонент: {opponentName}
        </Text>
      </View>
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
  ) : (
    <GlobalLoader isVisible={true} />
  );
};

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