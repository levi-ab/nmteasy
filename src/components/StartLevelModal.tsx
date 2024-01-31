import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import PressableButton from "./common/PressableButton";
import { useNavigation, NavigationProp  } from "@react-navigation/native";

export interface IStartLevelModal {
    setSelectedLevelID: React.Dispatch<React.SetStateAction<string | null>>
    selectedLevelID: string | null;
}

const StartLevelModal = (props: IStartLevelModal) => {
  const navigation = useNavigation<NavigationProp<any>>();

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
          style={[styles.modalView, { backgroundColor: colors.themeSecondary }]}
        >
          <Text
            style={[
              styles.modalText,
              { color: colors.white, marginBottom: 10 },
            ]}
          >
            Start the lesson!
          </Text>
          <Text style={[styles.textStyle, { marginBottom: 20 }]}>
            I am description
          </Text>
          <PressableButton
            onPress={() =>
              navigation.navigate("Lesson", { lessonID: props.selectedLevelID })
            }
            style={{
              backgroundColor: colors.white,
              height: 50,
              width: "100%",
              borderRadius: 20,
            }}
            buttonShadow={colors.grays20}
            textStyle={{
              color: colors.themeSecondary,
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 16,
            }}
            text="Start the lesson"
          />
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
    fontSize: 18,
    textAlign: "left",
  },
});
