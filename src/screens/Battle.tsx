import { useContext, useEffect, useRef, useState } from "react";
import { colors } from "../styles";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";
import LessonTypeContext from "../data/LessonsTypeContext";
import GlobalLoader from "../components/common/GlobalLoader";
import PressableButton from "../components/common/PressableButton";
import { useAuth } from "../data/AuthContext";
import { isLoading } from "expo-font";
import { Message } from "../data/models/battle";
import { ANSWER, ERROR, FINISHED, MATCH_FOUND, QUESTION, QuestionTypes, RESULT } from "../utils/constants";
import Toast from "react-native-toast-message";
import { IDoubleAnswersQuestion, IQuestion, ISingleAnswersQuestion } from "../data/models/questions";
import MatchTwoRowsQuestion from "../components/questions/Match/MatchTwoRowsQuestion";
import ImageQuestion from "../components/questions/Image/ImageQuestion";
import SelectQuestion from "../components/questions/Select/SelectQuestion";
import MatchQuestion from "../components/questions/Match/MatchQuestion";
import { mapToSingleOrDoubleAnswersQuestion } from "../utils/utils";

const Battle = () => {
  const { lessonTypeSelectorOpen, lessonType, setLessonTypeSelectorOpen } =
    useContext(LessonTypeContext);
  const [isBattleLoading, setIsBattleLoading] = useState(false);
  const [currentRoomID, setCurrentRoomID] = useState<string | null>(null);
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<ISingleAnswersQuestion | IDoubleAnswersQuestion | null>(null);
  const [answer, setSelectedAnswer] = useState<string>();

  const {
    state: { user, token },
  } = useAuth();

  useEffect(() => {
    if (!isBattleLoading) {
      if(ws !== null) {
        ws.close();
        setWS(null);
      }
      return
    }

    const wsUrl = "http://192.168.33.36:8008/ws/";

    // Add authorization header to the WebSocket URL yeah ik, will need to change that
    const wsUrlWithAuth = `${wsUrl}/${token}`;

    // Connect to WebSocket
    const socket = new WebSocket(wsUrlWithAuth);

    // WebSocket event listeners
    socket.onopen = () => {
      setWS(socket);
      //sending here are join the queue message
      socket.send('{"messageType": "join_matchmaking", "Message":""}')
      console.log("Joined the queue")
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      handleMessageReceived(event.data)
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setCurrentRoomID(null);
      setCurrentQuestion(null);
      setWS(null);
    };

    return () => socket.close();
  }, [isBattleLoading]);

  const handleFindBattlePressed = () => {
    setIsBattleLoading(!isBattleLoading);
  };

  const handleMessageReceived = (message: string) => {
    const parsedMessage: Message = JSON.parse(message);
    if (parsedMessage.MessageType === MATCH_FOUND) {
      handleMatchFound(parsedMessage);
      return;
    }

    if (parsedMessage.MessageType === ERROR) {
      //  handleErrorSent();
      return;
    }

    if (parsedMessage.MessageType === FINISHED) {
      //  handleGameFinished();
      return;
    }

    if (parsedMessage.MessageType === RESULT) {
      //  handleAnswerResult();
      return;
    }

    if (parsedMessage.MessageType === QUESTION) {
       handleReceivedQuestion(parsedMessage);
      return;
    }
  };

  const handleMatchFound = (parsedMessage: Message) => {
    try {
      showToast("Суперника Знайдено!", "success");
      setCurrentRoomID(parsedMessage.Message);
    } catch (error) {
      showToast("Щось пішло не так", "error");
    }
  };

  const handleReceivedQuestion = (parsedMessage: Message) => {
    try {
      const question = JSON.parse(parsedMessage.Message);
      setCurrentQuestion(mapToSingleOrDoubleAnswersQuestion(question)); 
    } catch (error) {
      showToast("Щось пішло не так", "error");
    }
  }

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const handleAnswerPressed = () => {
    const messageObject = {
      Answer: answer,
      UserID: user?.id,
    };

    const message = {
      Message: JSON.stringify(messageObject),
      RoomID: currentRoomID,
      MessageType: ANSWER,
    };

    console.log(message);
    ws?.send(JSON.stringify(message));
  }

  return (
    <View style={styles.container}>
      {lessonTypeSelectorOpen ? (
        <Pressable
          style={styles.selectorOpenBackGround}
          onPress={() => setLessonTypeSelectorOpen(false)}
        />
      ) : null}
      {currentRoomID ? (
        <>
          <GetCurrentQuestionElement
            question={currentQuestion}
            setNextQuestionActive={() => console.log()}
            setIsAnswerRight={() => console.log()}
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
        <>
          {isBattleLoading ? (
            <ActivityIndicator
              size="large"
              color={getThemePrimaryColor(lessonType)}
              style={{ height: 150 }}
            />
          ) : null}
          <PressableButton
            onPress={handleFindBattlePressed}
            text={isBattleLoading ? "Скасувати" : "Баттл"}
            style={{
              backgroundColor: isBattleLoading
                ? colors.red
                : getThemePrimaryColor(lessonType),
              height: 60,
              width: "60%",
              borderRadius: 20,
            }}
            buttonShadow={
              isBattleLoading
                ? colors.redShadow
                : getThemeSecondaryColor(lessonType)
            }
            textStyle={{
              color: colors.grays80,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          />
        </>
      )}

      <GlobalLoader isVisible={false} />
      <Toast />
    </View>
  );
};

export default Battle;


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
  setSelectedAnswer: any,
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
    // case QuestionTypes.Text:
    //   return <ImageQuestion question={question} />;
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.basicGray,
    padding: 20
  },

  selectorOpenBackGround: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.gray,
    opacity: 0.5,
  },

  notFoundText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
  },
});
