import { Animated, Dimensions, Image, StyleSheet, Text, View } from "react-native";
import PressableButton from "../common/PressableButton";
import { colors } from "../../styles";

const SecondIntroSlide = ({
  setIntroductionStep,
  bottom,
}: {
  setIntroductionStep: Function;
  bottom: number;
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          height: Dimensions.get("window").height + 100,
          width: Dimensions.get("window").width,
          position: "absolute",
          bottom: bottom,
        },
      ]}
    >
      <Text style={styles.header}>Доступні предмети для вивчення:</Text>
      {/* <Image
        source={{
          uri: "https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnFyY21kZ3lzam5ucnUwZDBzbWR0ZmNzMmgwcmo3b2R0c3oyZDJvMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3owyp2SViuDIGh8YoM/giphy.gif",
        }}
        style={{ width: 200, height: 250, marginBottom: 30 }}
      /> */}
      <Text style={[styles.smallLabel, { backgroundColor: colors.ukrainianThemeSecondary }]}>
        Українська
      </Text>
      <Text
        style={[
          styles.smallLabel,
          {
            color: colors.grays70,
            backgroundColor: colors.historyThemePrimary,
          },
        ]}
      >
        Історія
      </Text>
      <Text
        style={[
          styles.smallLabel,
          {
            color: colors.grays20,
            backgroundColor: colors.themeSecondary,
            marginBottom: 50,
          },
        ]}
      >
        Біологія
      </Text>
      <PressableButton
        style={{
          height: 50,
          width: "80%",
          borderRadius: 20,
          backgroundColor: colors.themeSecondary,
          marginTop: 20,
        }}
        onPress={() => setIntroductionStep(2)}
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
export default SecondIntroSlide;

const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.basicGray,
    },
    smallLabel: {
      marginBottom: 30,
      backgroundColor: colors.grays90,
      padding: 20,
      width: 200,
      textAlign: "center",
      borderRadius: 50,
      fontWeight: "600",
      fontSize: 20,
      color: colors.grays20,
      borderColor: colors.grays70,
      borderWidth: 2,
      fontFamily: "Inter-Black",
    },
    signUpLabel: {
      fontWeight: "400",
      fontSize: 14,
      color: colors.historyThemePrimary,
      fontFamily: "Inter-Black",
    },
    header: {
      width: "100%",
      fontSize: 25,
      marginBottom: 50,
      marginLeft: 15,
      color: colors.themeSecondary,
      fontFamily: "Inter-Black",
    },
    label: {
      fontFamily: "Inter-Black",
      fontWeight: "500",
      color: colors.historyThemePrimary,
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
      backgroundColor: colors.historyThemePrimary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
  });