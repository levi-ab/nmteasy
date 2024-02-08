import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import * as Progress from "react-native-progress";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Circle, Line, Svg } from "react-native-svg";
import { getThemePrimaryColor } from "../utils/themes";
import { useContext } from "react";
import LessonTypeContext from "../data/LessonsTypeContext";

const LessonHeader = (props: { progress: number; }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { lessonType } = useContext(LessonTypeContext);

  return (
    <View style={[styles.headerContainer, {backgroundColor: getThemePrimaryColor(lessonType)}]}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Svg width="30" height="30" viewBox="0 0 30 30">
          <Circle
            cx="15"
            cy="15"
            r="14"
            stroke={colors.grays50}
            strokeWidth="2.5"
            fill="transparent"
          />
          <Line
            x1="7"
            y1="7"
            x2="23"
            y2="23"
            stroke={colors.grays50}
            strokeWidth="2.5"
          />
          <Line
            x1="23"
            y1="7"
            x2="7"
            y2="23"
            stroke={colors.grays50}
            strokeWidth="2.5"
          />
        </Svg>
      </TouchableOpacity>

      <Progress.Bar
        progress={props.progress}
        width={Dimensions.get("window").width - 70}
        height={20}
        borderRadius={20}
        borderWidth={2}
        color={colors.themePrimary}
        borderColor={colors.grays50}
        unfilledColor={colors.grays70}
      />
    </View>
  );
};

export default LessonHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: 47,
    paddingBottom: 10,
    width: "100%",
  },
});
