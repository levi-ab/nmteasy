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

const SignIn = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedElement, setFocusedElement] = useState("");

  const { dispatch } = useAuth();

  const handleLogin = () => {
    userService
      .signIn(email, password)
      .then((res) =>
        dispatch({
          type: "SIGN_IN",
          payload: { user: res.user, token: res.token },
        })
      )
      .catch((err) => console.error(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Увійти в NMTEASY</Text>
      <View>
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
      <View>
        <Text style={styles.label}>Пароль</Text>
        <TextInput
          placeholder="Пароль"
          secureTextEntry
          placeholderTextColor={colors.grays50}
          style={[
            styles.input,
            {
              borderColor:
                focusedElement === "Password"
                  ? colors.themePrimary
                  : colors.grays50,
              borderWidth: focusedElement === "Password" ? 2 : 1,
            },
          ]}
          onChangeText={(text) => setPassword(text)}
          onFocus={() => setFocusedElement("Password")}
          onBlur={() => setFocusedElement("")}
        />
      </View>
      <PressableButton
        style={{
          height: 50,
          width: "80%",
          borderRadius: 20,
          backgroundColor: colors.themeSecondary,
          marginTop: 20,
        }}
        onPress={handleLogin}
        buttonShadow={colors.themePrimary}
        text={"Увійти"}
        textStyle={{
          color: colors.grays80,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      />
      <View style={{ flexDirection: "row", marginTop: 15, gap: 10 }}>
        <Text style={styles.smallLabel}>Ще не маєш акаунту?</Text>
       <TouchableOpacity> 
          <Text style={styles.signUpLabel}>Зареєструватись</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
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
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
    color: colors.themePrimary
  },
  input: {
    width: 300,
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
