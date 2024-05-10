import { useContext, useState } from "react";
import { Animated, Dimensions, Keyboard, StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Circle, G, Line, Path, Svg } from "react-native-svg";
import { colors } from "../../styles";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../../utils/themes";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { useLessonSearch } from "../../data/LessonSearchContext";

const LessonSearch = () => {
    const [searchOpen, setSearchOpen] = useState(false);
    const { setLessonSearch, lessonSearch } = useLessonSearch();
    const [verticalPosition] = useState(new Animated.Value(-200));
    const { lessonType } = useContext(LessonTypeContext);

    const handleSearchClicked = () => {
      if(searchOpen) {
        Animated.timing(verticalPosition, {
          toValue: -200,
          duration: 300,
          useNativeDriver: false,
        }).start();
        setLessonSearch("");
        Keyboard.dismiss();
      } else {
        Animated.timing(verticalPosition, {
          toValue: 40,
          duration: 200,
          useNativeDriver: false,
        }).start();
      }
      setSearchOpen(!searchOpen)
    }

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handleSearchClicked}>
          {searchOpen ? (
            <Svg width="25" height="25" viewBox="0 0 30 30">
              <Circle
                cx="15"
                cy="15"
                r="14"
                stroke={colors.black}
                strokeWidth="3"
                fill="transparent"
              />
              <Line
                x1="7"
                y1="7"
                x2="23"
                y2="23"
                stroke={colors.black}
                strokeWidth="3"
              />
              <Line
                x1="23"
                y1="7"
                x2="7"
                y2="23"
                stroke={colors.black}
                strokeWidth="2.5"
              />
            </Svg>
          ) : (
            <Svg
              fill="#000000"
              height="25px"
              width="25px"
              viewBox="0 0 183.792 183.792"
            >
              <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
              <G
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></G>
              <G id="SVGRepo_iconCarrier">
                <Path d="M54.734,9.053C39.12,18.067,27.95,32.624,23.284,50.039c-4.667,17.415-2.271,35.606,6.743,51.22 c12.023,20.823,34.441,33.759,58.508,33.759c7.599,0,15.139-1.308,22.287-3.818l30.364,52.592l21.65-12.5l-30.359-52.583 c10.255-8.774,17.638-20.411,21.207-33.73c4.666-17.415,2.27-35.605-6.744-51.22C134.918,12.936,112.499,0,88.433,0 C76.645,0,64.992,3.13,54.734,9.053z M125.29,46.259c5.676,9.831,7.184,21.285,4.246,32.25c-2.938,10.965-9.971,20.13-19.802,25.806 c-6.462,3.731-13.793,5.703-21.199,5.703c-15.163,0-29.286-8.146-36.857-21.259c-5.676-9.831-7.184-21.284-4.245-32.25 c2.938-10.965,9.971-20.13,19.802-25.807C73.696,26.972,81.027,25,88.433,25C103.597,25,117.719,33.146,125.29,46.259z"></Path>
              </G>
            </Svg>
          )}
        </TouchableOpacity>
        <Animated.View
          style={{
            paddingHorizontal: 4,
            position: "absolute",
            top: verticalPosition,
            width: Dimensions.get("window").width + 100, //i fucking love magic numbers, have fun figuring out what is 100
            left: -Dimensions.get("window").width / 2,
            padding: 10,
            backgroundColor: getThemePrimaryColor(lessonType),
          }}
        >
          <TextInput
            style={[styles.textInput]}
            placeholder="Пошук"
            onChangeText={(text) => setLessonSearch(text)}
            value={lessonSearch}
            placeholderTextColor={getThemeSecondaryColor(lessonType)}
          ></TextInput>
        </Animated.View>
      </View>
    );
}

export default LessonSearch;

const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
    },

    textInput: {
        padding: 5,
        width: 250,
        borderRadius: 5,
        height:  40,
        marginLeft: 40,
        borderWidth: 1,
        borderColor: colors.grays100,
        fontSize: 16,
    }
  });