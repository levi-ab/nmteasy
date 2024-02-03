import {
  Text,
  View
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { IAnswer } from "../../../../models/questions";
import {
  getSelectFillColorForMatrix,
  getUnCheckedFillColorForMatrix
} from "../../../../utils/matrixUtils";
import { styles } from "./MatchTwoRowsQuestion";


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
