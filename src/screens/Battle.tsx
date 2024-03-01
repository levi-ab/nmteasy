import { useContext, useEffect, useState } from "react";
import { colors } from "../styles";
import {
  StyleSheet,
  View,
} from "react-native";
import LessonTypeContext from "../data/LessonsTypeContext";
import GlobalLoader from "../components/common/GlobalLoader";
import { useAuth } from "../data/AuthContext";
import { Message } from "../data/models/battle";
import {
  ANSWER,
  ERROR,
  FINISHED,
  MATCH_FOUND,
  QUESTION,
  RESULT,
} from "../utils/constants";
import Toast from "react-native-toast-message";
import {
  IDoubleAnswersQuestion,
  ISingleAnswersQuestion,
} from "../data/models/questions";
import { mapToSingleOrDoubleAnswersQuestion } from "../utils/utils";
import BattleNotStartedView from "../components/battle/BattleNotStartedView";
import BattleInProgressView from "../components/battle/BattleInProgressView";
import BattleFinishedView from "../components/battle/BattleFinishedView";

const Battle = () => {
  const { lessonTypeSelectorOpen, lessonType } = useContext(LessonTypeContext);
  const [isBattleLoading, setIsBattleLoading] = useState(false);
  const [battleFinished, setBattleFinished] = useState(false);
  const [currentQuestionLocked, setCurrentQuestionLocked] = useState(false);
  const [currentRoomID, setCurrentRoomID] = useState<string | null>(null);
  const [opponentName, setOpponentName] = useState<string>("")
  const [ws, setWS] = useState<WebSocket | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<
    ISingleAnswersQuestion | IDoubleAnswersQuestion | null
  >(null);
  const [answer, setSelectedAnswer] = useState<string>();
  const [userRightAnswerCount, setUserRightAnswerCount] = useState<number>(0);
  const [opponentRightAnswerCount, setOpponentRightAnswerCount] = useState<number>(0);

  const initialTime = 60;
  const [timer, setTimer] = useState(initialTime);

  const {
    state: { user, token },
  } = useAuth();

  useEffect(() => {
    // Reset the timer when currentQuestion changes
    let interval: NodeJS.Timeout;

    if (currentQuestion != null) {
      setTimer(initialTime); // Set initial timer value

      // Start the timer
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1 && user?.id === currentRoomID?.slice(0, 36)) {
            //cuz only one user can skip and this way we assign it randomly
            console.log("skipping question");
            ws?.send(
              `{"messageType": "skip_question", "Message":"", "RoomID": "${currentRoomID}"}`
            );
          }
          return prevTimer > 0 ? prevTimer - 1 : 0; // Update the timer value
        });
      }, 1000);
    }
    // Clean up the interval on component unmount or when currentQuestion changes
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestion]);

  useEffect(() => {
    if (!isBattleLoading) {
      if (ws !== null) {
        ws.close();
        setWS(null);
      }
      return;
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
      socket.send('{"messageType": "join_matchmaking", "Message":""}');
      console.log("Joined the queue");
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      handleMessageReceived(event.data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
      setCurrentRoomID(null);
      setIsBattleLoading(false);
      setCurrentQuestion(null);
    };

    return () => socket.close();
  }, [isBattleLoading]);

  useEffect(() => {
    const interval = setInterval(() => { //unlocking ability to answer every 10 seconds
      if (currentQuestionLocked) {
        setCurrentQuestionLocked(false);
      }
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionLocked]);

  const handleFindBattlePressed = () => {
    setIsBattleLoading(!isBattleLoading);
  };

  const handleMessageReceived = (message: string) => {
    let parsedMessage: Message | null = null;
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      showToast("Щось пішло не так", "error");
      console.error("Could not answer:", error);
    }

    if (parsedMessage?.MessageType === MATCH_FOUND) {
      handleMatchFound(parsedMessage);
      return;
    }

    if (parsedMessage?.MessageType === ERROR) {
      //  handleErrorSent();
      return;
    }

    if (parsedMessage?.MessageType === FINISHED) {
      handleGameFinished(parsedMessage);
      return;
    }

    if (parsedMessage?.MessageType === RESULT) {
      handleAnswerResult(parsedMessage);
      return;
    }

    if (parsedMessage?.MessageType === QUESTION) {
      handleReceivedQuestion(parsedMessage);
      return;
    }
  };

  const handleGameFinished = (parsedMessage: Message) => {
    try {
      const finishedResult: {UserResult: number, OpponentResult: number} = JSON.parse(parsedMessage.Message);
      setUserRightAnswerCount(finishedResult.UserResult);
      setOpponentRightAnswerCount(finishedResult.OpponentResult);
      setBattleFinished(true);
    } catch (error) {
      showToast("Щось пішло не так", "error");
    }
  }

  const handleMatchFound = (parsedMessage: Message) => {
    try {
      showToast("Суперника Знайдено!", "success");
      setOpponentName(parsedMessage.Message)
      setCurrentRoomID(parsedMessage.RoomID);
    } catch (error) {
      showToast("Щось пішло не так", "error");
    }
  };

  const handleReceivedQuestion = (parsedMessage: Message) => {
    try {
      const question = JSON.parse(parsedMessage.Message);
      setCurrentQuestion(mapToSingleOrDoubleAnswersQuestion(question));
      setCurrentQuestionLocked(false);
    } catch (error) {
      showToast("Щось пішло не так", "error");
    }
  };

  const handleAnswerPressed = () => {
    try {
      const messageObject = {
        Answer: answer,
        UserID: user?.id,
      };

      const message = {
        Message: JSON.stringify(messageObject),
        RoomID: currentRoomID,
        MessageType: ANSWER,
      };

      ws?.send(JSON.stringify(message));
    } catch (error) {
      showToast("Щось пішло не так(", "error");
      console.error("Could not answer:", error);
    }
  };

  const handleAnswerResult = (message: Message) => {
    if (message.Message === "correct") {
      showToast("Правильна відповідь", "success");
      return;
    }

    if (message.Message === "wrong") {
      setCurrentQuestionLocked(true);
      showToast("Неправильна відповідь", "error");
      return;
    }

    if (message.Message === "other_answered") {
      showToast("Суперник відповів правильно", "info");
      return;
    }
  };

  const showToast = (text: string, type: "success" | "error" | "info") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const renderBattleView = (battleFinished: boolean) => {
    if(battleFinished) {
      return (
        <BattleFinishedView
          opponentName={opponentName }
          userRightAnswerCount={userRightAnswerCount}
          opponentRightAnswerCount={opponentRightAnswerCount}
        />
      );
    }

    return (
      <BattleInProgressView
        timer={timer}
        initialTime={initialTime}
        setSelectedAnswer={setSelectedAnswer}
        currentQuestion={currentQuestion}
        handleAnswerPressed={handleAnswerPressed}
        currentQuestionLocked={currentQuestionLocked}
        lessonType={lessonType}
        opponentName={opponentName}
      />
    );
  }

  return (
    <View style={styles.container}>
      {currentRoomID ? (
        renderBattleView(battleFinished)
      ) : (
        <BattleNotStartedView
          lessonType={lessonType}
          isBattleLoading={isBattleLoading}
          handleFindBattlePressed={handleFindBattlePressed}
        />
      )}
      <GlobalLoader isVisible={false} />
      <Toast />
    </View>
  );
};

export default Battle;


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: colors.basicGray,
    padding: 20,
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
