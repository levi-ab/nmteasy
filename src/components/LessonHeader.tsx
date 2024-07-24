import { Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../styles";
import * as Progress from "react-native-progress";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Circle, G, Line, Path, Svg } from "react-native-svg";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";
import { useContext } from "react";
import LessonTypeContext from "../data/LessonsTypeContext";

const LessonHeader = (props: { progress: number; }) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { lessonType } = useContext(LessonTypeContext);

  return (
    <View
      style={[
        styles.headerContainer,
        { backgroundColor: getThemePrimaryColor(lessonType) },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.openDrawer();
        }}
      >
        <Svg
          viewBox="0 0 24 24"
          fill="none"
          width={45}
          height={45}
          strokeWidth={2}
        >
          <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
          <G
            id="SVGRepo_tracerCarrier"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></G>
          <G id="SVGRepo_iconCarrier">
            <Path
              d="M4 18L20 18"
              stroke={colors.basicGray}
              stroke-width="2"
              stroke-linecap="round"
            ></Path>
            <Path
              d="M4 12L20 12"
              stroke={colors.basicGray}
              stroke-width="2"
              stroke-linecap="round"
            ></Path>
            <Path
              d="M4 6L20 6"
              stroke={colors.basicGray}
              stroke-width="2"
              stroke-linecap="round"
            ></Path>
          </G>
        </Svg>
      </TouchableOpacity>
      <Progress.Bar
        progress={props.progress}
        width={Dimensions.get("window").width - 60}
        height={25}
        borderRadius={20}
        borderWidth={2}
        color={getThemeSecondaryColor(lessonType)}
        unfilledColor={"transparent"}
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
