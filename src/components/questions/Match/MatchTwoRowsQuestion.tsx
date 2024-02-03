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
import { IAnswer, IDoubleAnswersQuestion } from "../../../../models/questions";
import { LetterOptions, QuestionTypes } from "../../../../utils/constants";
import {
  checkIfMatchQuestionMatrixIsCorrect,
  getSelectFillColorForMatrix,
  getUnCheckedFillColorForMatrix,
} from "../../../../utils/utils";

export interface IMatchTwoRowsQuestionProps {
  question: IDoubleAnswersQuestion;
  setNextQuestionActive: Function;
  setIsAnswerRight: Function;
  answerResultVisible: boolean;
}

const MatchTwoRowsQuestion = (props: IMatchTwoRowsQuestionProps) => {
  const [matrixState, setMatrixState] = useState(
    Array(props.question.answers.first_row_answers.length).fill(
      Array(props.question.answers.second_row_answers.length).fill(false)
    )
  );

  useEffect(() => {
    props.setIsAnswerRight(false);
  }, []);

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

    if (
      checkIfMatchQuestionMatrixIsCorrect(
        updatedMatrixState,
        props.question.right_answer
      )
    ) {
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
          matrixState={matrixState}
          handleCheckboxChange={handleCheckboxChange}
          right_answer={props.question.right_answer}
          answerResultVisible={props.answerResultVisible}
        />
      </View>
    </View>
  );
};

export default MatchTwoRowsQuestion;

export const RenderAnswerMatrix = ({
  first_row_answers,
  second_row_answers,
  matrixState,
  handleCheckboxChange,
  right_answer,
  answerResultVisible,
}: {
  first_row_answers: IAnswer[];
  second_row_answers: IAnswer[];
  matrixState: any[];
  handleCheckboxChange: (row: number, column: number) => void;
  right_answer: string;
  answerResultVisible: boolean;
}) => {
  return first_row_answers?.map((_: any, rowIndex: number) => (
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
      {second_row_answers?.map((_: any, columnIndex: number) => (
        <BouncyCheckbox
          size={25}
          fillColor={getSelectFillColorForMatrix(
            rowIndex,
            columnIndex,
            right_answer,
            answerResultVisible,
            matrixState
          )}
          unfillColor={getUnCheckedFillColorForMatrix(
            rowIndex,
            columnIndex,
            right_answer,
            answerResultVisible
          )}
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
