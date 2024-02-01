import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../styles";

const AnswerResultSlideUp = ({
  isVisible,
  isRight,
  rightText,
  wrongText,
  isFinished,
}) => {
  const [slideAnim] = useState(new Animated.Value(150)); // Initial position off-screen

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
        toValue: 150,
        duration: 300,
        useNativeDriver: false, 
      }).start();
    }
  }, [isVisible, slideAnim]);

  return (
    <Animated.View
      style={[
        styles.slideUpContainer,
        { transform: [{ translateY: slideAnim }] },
      ]}
    >
      {isRight ? (
        <Text style={styles.rightStyle}>
          {isFinished ? "Добив!" : rightText}
        </Text>
      ) : (
        <Text style={styles.wrongStyle}>
          {isFinished ? "Танцював та не вклонився(" : wrongText}
        </Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  slideUpContainer: {
    position: "absolute",
    bottom: -100,
    left: 0,
    right: 0,
    backgroundColor: colors.grays90,
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 4,
    height: 250,
  },

  rightStyle: {
    color: colors.themeSecondary,
    fontSize: 20,
    fontWeight: "700",
  },

  wrongStyle: {
    color: colors.red,
    fontSize: 20,
    fontWeight: "700",
  },
});

export default AnswerResultSlideUp;
