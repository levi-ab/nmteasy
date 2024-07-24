import { NavigationProp } from "@react-navigation/native";
import { useEffect, useState } from "react";
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
import Toast from "react-native-toast-message";
import GlobalLoader from "../components/common/GlobalLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOT_FIRST_TIME } from "../utils/constants";

const SignIn = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNoScreen, setIsNoScreen] = useState(false);

  const { dispatch } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    setIsNoScreen(true);
    const checkIfFirstTime = async () => {
      try {
        let item = await AsyncStorage.getItem(NOT_FIRST_TIME);
        if (item == "" || item == null) {
          navigation.navigate("Introduction");
        }
      } catch (e) {
        navigation.navigate("Introduction");
      }
    };

    checkIfFirstTime().then((_) => {
      setIsLoading(false);
      setIsNoScreen(false);
    });
  }, []);

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const handleLogin = () => {
    setIsLoading(true);
    userService
      .signIn(email, password)
      .then((res) =>
        dispatch({
          type: "SIGN_IN",
          payload: { user: res.user, token: res.token },
        })
      )
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        showToast("Пароль чи Пошта неправильні", "error");
      });
  };

  return isNoScreen ? (
    <View style={styles.container} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.header}>Увійти в {"NMTEASY"}</Text>
      <TextInputWithLabel
        label={"Пошта"}
        labelStyle={styles.label}
        textInputStyle={styles.input}
        onChangeText={(text) => setEmail(text)}
        focusBorderColor={colors.themePrimary}
        notFocusedBorderColor={colors.grays50}
      />
      <TextInputWithLabel
        label={"Пароль"}
        labelStyle={styles.label}
        textInputStyle={styles.input}
        onChangeText={(text) => setPassword(text)}
        focusBorderColor={colors.themePrimary}
        notFocusedBorderColor={colors.grays50}
        secureTextEntry
      />
      <PressableButton
        style={{
          height: 50,
          width: "80%",
          borderRadius: 20,
          backgroundColor: colors.themePrimary,
          marginTop: 20,
        }}
        onPress={handleLogin}
        buttonShadow={colors.themeSecondary}
        text={"Увійти"}
        textStyle={{
          color: colors.grays80,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      />
      <View style={{ flexDirection: "row", marginTop: 15, gap: 10 }}>
        <Text style={styles.smallLabel}>Ще не маєш aкаунту?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.signUpLabel}>Зареєструватись</Text>
        </TouchableOpacity>
      </View>
      <Toast />
      <GlobalLoader isVisible={isLoading} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.basicGray,
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
    width: "100%",
    fontSize: 25,
    marginBottom: 20,
    marginLeft: 15,
    color: colors.themePrimary,
    fontFamily: "Inter-Black",
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
    color: colors.themePrimary,
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
