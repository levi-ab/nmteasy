import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import TextInputWithLabel from "../components/text/TextInputWithLabel";
import { useAuth } from "../data/AuthContext";
import PressableButton from "../components/common/PressableButton";
import { useState } from "react";
import Toast from "react-native-toast-message";
import userService from "../services/userService";
import { ErrorsMap } from "../utils/constants";

const Settings = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [firstName, setFirstName] = useState(user?.first_name ?? "");
  const [lastName, setLastName] = useState(user?.last_name ?? "");

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const handleEdit = () => {
    userService
      .edit(email, username, firstName, lastName, token)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: "SIGN_IN",
            payload: { user: res.user, token: res.token },
          });
        }, 1000);
        showToast("Успішно Змінено", "success");
      })
      .catch((err) => {
        console.error(err);
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
      <ScrollView style={{ flex: 1, backgroundColor: colors.basicGray, padding: 20 }}>
        <Text style={styles.header}>Налаштування</Text>
        <Text style={styles.smallLabel}>Змінюй деталі свого акаунту тут</Text>
        <TextInputWithLabel
          style={{ width: "100%", marginTop: 20 }}
          label={"Ім'я"}
          labelStyle={styles.label}
          textInputStyle={styles.input}
          focusBorderColor={colors.themePrimary}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.first_name}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInputWithLabel
          style={{ width: "100%", marginTop: -10 }}
          label={"Прізвище"}
          labelStyle={styles.label}
          textInputStyle={styles.input}
          focusBorderColor={colors.themePrimary}
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
          labelStyle={styles.label}
          textInputStyle={styles.input}
          focusBorderColor={colors.themePrimary}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInputWithLabel
          style={{ width: "100%", marginTop: 10 }}
          label={"Юзернейм"}
          labelStyle={styles.label}
          textInputStyle={styles.input}
          focusBorderColor={colors.themePrimary}
          notFocusedBorderColor={colors.grays50}
          defaultValue={user?.username}
          onChangeText={(text) => setUsername(text)}
        />

        <PressableButton
          style={{
            height: 50,
            width: "60%",
            borderRadius: 20,
            backgroundColor: colors.themeSecondary,
            marginTop: 20,
          }}
          onPress={handleEdit}
          buttonShadow={colors.themePrimary}
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
  signUpLabel: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.themePrimary,
    fontFamily: "Inter-Black",
  },
  header: {
    fontSize: 22,
    marginBottom: 10,
    color: colors.themePrimary,
    fontFamily: "Inter-Black",
    textAlign: "left",
    width: "100%",
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
    color: colors.themePrimary,
  },
  input: {
    height: 45,
    color: colors.themeSecondary,
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: colors.themePrimary,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
});
