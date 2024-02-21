import {
  ActivityIndicator,
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../styles";
import { useContext, useEffect, useState } from "react";
import PressableButton from "../common/PressableButton";
import LessonService from "../../services/lessonService";
import { IExplanation } from "../../data/models/questions";
import { useAuth } from "../../data/AuthContext";
import LessonTypeContext from "../../data/LessonsTypeContext";

const ExplainQuestionModal = (props: {
  showExplainModal: boolean;
  setShowExplainModal: Function;
  questionID: string;
}) => {
  const [answerLoading, setAnswerLoading] = useState(false);
  const [explanation, setExplanation] = useState<IExplanation | null>(null)
  const { state: { token } } = useAuth();
  const { lessonType } = useContext(LessonTypeContext);

  useEffect(() => {
    if(props.showExplainModal){
        setExplanation(null);
        // setAnswerLoading(true);
        LessonService.getExplanationByQuestion(token, props.questionID, lessonType)
          .then(res =>{ setExplanation(res); })
          .catch(err => {console.error(err); })
    }
  }, [props.questionID, props.showExplainModal]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.showExplainModal}
    >
      <View
        style={[styles.centeredView]}
        onTouchEnd={() => props.setShowExplainModal(false)}
      >
        <View style={[styles.modalView]}>
          {answerLoading ? (
            <View
              style={{ width: "100%", height: "85%", justifyContent: "center" }}
            >
              <ActivityIndicator size="large" color={colors.themePrimary} />
            </View>
          ) : (
            <ScrollView style={{ width: "100%", marginBottom: 20 }}>
              <Text style={[styles.explainingText]}>
                {explanation?.explanation?.length 
                  ? explanation.explanation
                  : "Пояснення до цього питання не знайдено(("
                }
              </Text>
            </ScrollView>
          )}
          <PressableButton
            onPress={() => props.setShowExplainModal(false)}
            text="Далі"
            style={{
              backgroundColor: colors.themePrimary,
              height: 40,
              width: "100%",
              borderRadius: 20,
            }}
            buttonShadow={colors.themeSecondary}
            textStyle={{
              color: colors.grays80,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 18,
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ExplainQuestionModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 40,
  },
  modalView: {
    alignItems: "center",
    height: "60%",
    position: "relative",
    flexGrow: 0,
    margin: 20,
    backgroundColor: colors.basicGray,
    borderColor: colors.themeSecondary,
    borderWidth: 2,
    borderRadius: 20,
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontWeight: "700",
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },

  explainingText: {
    fontWeight: "600",
    width: "100%",
    fontSize: 16,
    textAlign: "left",
    color: colors.themeSecondary,
  },
});
