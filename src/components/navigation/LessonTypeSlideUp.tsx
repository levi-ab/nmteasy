import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Pressable
} from "react-native";
import { colors } from "../../styles";
import { LessonTypeToSvg } from "./LessonTypeSelector";
import { AvailableLessons, LessonTypesToUkrainianMap } from "../../utils/constants";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { ScrollView } from "react-native-gesture-handler";

const LessonTypeSlideUp = () => {
  const [slideAnim] = useState(new Animated.Value(-250)); // Initial position off-screen
  const { lessonType, setLessonType } = useContext(LessonTypeContext);
  const { lessonTypeSelectorOpen, setLessonTypeSelectorOpen } = useContext(LessonTypeContext);

  useEffect(() => {
    if (lessonTypeSelectorOpen) {
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      // Slide down animation
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [lessonTypeSelectorOpen, slideAnim]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return gestureState.dy < 0;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy < 0) {
          setLessonTypeSelectorOpen(false);
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
