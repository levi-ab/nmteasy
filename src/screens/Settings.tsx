import { ScrollView, StyleSheet, View } from "react-native";
import { colors } from "../styles";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import GlobalLoader from "../components/common/GlobalLoader";
import UserSettings from "../components/settings/UserSettings";
import LocalLessonsList from "../components/settings/LocalLessonsList";

const Settings = () => {
  const [isLoading, setIsLoading] = useState(false);

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.basicGray, padding: 20 }}
      >
        <UserSettings
          showToast={showToast}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <LocalLessonsList />
      </ScrollView>
      <Toast />
      <GlobalLoader isVisible={isLoading} />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  smallLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.grays30,
    fontFamily: "Inter-Black",
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    fontFamily: "Inter-Black",
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
  },
  input: {
    height: 45,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
