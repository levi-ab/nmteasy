import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../styles";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { ISingleAnswersQuestion } from "../../../../models/questions";
import { QuestionTypes } from "../../../../utils/constants";

export interface ISelectQuestionProps {
  question: ISingleAnswersQuestion;
  setNextQuestionActive: Function;
  setIsAnswerRight: Function;
  answerResultVisible: boolean
}

const SelectQuestion = (props: ISelectQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState("");
  
  useEffect(() => {
    props.setIsAnswerRight(false);
  }, []);

  const handleOptionClicked = (text: string) => {
    setSelectedOption(text)
    props.setNextQuestionActive(true);
    props.setIsAnswerRight(props.question.right_answer === text);
  }

  const getSelectFillColor = (text: string) => {
    const isRight = props.question.right_answer === text;
    if(isRight && props.answerResultVisible){
      return colors.themeSecondary
    }

    if(selectedOption === text){
      if(props.answerResultVisible && !isRight){
        return colors.red
      }

      return colors.themeSecondary
    }

    return ""
  }

  const getUnCheckedFillColor = (text: string) => {
    if(props.answerResultVisible && props.question.right_answer === text){
        return colors.themeSecondary
    }

    return colors.white
  }

  return (
    <View style={[styles.centeredView]}>
      <ScrollView
        style={{ maxHeight: "60%", flexGrow: 0 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.questionText}>{props.question.question_text}</Text>
        {props.question.question_image !== "" && (
          <Image
            source={{ uri: props.question.question_image }}
            style={styles.questionImage}
          />
        )}
      </ScrollView>
      <ScrollView
        style={styles.optionsContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {props.question.answers &&
          props.question.answers.map((answer) => (
            <View key={answer.text} style={styles.option}>
              <BouncyCheckbox
                size={25}
                fillColor={getSelectFillColor(answer.text)}
                unfillColor={getUnCheckedFillColor(answer.text)}
                disableBuiltInState={true}
                text={answer.type === QuestionTypes.Image ? "" : answer.text}
                isChecked={selectedOption === answer.text}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ textDecorationLine: "none", color: colors.white }}
                onPress={(_) => handleOptionClicked(answer.text)}
              />
              {answer.type === QuestionTypes.Image && (
                <Pressable onPress={(_) => handleOptionClicked(answer.text)}>
                  <Image
                    source={{ uri: answer.text }}
                    style={styles.questionImage}
                  />
                </Pressable>
              )}
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default SelectQuestion;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
    flex: 1,
    width: "100%",
    padding: 10,
    paddingTop: 20
  },
  questionText: {
    fontWeight: "700",
    color: colors.white,
    fontSize: 20,
    textAlign: "left",
  },
  optionsContainer: {
    flexGrow: 1,
    height: "60%",
    paddingHorizontal:10,
    width: "100%",
    marginTop: 50,
    flexDirection: "column",
    alignContent: "center",
  },
  option: {
    flex: 1,
    paddingVertical: 15,
    flexDirection: "row",
    width: "100%",
  },
  questionImage: {
    width: 200,
    height: 200,
    marginTop: 20
  }
});
