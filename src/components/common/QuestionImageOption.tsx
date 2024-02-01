import {
    GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { colors } from "../../styles";


export interface IImageIcon {
  src: ImageSourcePropType;
  style?: ImageStyle;
  isSelected: boolean;
  onPress: (event: GestureResponderEvent) => void;
}

const QuestionImageOption = (props: IImageIcon) => {

  return (
    <Pressable style={[styles.imageContainer, props.isSelected && styles.selectedContainerStyle]} onPress={props.onPress}>
      <Image source={props.src} style={styles.imageStyles}></Image>
    </Pressable>
  );
};

export default QuestionImageOption;

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 10,
    width: "45%",
    height: "45%",
    borderColor: colors.grays40,
  },
  selectedContainerStyle: {
    borderWidth: 5,
    borderColor: colors.themePrimary
  },
  imageStyles: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
  },
});
