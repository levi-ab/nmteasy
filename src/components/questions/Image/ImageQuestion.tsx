import { ScrollView, StyleSheet, Text, View } from "react-native";
import QuestionImageOption from "./QuestionImageOption";
import { colors } from "../../../styles";
import { useContext, useState } from "react";
import { ISingleAnswersQuestion } from "../../../data/models/questions";
import LessonTypeContext from "../../../data/LessonsTypeContext";
import { LessonTypes } from "../../../utils/constants";

export interface IImageQuestionProps {
    question: ISingleAnswersQuestion,
    setNextQuestionActive: Function
    setIsAnswerRight: Function
    answerResultVisible: boolean
}


const ImageQuestion = (props: IImageQuestionProps) => {
  const [selectedImage, setSelectedImage] = useState("");

  const { lessonType } = useContext(LessonTypeContext);

  const handleImageOptionClicked = (src: string) => {
    setSelectedImage(src); 
    props.setNextQuestionActive(true);
    props.setIsAnswerRight(props.question.right_answer === src);
  }

  return (
    <View style={[styles.centeredView]}>
      <ScrollView style={{ maxHeight: "30%", flexGrow: 0 }}>
        <Text style={styles.questionText}>{props.question.question_text}</Text>
      </ScrollView>
      <View
        style={[
          styles.imageOptionsContainer,
          { marginTop: lessonType === LessonTypes.Ukrainian ? 80 : 0 },
        ]}
      >
        {props.question.answers.map((answer) => (
          <QuestionImageOption
            key={answer.text}
            src={{
              uri: answer.text,
            }}
            isSelected={selectedImage === answer.text}
            answerResultVisible={props.answerResultVisible}
            isRight={answer.text === props.question.right_answer}
            onPress={() => handleImageOptionClicked(answer.text)}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageQuestion;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 22,
    padding: 10,
  },
  imageOptionsContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: "space-around",
    alignContent: "space-around",
    padding: 10, 
  },
  questionText: {
    fontWeight: "700",
    color: colors.white,
    fontSize: 22,
    textAlign: "left",
  },
});
