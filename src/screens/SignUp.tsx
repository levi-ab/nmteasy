import { NavigationProp } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import userService from "../services/userService";
import { useAuth } from "../data/AuthContext";
import { colors } from "../styles";
import PressableButton from "../components/common/PressableButton";
import TextInputWithLabel from "../components/text/TextInputWithLabel";
import Toast from 'react-native-toast-message';
import { ErrorsMap } from "../utils/constants";

const SignUp = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [focusedElement, setFocusedElement] = useState("");

  const { dispatch } = useAuth();

  const showToast  = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text
    });
  }

  const handleSignUp = () => {
    userService
      .signUp(email, password, firstName, lastName)
      .then((res) => {
        setTimeout(() => {
          dispatch({
            type: "SIGN_IN",
            payload: { user: res.user, token: res.token },
          });
        }, 1000);
        showToast("Успішно Зареєстровано", "success");
      })
      .catch((err) => {
        console.error(err);
        const parsedError = JSON.parse(err.message).error;
        showToast(ErrorsMap[parsedError], "error");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Зареєструватись в NMTEASY</Text>
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <TextInputWithLabel
          style={{ width: "40%" }}
          label={"Ім'я"}
          labelStyle={styles.label}
          textInputStyle={styles.input}
          onChangeText={(text) => setFirstName(text)}
          focusBorderColor={colors.themePrimary}
          notFocusedBorderColor={colors.grays50}
        />
        <TextInputWithLabel
          style={{ width: "50%" }}
          label={"Прізвище"}
          labelStyle={styles.label}
          textInputStyle={styles.input}
          onChangeText={(text) => setLastName(text)}
          focusBorderColor={colors.themePrimary}
          notFocusedBorderColor={colors.grays50}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text style={styles.label}>Пошта</Text>
        <TextInput
          style={[
            styles.input,
            {
              borderColor:
                focusedElement === "Email"
                  ? colors.themePrimary
                  : colors.grays50,
              borderWidth: focusedElement === "Email" ? 2 : 1,
            },
          ]}
          placeholderTextColor={colors.grays50}
          placeholder="Пошта"
          onChangeText={(text) => setEmail(text)}
          onFocus={() => setFocusedElement("Email")}
          onBlur={() => setFocusedElement("")}
        />
      </View>
      <TextInputWithLabel
        style={{ width: "100%" }}
        label={"Пароль"}
        secureTextEntry
        labelStyle={styles.label}
        textInputStyle={styles.input}
        onChangeText={(text) => setPassword(text)}
        focusBorderColor={colors.themePrimary}
        notFocusedBorderColor={colors.grays50}
      />
      <PressableButton
        style={{
          height: 50,
          width: "80%",
          borderRadius: 20,
          backgroundColor: colors.themeSecondary,
          marginTop: 20,
        }}
        onPress={handleSignUp}
        buttonShadow={colors.themePrimary}
        text={"Зареєструватись"}
        textStyle={{
          color: colors.grays80,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      />
      <View style={{ flexDirection: "row", marginTop: 15, gap: 10 }}>
        <Text style={styles.smallLabel}>Уже маєш акаунт?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signUpLabel}>Увійти</Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.basicGray
  },
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
    fontSize: 25,
    marginBottom: 20,
    color: colors.themePrimary,
    fontFamily: "Inter-Black",
    textAlign: "left",
    width: "100%"
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
    color: colors.themePrimary
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
