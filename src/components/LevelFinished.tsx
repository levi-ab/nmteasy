import React, { useEffect, useState } from "react";
import { View, StyleSheet, Animated, Text, Button, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import Svg, { Defs, G, Path, Rect } from "react-native-svg";
import { colors } from "../styles";
import PressableButton from "./common/PressableButton";

interface Props {
  rightAnswersCount: number;
  questionCount: number;
  isVisible: boolean;
  elapsedTime: number;
}

const getResultByPercent = (progress: number) => {
  if (progress > 0.2) {
    return "Хороший!";
  }

  if (progress > 0.6) {
    return "Чудовий!";
  }

  if (progress > 0.8) {
    return "Неймовірний!";
  }

  return "Треба ще попрацювати(";
};

const LevelFinished = (props: Props) => {
  const [slideAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation<NavigationProp<any>>();

  useEffect(() => {
    if (props.isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [props.isVisible, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.slideUpContainer,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1000], // Adjust this value based on your needs
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/award.png")}
          style={{ width: 200, height: 200 }}
        />
        <View>
          <Text
            style={[
              styles.textStyle,
              { fontSize: 27, textAlign: "center", marginBottom: 20 },
            ]}
          >
            Вітання!
          </Text>
          <Text style={styles.textStyle}>
            Ви пройшли урок за {props.elapsedTime} секунд
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "left" }]}
            >
              Точність:
            </Text>
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "right" }]}
            >
              {Number((props.rightAnswersCount / props.questionCount) * 100).toFixed(0)}%
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "left" }]}
            >
              Правильні відповіді:
            </Text>
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "right" }]}
            >
              {props.rightAnswersCount}/{props.questionCount}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "left" }]}
            >
              Результат:
            </Text>
            <Text
              style={[styles.textStyle, { fontSize: 16, textAlign: "right" }]}
            >
              {getResultByPercent(
                props.rightAnswersCount / props.questionCount
              )}
            </Text>
          </View>
        </View>
        <PressableButton
          onPress={() => navigation.navigate("Home")}
          text="До уроків"
          style={{
            backgroundColor: colors.themeSecondary,
            height: 50,
            width: "100%",
            borderRadius: 20,
          }}
          buttonShadow={colors.themePrimary}
          textStyle={{
            color: colors.grays80,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
          }}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slideUpContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.basicGray,
    flex: 1,
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 4,
    height: "105%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  textStyle: {
    textAlign: "center",
    color: colors.themeSecondary,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default LevelFinished;
