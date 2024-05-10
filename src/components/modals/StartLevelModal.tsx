import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import PressableButton from "../common/PressableButton";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useContext } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { getThemeSecondaryColor } from "../../utils/themes";
import GlobalLoader from "../common/GlobalLoader";
import lessonService from "../../services/lessonService";
import { useAuth } from "../../data/AuthContext";
import Toast from "react-native-toast-message";
import { saveLessonLocally } from "../../utils/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface IStartLevelModal {
  setSelectedLevelID: React.Dispatch<React.SetStateAction<string | null>>;
  selectedLevelID: string | null;
  levelTitle: string;
  onButtonPress: () => void;
  questions?: [];
  showSaveLocallyBtn?: boolean;
  showToast?: Function;
}

const StartLevelModal = (props: IStartLevelModal) => {
  const { lessonType } = useContext(LessonTypeContext);
  const {
    state: { token },
    dispatch,
  } = useAuth();

  const handleSaveLessonLocally = () => {
    lessonService
      .getQuestionsByLesson(token, lessonType, props.selectedLevelID as string)
      .then((res) => {
        saveLessonLocally(props.levelTitle, lessonType, res).then((saveRes) => {
          if (saveRes) {
            (props.showToast as Function)("Урок Збережено", "success", "Ви можете переглянути список локальних уроків у налаштуваннях");
            return;
          }

          (props.showToast as Function)("Не вийшло збререгти", "error");
        });
      })
      .catch((err) => (props.showToast as Function)(String(err), "error"));
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.selectedLevelID !== null}
      onRequestClose={() => {
        props.setSelectedLevelID(null);
      }}
    >
      <View
        style={[styles.centeredView]}
        onTouchEnd={() => props.setSelectedLevelID(null)}
      >
        <View
          style={[
            styles.modalView,
            { backgroundColor: getThemeSecondaryColor(lessonType) },
          ]}
        >
          <Text
            style={[
              styles.modalText,
              { color: colors.white, marginBottom: 10 },
            ]}
          >
            {props.levelTitle}
          </Text>
          <PressableButton
            onPress={props.onButtonPress}
            style={{
              backgroundColor: colors.white,
              height: 50,
              width: "100%",
              borderRadius: 20,
            }}
            buttonShadow={colors.grays20}
            textStyle={{
              color: getThemeSecondaryColor(lessonType),
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            text="Почати Урок"
          />
          {props.showSaveLocallyBtn ? (
            <Text style={[styles.smallText]} onPress={handleSaveLessonLocally}>
              Зберегти урок Офлайн
            </Text>
          ) : (
            <View />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default StartLevelModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    paddingHorizontal: 40,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  modalText: {
    fontWeight: "700",
    paddingBottom: 20,
    width: "100%",
    fontSize: 18,
    textAlign: "center",
  },
  smallText: {
    fontWeight: "700",
    marginTop: 20,
    width: "100%",
    fontSize: 16,
    textAlign: "center",
    color: "white",
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 5,
    borderColor: colors.grays20,
  },
});
