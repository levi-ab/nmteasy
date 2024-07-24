import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import userService from "../services/userService";
import { useAuth } from "../data/AuthContext";
import { colors } from "../styles";
import FirstIntroSlide from "../components/introduction/FirstSlide";
import SecondIntroSlide from "../components/introduction/SecondSlide";
import ThirdIntroSlide from "../components/introduction/ThirdSlide";
import FourthIntroStyle from "../components/introduction/FourthSlide";
import FifthIntroSlide from "../components/introduction/FifthSlide";
import GlobalLoader from "../components/common/GlobalLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOT_FIRST_TIME } from "../utils/constants";
const Introduction = ({ navigation }: { navigation: NavigationProp<any> }) => {
  const [bottom] = useState(new Animated.Value(-1000));
  const [top] = useState(new Animated.Value(-1000));
  const [left] = useState(new Animated.Value(1000));
  const [right] = useState(new Animated.Value(1000));
  const [loading, setIsLoading] = useState(false);

  const handlePress = (step: number) => {
    if (step == 0) {
      Animated.timing(right, {
        toValue: 1000,
        duration: 300,
        useNativeDriver: false,
      }).start((_) =>
        Animated.timing(top, {
          toValue: -1000,
          duration: 300,
          useNativeDriver: false,
        }).start((_) =>
          Animated.timing(left, {
            toValue: 1000,
            duration: 400,
            useNativeDriver: false,
          }).start((_) =>
            Animated.timing(bottom, {
              toValue: -1000,
              duration: 400,
              useNativeDriver: false,
            }).start((_) => {
              setIsLoading(true);
              setTimeout(() => {
                navigation.navigate("SignUp");
                AsyncStorage.setItem(NOT_FIRST_TIME, "true");
              }, 300);
            })
          )
        )
      );
    }
    if (step == 1) {
      // Slide down animation
      Animated.timing(bottom, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
    if (step == 2) {
      // Slide down animation
      Animated.timing(left, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }

    if (step == 3) {
      // Slide down animation
      Animated.timing(top, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }

    if (step == 4) {
      // Slide down animation
      Animated.timing(right, {
        toValue: 0,
        duration: 400,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View style={[styles.container]}>
      <FirstIntroSlide setIntroductionStep={() => handlePress(1)} />
      <SecondIntroSlide
        setIntroductionStep={() => handlePress(2)}
        bottom={bottom as unknown as number}
      />
      <ThirdIntroSlide
        setIntroductionStep={() => handlePress(3)}
        left={left as unknown as number}
      />
      <FourthIntroStyle
        setIntroductionStep={() => handlePress(4)}
        top={top as unknown as number}
      />
      <FifthIntroSlide
        setIntroductionStep={() => handlePress(0)}
        right={right as unknown as number}
      />
      <GlobalLoader isVisible={loading} />
    </View>
  );
};

export default Introduction;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    height: "200%",
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
