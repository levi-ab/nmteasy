import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import PressableButton from "../components/common/PressableButton";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";
import { useContext, useState } from "react";
import LessonTypeContext from "../data/LessonsTypeContext";
import StartLevelModal from "../components/modals/StartLevelModal";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { IDoubleAnswersQuestion, ISingleAnswersQuestion } from "../data/models/questions";
import questionService from "../services/questionsService";
import { useAuth } from "../data/AuthContext";
import { mapToSingleOrDoubleAnswersQuestion } from "../utils/utils";
import { G, Path, Svg } from "react-native-svg";
import GlobalLoader from "../components/common/GlobalLoader";

const Questions = () => {
    const { lessonType } = useContext(LessonTypeContext);
    const navigation = useNavigation<NavigationProp<any>>();
    const [questions, setQuestions] =
      useState<(ISingleAnswersQuestion | IDoubleAnswersQuestion)[]>();
    const [selectedLevel, setSelectedLevel] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { state: { token } } = useAuth();

    //todo this whole thing is complete bullshit but i am tired and it works so idgaf

    const handleStartRandomQuestionsLesson = () => {
      setIsLoading(true)
      questionService
        .getRandomQuestions(token, lessonType)
        .then((res) => {
          setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
          setIsLoading(false);
          setSelectedLevel("Рандомні 20 питань");
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
    };

    const handleStartMatchQuestionsLesson = () => {
        setIsLoading(true);
        questionService
          .getMatchQuestions(token, lessonType)
          .then((res) => {
            setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
            setIsLoading(false);
            setSelectedLevel("Питання на відповідність");
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
    }

    const handleStartWorkOnMistakes = () => {
        setIsLoading(true);
        questionService
          .getWrongAnsweredQuestions(token, lessonType)
          .then((res) => {
            setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
            setIsLoading(false);
            setSelectedLevel("Робота над помилками");
          })
          .catch((err) => {
            console.error(err);
            setIsLoading(false);
          });
    }

    const handleStartImageQuestionsLesson = () => {
      setIsLoading(true);
      questionService
        .getImageQuestions(token, lessonType)
        .then((res) => {
          setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
          setIsLoading(false);
          setSelectedLevel("Питання з фото");
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
        });
  }

    return (
      <>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "space-between",
            alignItems: "center",
            gap: 50,
            paddingBottom: 60,
          }}
        >
          <StartLevelModal
            setSelectedLevelID={setSelectedLevel}
            selectedLevelID={selectedLevel}
            levelTitle={selectedLevel ?? ""}
            onButtonPress={() =>
              navigation.navigate("Lesson", {
                questions: questions,
              })
            }
          />
          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.lessonLabel}>Робота над помилками</Text>
            <Image
              style={[styles.lessonImage, { marginRight: 30 }]}
              source={require("../assets/work-on-mistake.png")}
            ></Image>
            <PressableButton
              onPress={() => handleStartWorkOnMistakes()}
              text="Почати"
              style={{
                backgroundColor: getThemePrimaryColor(lessonType),
                height: 50,
                width: "80%",
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

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.lessonLabel}>20 Рандомних питань</Text>
            <Image
              style={[styles.lessonImage, { tintColor: "white" }]}
              source={require("../assets/random.png")}
            ></Image>
            <PressableButton
              onPress={() => handleStartRandomQuestionsLesson()}
              text="Почати"
              style={{
                backgroundColor: getThemePrimaryColor(lessonType),
                height: 50,
                width: "80%",
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

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.lessonLabel}>Питання на відповідність</Text>
            <Image
              style={[styles.lessonImage]}
              source={require("../assets/match.png")}
            ></Image>
            <PressableButton
              onPress={() => handleStartMatchQuestionsLesson()}
              text="Почати"
              style={{
                backgroundColor: getThemePrimaryColor(lessonType),
                height: 50,
                width: "80%",
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

          <View style={{ width: "100%", alignItems: "center" }}>
            <Text style={styles.lessonLabel}>Питання з фото</Text>
            <Svg
              style={styles.lessonImage}
              height="200"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0.0 0.0 17.0 17.0"
              width="170"
            >
              <G id="change1_1">
                <Path
                  d="M13,0H0V13H4v4H17V4H13ZM1,12V1H12V4H4v8Zm4-1.4L11.17,16H5ZM12.69,16,10.3,13.91,13,11.18l3,2.55V16ZM16,12.41,13,9.82,9.54,13.25,5,9.27V5H16Z"
                  fill="#ffffff"
                />
                <Path
                  d="M9,9.5a2,2,0,1,0-2-2A2,2,0,0,0,9,9.5Zm0-3a1,1,0,1,1-1,1A1,1,0,0,1,9,6.5Z"
                  fill="#ffffff"
                />
              </G>
            </Svg>
            <PressableButton
              onPress={() => handleStartImageQuestionsLesson()}
              text="Почати"
              style={{
                backgroundColor: getThemePrimaryColor(lessonType),
                height: 50,
                width: "80%",
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
        </ScrollView>
        <GlobalLoader isVisible={isLoading} />
      </>
    );
}   

export default Questions;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.basicGray,
    flexDirection: "column",
  },

  lessonLabel: {
    fontFamily: "Inter-Black",
    fontSize: 18,
    marginBottom: 30,
    color: colors.grays20,
  },

  lessonImage: {
    height: 200,
    width: 200,
    marginBottom: 20,
    objectFit: "contain",
  },
});