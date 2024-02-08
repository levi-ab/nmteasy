import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors } from "../../styles";
import { G, Path, Svg } from "react-native-svg";
import LessonTypeSelector from "./LessonTypeSelector";
import LessonTypeSlideUp from "./LessonTypeSlideUp";
import { getThemePrimaryColor } from "../../utils/themes";
import { useContext } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";

const AppHeader = ({
  title,
  navigation,
}: {
  title: string;
  navigation: any;
}) => {

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
          width={50}
          height={50}
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
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "80%",
        }}
      >
        <Text style={styles.textStyle}>{title}</Text>
        {title !== "Головна" ? (
          <View />
        ) : (
          <>
            <LessonTypeSelector />
            <LessonTypeSlideUp />
          </>
        )}
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 30,
    paddingHorizontal: 5,
    width: "100%",
    height: 90,
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: {
    fontFamily: "Inter-Black",
    fontSize: 20,
    marginLeft: 20,
    color: colors.basicGray,
  },
});