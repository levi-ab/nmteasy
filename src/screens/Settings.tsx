import { ScrollView, StyleSheet, Text, TextStyle, View } from "react-native";
import { colors } from "../styles";
import TextInputWithLabel from "../components/text/TextInputWithLabel";
import { useAuth } from "../data/AuthContext";
import PressableButton from "../components/common/PressableButton";
import { useContext, useState } from "react";
import Toast from "react-native-toast-message";
import userService from "../services/userService";
import { ErrorsMap } from "../utils/constants";
import GlobalLoader from "../components/common/GlobalLoader";
import LessonTypeContext from "../data/LessonsTypeContext";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";

const Settings = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const { lessonType } = useContext(LessonTypeContext);


  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const handleEdit = () => {
    setIsLoading(true);
    userService
      .edit(email, username, firstName, lastName, token)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: "SIGN_IN",
            payload: { user: res.user, token: res.token },
          });
        }, 1000);
        setIsLoading(false);
        showToast("Успішно Змінено", "success");
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        const parsedError = JSON.parse(err.message).error;
        showToast(ErrorsMap[parsedError], "error");
      });
  };

  const isEditDisabled =
    user?.first_name === firstName &&
    user?.last_name === lastName &&
    user?.username === username &&
    user?.email === email;

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.basicGray, padding: 20 }}
      >
        <Text
          style={[styles.header, { color: getThemePrimaryColor(lessonType) }]}
        >
          Налаштування
        </Text>
        <Text style={styles.smallLabel}>Змінюй деталі свого акаунту тут</Text>
        <TextInputWithLabel
          style={{ width: "100%", marginTop: 20 }}
          label={"Ім'я"}
          labelStyle={
            [
              styles.label,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          textInputStyle={
            [
              styles.input,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          focusBorderColor={getThemePrimaryColor(lessonType)}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.first_name}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInputWithLabel
          style={{ width: "100%", marginTop: -10 }}
          label={"Прізвище"}
          labelStyle={
            [
              styles.label,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          textInputStyle={
            [
              styles.input,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          focusBorderColor={getThemePrimaryColor(lessonType)}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.last_name}
          onChangeText={(text) => setLastName(text)}
        />
        <View
          style={{
            marginVertical: 25,
            borderBottomColor: colors.grays10,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <TextInputWithLabel
          style={{ width: "100%", marginTop: 10 }}
          label={"Пошта"}
          labelStyle={
            [
              styles.label,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          textInputStyle={
            [
              styles.input,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          focusBorderColor={getThemePrimaryColor(lessonType)}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInputWithLabel
          style={{ width: "100%", marginTop: 10 }}
          label={"Юзернейм"}
          labelStyle={
            [
              styles.label,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          textInputStyle={
            [
              styles.input,
              { color: getThemePrimaryColor(lessonType) },
            ] as TextStyle
          }
          focusBorderColor={getThemePrimaryColor(lessonType)}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.username}
          onChangeText={(text) => setUsername(text)}
        />

        <PressableButton
          style={{
            height: 50,
            width: "60%",
            borderRadius: 20,
            backgroundColor: getThemePrimaryColor(lessonType),
            marginTop: 20,
          }}
          onPress={handleEdit}
          buttonShadow={getThemeSecondaryColor(lessonType)}
          text={"Зберегти"}
          disabled={isEditDisabled}
          textStyle={{
            color: colors.grays80,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 16,
          }}
        />
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
