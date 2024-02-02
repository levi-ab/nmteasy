import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../../../styles";
import { useEffect, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { FlatList } from "react-native-gesture-handler";
import { IAnswer, IDoubleAnswersQuestion } from "../../../../models/questions";
import { copyMatrix, isMatrixSolved } from "../../../../utils/utils";
import { LetterOptions, QuestionTypes } from "../../../../utils/constants";

export interface ISelectQuestionProps {
  question: IDoubleAnswersQuestion;
  setNextQuestionActive: Function;
  setIsAnswerRight: Function;
  answerResultVisible: boolean;
}

const MatchQuestion = (props: ISelectQuestionProps) => {
  const [matrixState, setMatrixState] = useState(
    Array(props.question.answers.first_row_answers.length).fill(
      Array(props.question.answers.second_row_answers.length).fill(false)
    )
  );
  useEffect(() => {
    props.setIsAnswerRight(false);
  }, []);

  const getSelectFillColor = (text: string) => {
    const isRight = props.question.right_answer === text;
    if (isRight && props.answerResultVisible) {
      return colors.themeSecondary;
    }

    // if(selectedOption === text){
    //   if(props.answerResultVisible && !isRight){
    //     return colors.red
    //   }

    //   return colors.themeSecondary
    // }

    return colors.themeSecondary;
  };

  const getUnCheckedFillColor = (text: string) => {
    if (props.answerResultVisible && props.question.right_answer === text) {
      return colors.themeSecondary;
    }

    return colors.white;
  };

  const checkIfMatrixIsCorrect = (matrixState: any[]) => {
    const answerArray = props.question.right_answer
      .split("|")
      .filter(Boolean)
      .map(Number);
      console.log(answerArray)
      console.log(matrixState[answerArray[0]][answerArray[1]])
    if (
      matrixState[answerArray[0]][answerArray[1]] &&
      matrixState[answerArray[2]][answerArray[3]] &&
      matrixState[answerArray[4]][answerArray[5]] &&
      matrixState[answerArray[6]][answerArray[7]]
    )
      return true;
    return false;
  };

  const handleCheckboxChange = (rowIndex: number, columnIndex: number) => {
    if (
      !matrixState[rowIndex][columnIndex] &&
      matrixState[rowIndex].some((e: any) => e)
    ) {
      return;
    }
    let newMatrixState = copyMatrix(matrixState);
    newMatrixState[rowIndex][columnIndex] =
      !newMatrixState[rowIndex][columnIndex];

    if (
      newMatrixState.every((row) =>
        row.some((value: boolean) => value === true)
      )
    ) {
      props.setNextQuestionActive(true);
    }

    if(checkIfMatrixIsCorrect(newMatrixState)){
      props.setIsAnswerRight(true)
    }

    setMatrixState(newMatrixState);
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
            {props.question.answers.first_row_answers?.map((answer, index) => {
              return answer.type === QuestionTypes.Image ? (
                <Pressable onPress={null} key={index}>
                  <Image
                    source={{ uri: answer.text }}
                    style={styles.questionImage}
                  />
                </Pressable>
              ) : (
                <Text style={styles.answerText} key={index}>
                  {index + 1 + " " + answer.text}
                </Text>
              );
            })}
          </View>
          <View style={{ flexDirection: "column", gap: 10 }}>
            {props.question.answers.second_row_answers?.map((answer, index) => {
              return answer.type === QuestionTypes.Image ? (
                <Pressable onPress={null}>
                  <Image
                    source={{ uri: answer.text }}
                    style={styles.questionImage}
                    key={index}
                  />
                </Pressable>
              ) : (
                <Text style={styles.answerText} key={index}>
                  {LetterOptions[index] + " " + answer.text}
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
          {props.question.answers.second_row_answers?.map(
            (rowItem, rowIndex) => (
              <Text
                key={rowItem.text}
                style={[styles.answerText, { marginRight: 27 }]}
              >
                {LetterOptions[rowIndex]}
              </Text>
            )
          )}
        </View>
        <RenderAnswerMatrix
          first_row_answers={props.question.answers.first_row_answers}
          second_row_answers={props.question.answers.second_row_answers}
          getSelectFillColor={getSelectFillColor}
          getUnCheckedFillColor={getUnCheckedFillColor}
          matrixState={matrixState}
          handleCheckboxChange={handleCheckboxChange}
        />
      </View>
    </View>
  );
};

export default MatchQuestion;

const RenderAnswerMatrix = ({
  first_row_answers,
  second_row_answers,
  getSelectFillColor,
  getUnCheckedFillColor,
  matrixState,
  handleCheckboxChange,
}: {
  first_row_answers: IAnswer[];
  second_row_answers: IAnswer[];
  getSelectFillColor: (string: string) => string;
  getUnCheckedFillColor: (string: string) => string;
  matrixState: any[];
  handleCheckboxChange: (row: number, column: number) => void;
}) => {
  return first_row_answers?.map((rowItem: any, rowIndex: number) => (
    <View
      key={rowIndex}
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      <Text style={[styles.answerText, { marginRight: 10 }]}>
        {rowIndex + 1}
      </Text>
      {second_row_answers?.map((columnItem: any, columnIndex: number) => (
        <BouncyCheckbox
          size={25}
          fillColor={getSelectFillColor("answer.text")}
          unfillColor={getUnCheckedFillColor("answer.text")}
          key={columnIndex}
          disableBuiltInState={true}
          isChecked={matrixState[rowIndex][columnIndex]}
          onPress={() => handleCheckboxChange(rowIndex, columnIndex)}
        />
      ))}
    </View>
  ));
};

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
  },
});
