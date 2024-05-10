import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Animated, Text, Image } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { colors } from "../styles";
import PressableButton from "./common/PressableButton";
import analyticsService from "../services/analyticsService";
import { useAuth } from "../data/AuthContext";
import LessonsContext from "../data/LessonsContext";
import lessonService from "../services/lessonService";
import { IQuestionAnalytic } from "../data/models/analytics";
import LessonTypeContext from "../data/LessonsTypeContext";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";
import IUser from "../data/models/user";
import GlobalLoader from "./common/GlobalLoader";

interface Props {
  rightAnswersCount: number;
  questionCount: number;
  isVisible: boolean;
  elapsedTime: number;
  lessonID: string;
  questionsAnalytics: IQuestionAnalytic[];
}

const getResultByPercent = (progress: number) => {
  if (progress > 0.4) {
    return "Хороший!";
  }

  if (progress > 0.7) {
    return "Чудовий!";
  }

  if (progress > 0.85) {
    return "Неймовірний!";
  }

  return "Треба ще попрацювати(";
};

const LevelFinished = (props: Props) => {
  const [slideAnim] = useState(new Animated.Value(1));
  const navigation = useNavigation<NavigationProp<any>>();
  const [isLoading, setIsLoading] = useState(false);

  const { lessonType } = useContext(LessonTypeContext);
  const {
    state: { token, user },
    dispatch,
  } = useAuth();
  const { setLessons } = useContext(LessonsContext);

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

  const handleGoHome = () => { //TODO REFACTOR THIS SPAGHETTI SHIT MY EYES HURT READING THIS 
    if (props.lessonID) {
      setIsLoading(true);
      analyticsService
        .addLessonAnalytics(
          token,
          props.lessonID,
          props.elapsedTime,
          props.rightAnswersCount,
          props.questionCount,
          props.questionsAnalytics,
          lessonType
        )
        .then((_) => {
          const updatedUserData = {
            ...user,
            points: (user?.points as number) + props.rightAnswersCount,
          };
          dispatch({
            type: "SIGN_IN",
            payload: { user: updatedUserData as IUser, token: token },
          });
          lessonService
            .getLessons(token, lessonType)
            .then((res) => {
              setLessons(res);
              setIsLoading(false);
              navigation.navigate("Home");
            })
            .catch((err) => {
              console.error(err);
              navigation.navigate("Home");
            });
        })
        .catch((err) => {
          console.error(err);
          navigation.navigate("Home");
          setIsLoading(false);
        });
    } else {
      analyticsService
        .addQuestionsAnalytics(
          token,
          props.questionsAnalytics,
          lessonType,
          props.rightAnswersCount
        )
        .then((_) => {
          const updatedUserData = {
            ...user,
            points: (user?.points as number) + props.rightAnswersCount,
          };
          dispatch({
            type: "SIGN_IN",
            payload: { user: updatedUserData as IUser, token: token },
          });
          lessonService
            .getLessons(token, lessonType)
            .then((res) => {
              setLessons(res);
              setIsLoading(false);
              navigation.navigate("Home");
            })
            .catch((err) => {
              console.error(err);
              navigation.navigate("Home");
            });
        })
        .catch((err) => {
          console.error(err);
          navigation.navigate("Home");
          setIsLoading(false);
        });
    }
  };

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
              {Number(
                (props.rightAnswersCount / props.questionCount) * 100
              ).toFixed(0)}
              %
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
          onPress={() => handleGoHome()}
          text="До уроків"
          style={{
            backgroundColor: getThemePrimaryColor(lessonType),
            height: 50,
            width: "100%",
            borderRadius: 20,
          }}
          buttonShadow={getThemeSecondaryColor(lessonType)}
          textStyle={{
            color: colors.grays80,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
          }}
        />
      </View>
      <GlobalLoader isVisible={isLoading} />
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
