import { ScrollView, StyleSheet, Text, View } from "react-native";
import { colors } from "../../../styles";
import { IQuestion } from "../../../screens/Lesson";
import { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";

export interface ISelectQuestionProps {
  question: IQuestion;
  setNextQuestionActive: Function;
  setIsAnswerRight: Function;
  answerResultVisible: boolean
}

const SelectQuestion = (props: ISelectQuestionProps) => {
  const [selectedOption, setSelectedOption] = useState("");

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
      <ScrollView style={{ maxHeight: "60%", flexGrow: 0 }}>
        <Text style={styles.questionText}>{props.question.text}</Text>
      </ScrollView>
      <ScrollView style={styles.optionsContainer} contentContainerStyle={{flexGrow: 1}}>
        {props.question.question_data.map((text) => (
          <View key={text} style={styles.option}>
            <BouncyCheckbox
              size={25}
              fillColor={getSelectFillColor(text)}
              unfillColor={getUnCheckedFillColor(text)}
              disableBuiltInState={true}
              text={text}
              isChecked={selectedOption === text}
              innerIconStyle={{ borderWidth: 2 }}
              textStyle={{ textDecorationLine: "none", color: colors.white}}
              onPress={_ => handleOptionClicked(text)}
            />
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
    width: "100%",
  }
});
