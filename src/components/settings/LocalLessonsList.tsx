import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getThemePrimaryColor } from "../../utils/themes";
import { useContext, useEffect, useState } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { colors } from "../../styles";
import lessonService from "../../services/lessonService";
import { mapSavedLessonToRealLesson } from "../../utils/utils";
import { ILessonByGeneralTitle } from "../../data/models/lessons";
import { Circle, Line, Svg } from "react-native-svg";
import NothingFound from "../common/NothingFound";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { handleRemoveLocalLesson } from "../../utils/storage";

const LocalLessonsList = () => {
    const { lessonType } = useContext(LessonTypeContext);
    const [savedLessons, setSavedLessons] = useState<ILessonByGeneralTitle[]>();
  const navigation = useNavigation<NavigationProp<any>>();


    useEffect(() => {
      lessonService.getLocalLessonsKeys(lessonType).then((res) => {
        setSavedLessons(
          res.map((item: string) => mapSavedLessonToRealLesson(item))
        );
      });
    }, []);

    const handleGoToLesson = (title: string) => {
      navigation.navigate("Home", {
        lessonTitle: title,
      });
    };

    return (
      <View style={{ marginVertical: 30, paddingBottom: 50 }}>
        <Text
          style={[styles.header, { color: getThemePrimaryColor(lessonType) }]}
        >
          Збережені Уроки
        </Text>
        <Text style={styles.smallLabel}>Редагуй уроки доступні Офлайн тут</Text>
        {savedLessons?.length ? (
          savedLessons?.map((lesson) => (
            <View
              key={lesson.title}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 10,
                borderWidth: 2,
                padding: 5,
                borderRadius: 10,
                borderColor: colors.grays70,
              }}
            >
              <TouchableOpacity onPress={() => handleGoToLesson(lesson.title)}>
                <Text style={styles.buttonText} key={lesson.title}>
                  {lesson.title}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  handleRemoveLocalLesson(
                    lesson.data[0].proper_title,
                    setSavedLessons,
                    savedLessons
                  )
                }
              >
                <Svg width="30" height="30" viewBox="0 0 30 30">
                  <Circle
                    cx="15"
                    cy="15"
                    r="14"
                    stroke={colors.red}
                    strokeWidth="2.5"
                    fill="transparent"
                  />
                  <Line
                    x1="7"
                    y1="7"
                    x2="23"
                    y2="23"
                    stroke={colors.red}
                    strokeWidth="2.5"
                  />
                  <Line
                    x1="23"
                    y1="7"
                    x2="7"
                    y2="23"
                    stroke={colors.red}
                    strokeWidth="2.5"
                  />
                </Svg>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <NothingFound width={120} height={120} marginTop={30} />
        )}
      </View>
    );
}

export default LocalLessonsList;

const styles = StyleSheet.create({

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
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      borderRadius: 10,
    },
    button: {
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      textAlign: "left",
      color: "white",
      maxWidth: "90%"
    },
  });