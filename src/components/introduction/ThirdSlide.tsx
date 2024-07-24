import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PressableButton from "../common/PressableButton";
import { colors } from "../../styles";

const ThirdIntroSlide = ({
  setIntroductionStep,
  left,
}: {
  setIntroductionStep: Function;
  left: number,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: Dimensions.get("window").height + 100,
          width: Dimensions.get("window").width,
          position: "absolute",
          left: left ,
        },
      ]}
    >
      <Text style={styles.header}>
        Система ліг із цікавими нагородами!
      </Text>
      <Image
        source={require("../../assets/leagues.jpg")}
        style={{
          width: 200,
          height: 250,
          marginVertical: 50,
        }}
      />
      <PressableButton
        style={{
          height: 50,
          width: "80%",
          borderRadius: 20,
          backgroundColor: colors.themePrimary,
          marginTop: 20,
        }}
        onPress={() => setIntroductionStep(3)}
        text={"Далі"}
        textStyle={{
          color: colors.grays80,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 16,
        }}
      />
    </Animated.View>
  );
};
export default ThirdIntroSlide;

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
      color: colors.themeSecondary,
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