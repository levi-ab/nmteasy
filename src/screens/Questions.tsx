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

const Questions = () => {
    const { lessonType } = useContext(LessonTypeContext);
    const navigation = useNavigation<NavigationProp<any>>();
    const [questions, setQuestions] =
      useState<(ISingleAnswersQuestion | IDoubleAnswersQuestion)[]>();
    const [selectedLevel, setSelectedLevel] = useState<null | string>(null);
    const { state: { token } } = useAuth();

    //todo this whole thing is complete bullshit but i am tired and it works so idgaf

    const handleStartRandomQuestionsLesson = () => {
      questionService
        .getRandomQuestions(token, lessonType)
        .then((res) => {
          setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
          setSelectedLevel("Рандомні 20 питань");
        })
        .catch((err) => console.error(err));
    };

    const handleStartMatchQuestionsLesson = () => {
        questionService
          .getMatchQuestions(token, lessonType)
          .then((res) => {
            setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
            setSelectedLevel("Питання на відповідність");
          })
          .catch((err) => console.error(err));
    }

    const handleStartWorkOnMistakes = () => {
        questionService
          .getWrongAnsweredQuestions(token, lessonType)
          .then((res) =>{
              setQuestions(res.map(mapToSingleOrDoubleAnswersQuestion));
              setSelectedLevel("Робота над помилками");}
          )
          .catch((err) => console.error(err));
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: 50,
          paddingBottom: 60
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
        <View style={{ width: "100%", alignItems: "center",  }}>
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

        <View style={{ width: "100%", alignItems: "center",  }}>
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

        <View style={{ width: "100%", alignItems: "center",  }}>
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
      </ScrollView>
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