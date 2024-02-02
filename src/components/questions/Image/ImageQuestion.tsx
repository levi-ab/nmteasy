import { ScrollView, StyleSheet, Text, View } from "react-native";
import QuestionImageOption from "./QuestionImageOption";
import { IQuestion } from "../../../screens/Lesson";
import { colors } from "../../../styles";
import { useState } from "react";

export interface IImageQuestionProps {
    question: IQuestion,
    setNextQuestionActive: Function
    setIsAnswerRight: Function
    answerResultVisible: boolean
}


const ImageQuestion = (props: IImageQuestionProps) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageOptionClicked = (src: string) => {
    setSelectedImage(src); 
    props.setNextQuestionActive(true);
    props.setIsAnswerRight(props.question.right_answer === src);
  }

  return (
    <View style={[styles.centeredView]}>
      <ScrollView style={{flexGrow: 0}}>
        <Text style={styles.questionText}>{props.question.question_text}</Text>
      </ScrollView>
      <View style={styles.imageOptionsContainer}>
        {props.question.answers.map((src) => (
          <QuestionImageOption
            key={src}
            src={{
              uri: src,
            }}
            isSelected={selectedImage === src}
            answerResultVisible={props.answerResultVisible}
            isRight={src === props.question.right_answer}
            onPress={() => handleImageOptionClicked(src)}
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
