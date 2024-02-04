import {
  StyleSheet,
  Text,
  View
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IAnswer } from "../../../data/models/questions";
import {
  getSelectFillColorForMatrix,
  getUnCheckedFillColorForMatrix
} from "../../../../utils/matrixUtils";
import { colors } from "../../../styles";


export const AnswerBoxForMatchQuestion = ({
  first_row_answers, second_row_answers, matrixState, handleCheckboxChange, right_answer, answerResultVisible,
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
          onPress={() => handleCheckboxChange(rowIndex, columnIndex)} />
      ))}
    </View>
  ));
};

export const styles = StyleSheet.create({
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
  }
});