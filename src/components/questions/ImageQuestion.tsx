import { StyleSheet, Text, View } from "react-native";
import QuestionImageOption from "../common/QuestionImageOption";
import { IQuestion } from "../../screens/Lesson";
import { colors } from "../../styles";
import { useState } from "react";

interface IImageQuestion extends IQuestion{
    question_data: string[]
}
export interface IImageQuestionProps {
    question: IImageQuestion,
    setNextQuestionActive: Function
    setIsAnswerRight: Function
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
      <Text style={styles.questionText}>{props.question.text}</Text>
      <View style={styles.imageOptionsContainer}>
        {props.question.question_data.map((src) => (
          <QuestionImageOption
            key={src}
            src={{
              uri: src,
            }}
            isSelected={selectedImage === src}
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
