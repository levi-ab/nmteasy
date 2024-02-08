import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Pressable,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles";
import { LessonTypeToSvg } from "./LessonTypeSelector";
import { ScrollView } from 'react-native-gesture-handler';
import { AvailableLessons, LessonTypesToUkrainianMap } from "../../utils/constants";
import LessonTypeContext from "../../data/LessonsTypeContext";

const LessonTypeSlideUp = ({
  isVisible,
  setIsVisible,
}: {
  isVisible: boolean;
  setIsVisible: Function;
}) => {
  const [slideAnim] = useState(new Animated.Value(-220)); // Initial position off-screen
  const { lessonType, setLessonType } = useContext(LessonTypeContext);

  useEffect(() => {
    if (isVisible) {
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: -220,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy < -10;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < -10) {
          setIsVisible(false);
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.slideUpContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
      {...panResponder.panHandlers}
    >
      <View style={styles.answerContainer}>
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={{
            justifyContent: "space-between",
            marginTop: 10,
          }}
          onStartShouldSetResponder={() => true}
        >
          {AvailableLessons.map((_lessonType) => (
            <Pressable
              onPress={() => setLessonType(_lessonType)}
              style={[
                styles.lessonContainer,
                {
                  borderColor:
                    lessonType === _lessonType
                      ? colors.themePrimary
                      : colors.black,
                },
              ]}
              key={_lessonType}
            >
              <LessonTypeToSvg
                width={70}
                height={70}
                lessonType={_lessonType}
                color={colors.grays30}
              />
              <Text style={styles.textStyle}>
                {LessonTypesToUkrainianMap[_lessonType]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
        <View style={styles.slideUpThing}></View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    padding: 20,
    height: 250,
    flexDirection: "row",
  },
  answerContainer: {
    flex: 1,
    marginTop: 55,
    height: 200,
    zIndex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },

  textStyle: {
    color: colors.grays20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter-Black",
  },
  lessonContainer: {
    alignItems: "center",
    borderWidth: 2,
    width: 150,
    borderRadius: 10,
    marginRight: 30,
  },

  slideUpThing: {
    width: 150,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: colors.grays40
  },

  slideUpContainer: {
    borderRadius: 20,
    zIndex: 1,
    position: "absolute",
    top: -100,
    left: "-20%",
    width: "130%",
    right: 0,
    backgroundColor: colors.grays90,
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 4,
    height: 280,
  },
});

export default LessonTypeSlideUp;
