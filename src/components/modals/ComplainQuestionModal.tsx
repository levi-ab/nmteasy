import {
    ActivityIndicator,
    Animated,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
  } from "react-native";
  import { colors } from "../../styles";
  import { useEffect, useState } from "react";
  import PressableButton from "../common/PressableButton";
  import historyLessonService from "../../services/historyLessonService";
  import { IExplanation } from "../../data/models/questions";
  import { useAuth } from "../../data/AuthContext";
import TextInputWithLabel from "../text/TextInputWithLabel";
import { useKeyboardVisible } from "../../hooks/userKeyboardOpen";
import userService from "../../services/userService";
  
  const ComplainQuestionModal = (props: {
    showComplainModal: boolean;
    setShowComplainModal: Function;
    questionID: string;
    lessonID: string;
    showToast: Function
  }) => {
    const { state: { token } } = useAuth();
    const [complaintText, setComplaintText] = useState("");

    const handleSendComplaint = () => {
      userService.sendComplaint(token, props.lessonID, complaintText, props.questionID, "history")
        .then(res =>  props.showToast("Помилку надіслано! Скоро її вирішимо", "success"))
        .catch(err => props.showToast("Щось пішло не так( Спробуй пізніше", "error"))
      props.setShowComplainModal(false);
    }


    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.showComplainModal}
      >
        <TouchableWithoutFeedback onPress={() => props.setShowComplainModal(false)}>
          <View
            style={[styles.centeredView]} 
          >
            <View style={[styles.modalView]} onStartShouldSetResponder={event => true}>
              <Text style={styles.modalText}>Повідомити про помилку</Text>
              <TextInput
                multiline={true}
                numberOfLines={5}
                style={styles.complaintInput}
                defaultValue={""}
                onChangeText={(text) => setComplaintText(text)}
              />
              <PressableButton
                onPress={handleSendComplaint}
                text="Надіслати"
                style={{
                  backgroundColor: colors.themeSecondary,
                  height: 40,
                  width: "100%",
                  borderRadius: 20,
                  top: 0,
                }}
                buttonShadow={colors.themePrimary}
                textStyle={{
                  color: colors.grays80,
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 18,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  
  export default ComplainQuestionModal;
  
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
      gap: 30,
      height: "60%",
      maxHeight: 300,
      position: "relative",
      flexGrow: 0,
      margin: 20,
      backgroundColor: colors.basicGray,
      borderColor: colors.redShadow,
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
      color: colors.grays20,
      fontWeight: "700",
      width: "100%",
      fontSize: 18,
      textAlign: "center",
      fontFamily: "Inter-Black"
    },
  
    explainingText: {
      fontWeight: "600",
      width: "100%",
      fontSize: 16,
      textAlign: "left",
      color: colors.themeSecondary,
    },
    complaintInput:{
      width: "100%",
      maxHeight: 100,
      padding: 4,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: colors.grays60,
      color: colors.grays20,
      fontSize: 15
    }
  });
  