import { Image, StyleSheet, Text, View } from "react-native";
import { getThemePrimaryColor } from "../../utils/themes";
import { useContext } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";

const NothingFound = ({
  width,
  height,
  marginTop,
}: {
  width: number;
  height: number;
  marginTop: number;
}) => {
  const { lessonType } = useContext(LessonTypeContext);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/nothing-to-see.png")}
        style={{ width: width, height: height, marginTop: marginTop }}
      />
      <Text
        style={[
          styles.notFoundText,
          { color: getThemePrimaryColor(lessonType) },
        ]}
      >
        Нічого не знайдено
      </Text>
    </View>
  );
};

export default NothingFound;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },

  notFoundText: {
    fontSize: 20,
    fontFamily: "Inter-Black",
  },
});
