import { useContext, useState } from "react";
import { useAuth } from "../data/AuthContext";
import Toast from "react-native-toast-message";
import { colors } from "../styles";
import { FlatList, StyleSheet, Text, TextStyle, View } from "react-native";
import GlobalLoader from "../components/common/GlobalLoader";
import LessonsContext from "../data/LessonsContext";
import { ILesson, ILessonByGeneralTitle } from "../data/models/lessons";
import AnimatedProgressBar from "../components/common/ProgressItem";
import { secondsToTime } from "../utils/utils";
import AnalyticsChart from "../components/analytics/AnalyticsChart";
import { getThemePrimaryColor } from "../utils/themes";
import LessonTypeContext from "../data/LessonsTypeContext";

const Analytics = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const { lessons } = useContext(LessonsContext);
  const { lessonType } = useContext(LessonTypeContext);

  const flattenedLessons: ILesson[] = lessons.reduce(
    (acc: ILesson[], curr: ILessonByGeneralTitle) => {
      acc.push(
        ...curr.data.map((lesson: ILesson) => ({
          id: lesson.id,
          title: lesson.title,
          questions: lesson.questions,
          proper_title: lesson.proper_title,
          lesson_analytic: lesson.lesson_analytic,
        }))
      );
      return acc;
    },
    []
  );

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: colors.basicGray,
          paddingHorizontal: 10,
          marginVertical: 20,
        }}
        ListHeaderComponent={() => (
          <>
            <Text
              style={[
                styles.header,
                { color: getThemePrimaryColor(lessonType) },
              ]}
            >
              Аналітика
            </Text>
            <Text style={styles.smallLabel}>Тут зібраний твій прогрес</Text>
            <View
              style={{
                marginVertical: 25,
                borderBottomColor: colors.grays10,
                borderBottomWidth: StyleSheet.hairlineWidth,
              }}
            />
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={[
                  styles.analyticsBox,
                  { borderColor: getThemePrimaryColor(lessonType) },
                ]}
              >
                <Text style={styles.smallLabel}>Почато Уроків: </Text>
              </View>
              <View
                style={[
                  styles.analyticsBox,
                  {
                    width: "35%",
                    borderColor: getThemePrimaryColor(lessonType),
                  },
                ]}
              >
                <Text style={styles.smallLabel}>
                  {
                    flattenedLessons.filter(
                      (lesson) => lesson.lesson_analytic.time_spent != 0
                    ).length
                  }
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={[
                  styles.analyticsBox,
                  { borderColor: getThemePrimaryColor(lessonType) },
                ]}
              >
                <Text style={styles.smallLabel}>Усього Уроків: </Text>
              </View>
              <View
                style={[
                  styles.analyticsBox,
                  {
                    width: "35%",
                    borderColor: getThemePrimaryColor(lessonType),
                  },
                ]}
              >
                <Text style={styles.smallLabel}>{flattenedLessons.length}</Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={[
                  styles.analyticsBox,
                  { borderColor: getThemePrimaryColor(lessonType) },
                ]}
              >
                <Text style={styles.smallLabel}>Пройдено Уроків: </Text>
              </View>
              <View
                style={[
                  styles.analyticsBox,
                  {
                    width: "35%",
                    borderColor: getThemePrimaryColor(lessonType),
                  },
                ]}
              >
                <Text style={styles.smallLabel}>
                  {
                    flattenedLessons.filter(
                      (lesson) =>
                        lesson.lesson_analytic.right_answers_count ===
                          lesson.lesson_analytic.questions_count &&
                        lesson.lesson_analytic.right_answers_count !== 0
                    ).length
                  }
                </Text>
              </View>
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-around" }}
            >
              <View
                style={[
                  styles.analyticsBox,
                  { borderColor: getThemePrimaryColor(lessonType) },
                ]}
              >
                <Text style={styles.smallLabel}>Часу витрачено: </Text>
              </View>
              <View
                style={[
                  styles.analyticsBox,
                  {
                    width: "35%",
                    borderColor: getThemePrimaryColor(lessonType),
                  },
                ]}
              >
                <Text style={styles.smallLabel}>
                  {secondsToTime(
                    flattenedLessons.reduce(
                      (accumulator, lesson) =>
                        accumulator + lesson.lesson_analytic.time_spent,
                      0
                    )
                  )}
                </Text>
              </View>
            </View>
            <Text
              style={
                [
                  styles.label,
                  { color: getThemePrimaryColor(lessonType) },
                ] as TextStyle
              }
            >
              Статистика питань
            </Text>
            <AnalyticsChart />
          </>
        )}
        data={flattenedLessons}
        renderItem={({ item }) => (
          <View style={styles.lessonProgressBox}>
            <Text style={{ color: colors.grays20 }}>{item.proper_title}</Text>
            <View>
              <AnimatedProgressBar
                progress={
                  item.lesson_analytic.right_answers_count /
                  (item.lesson_analytic.questions_count === 0
                    ? 1
                    : item.lesson_analytic.questions_count)
                }
              />
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <Toast />
      <GlobalLoader isVisible={isLoading} />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  lessonProgressBox: {
    marginTop: 10,
    paddingHorizontal: 10,
    flexDirection: "column",
    gap: 10,
  },
  analyticsBox: {
    flexDirection: "row",
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    width: "60%",
    marginBottom: 10,
  },
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
