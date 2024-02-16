import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ISingleAnswersQuestion } from "../../../data/models/questions";
import { colors } from "../../../styles";
import { useEffect, useState } from "react";
import { LetterOptions, QuestionTypes } from "../../../utils/constants";
import { AnswerBoxForMatchQuestion } from "./AnswerBoxForMatchQuestion";
import { checkIfMatchQuestionMatrixIsCorrect } from "../../../utils/matrixUtils";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

export interface IMatchQuestionProps {
  question: ISingleAnswersQuestion;
  setNextQuestionActive: Function;
  setIsAnswerRight: Function;
  answerResultVisible: boolean;
}

const MatchQuestion = (props: IMatchQuestionProps) => {
  const [matrixState, setMatrixState] = useState(
    Array(props.question.answers.length).fill(
      Array(props.question.answers.length).fill(false)
    )
  );

  useEffect(() => {
    props.setIsAnswerRight(false);
  }, []);

  const getSelectFillColor = (rowIndex: number, columnIndex: number) => {
    const answerArray = props.question.right_answer
      .split("|")
      .filter(Boolean)
      .map(Number);

    const isRight =
      (answerArray[0] === rowIndex && answerArray[1] === columnIndex) ||
      (answerArray[2] === rowIndex && answerArray[3] === columnIndex) ||
      (answerArray[4] === rowIndex && answerArray[5] === columnIndex) ||
      (answerArray[6] === rowIndex && answerArray[7] === columnIndex);

    if (isRight && props.answerResultVisible) {
      return colors.themeSecondary;
    }

    if (matrixState[rowIndex][columnIndex]) {
      if (props.answerResultVisible && !isRight) {
        return colors.red;
      }

      return colors.themeSecondary;
    }

    return colors.themeSecondary;
  };

  const handleCheckboxChange = (rowIndex: number, columnIndex: number) => {
    const updatedMatrixState = matrixState.map((row) => [...row]);

    updatedMatrixState[rowIndex] = updatedMatrixState[rowIndex].map(
      () => false
    );

    updatedMatrixState.forEach((row) => {
      row[columnIndex] = false;
    });

    updatedMatrixState[rowIndex][columnIndex] =
      !matrixState[rowIndex][columnIndex];

    if (
      updatedMatrixState.every((row) =>
        row.some((value: boolean) => value === true)
      )
    ) {
      props.setNextQuestionActive(true);
    } else {
      props.setNextQuestionActive(false);
    }

    if (checkIfMatchQuestionMatrixIsCorrect(updatedMatrixState, props.question.right_answer)) {
      props.setIsAnswerRight(true);
    }

    setMatrixState(updatedMatrixState);
  };

  return (
    <View style={[styles.centeredView]}>
      <ScrollView
        style={{
          maxHeight: "70%",
          flexGrow: 0,
          flexDirection: "column",
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[styles.questionText]}>
          {props.question.question_text}
        </Text>
        <View style={{ flexDirection: "column", gap: 30 }}>
          <View style={{ flexDirection: "column", gap: 10 }}>
            {props.question.answers?.map((answer, index) => {
              return answer.type === QuestionTypes.Image ? (
                <Pressable onPress={null} key={index}>
                  <ImageZoom uri={answer.text} style={styles.questionImage}/>
                </Pressable>
              ) : (
                <Text style={styles.answerText} key={index}>
                  {index + 1 + " " + answer.text}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 30,
            marginTop: 20,
          }}
        >
          {props.question.answers?.map((rowItem, rowIndex) => (
            <Text
              key={rowItem.text}
              style={[styles.answerText, { marginRight: 27 }]}
            >
              {LetterOptions[rowIndex]}
            </Text>
          ))}
        </View>
        <AnswerBoxForMatchQuestion
          first_row_answers={props.question.answers}
          second_row_answers={props.question.answers}
          matrixState={matrixState}
          handleCheckboxChange={handleCheckboxChange}
          right_answer={props.question.right_answer}
          answerResultVisible={props.answerResultVisible}
        />
      </View>
    </View>
  );
};

export default MatchQuestion;

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
    flex: 1,
    width: "100%",
    padding: 10,
    paddingBottom: 0,
  },
  questionText: {
    fontWeight: "700",
    color: colors.white,
    fontSize: 20,
    textAlign: "left",
    marginBottom: 15,
  },
  answerText: {
    fontWeight: "500",
    color: colors.white,
    fontSize: 16,
    textAlign: "left",
  },
  optionsContainer: {
    flexGrow: 1,
    height: "60%",
    paddingHorizontal: 10,
    width: "100%",
    marginTop: 50,
    flexDirection: "column",
    alignContent: "center",
  },
  option: {
    flex: 1,
    paddingVertical: 15,
    width: "100%",
  },
  questionImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    resizeMode: 'contain'
  },
});
