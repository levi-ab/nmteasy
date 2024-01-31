import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { SvgXml } from 'react-native-svg';  
import { colors } from "../../styles";

const DuolingoButton = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [color, setColor] = useState("#3498db"); // Default color
  const [filledLength, setFilledLength] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const radius = 50; // Set your desired radius
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const filledPercentage = Math.min(Math.max(0, percentage), 100);
    setFilledLength((filledPercentage / 100) * circumference);

    // Adjust color based on the percentage
    if (filledPercentage < 30) {
      setColor("#e74c3c"); // Red color if percentage is less than 30
    } else if (filledPercentage < 70) {
      setColor("#f39c12"); // Orange color if percentage is between 30 and 70
    } else {
      setColor("#2ecc71"); // Green color if percentage is greater than 70
    }
  }, [percentage]);

  const handlePressIn = () => {
    console.log("Pressed button");
    setPercentage(prevPercentage => prevPercentage + 10)
    if(percentage>=100){
      setPercentage(0)
    }
    Animated.timing(animation, {
      toValue: 1,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 50,
      useNativeDriver: false,
    }).start();
  };

  const heightStyle = {
    marginTop: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [-7, 0],
    }),
    paddingBottom: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [7, 0],
    }),
  };

  const innerStyle = {
    // borderRadius: animation.interpolate({
    //   inputRange: [0, 1],
    //   outputRange: [12, 16],
    // }),
  };

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Svg
        height="200"
        width="200"
      >
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke="#bdc3c7"
          strokeWidth="10"
          fill="transparent"
        />
        <Circle
          cx="100"
          cy="100"
          r={radius}
          stroke={color}
          strokeWidth="10"
          strokeDasharray={[circumference, circumference]}
          strokeDashoffset={circumference - filledLength}
          strokeLinecap="round"
          fill="transparent"
        />
        <View style={styles.button}>
          <View style={styles.outerProgress}>
            <View style={styles.outer}>
              <Animated.View style={[styles.height, heightStyle]}>
                <Animated.View style={[styles.inner, innerStyle]}>
                </Animated.View>
              </Animated.View>
            </View>
          </View>
        </View>
      </Svg>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  outerProgress: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.themeSecondary,
    borderRadius: 90,
    borderRightColor: "green",
    position: "relative",
  },
  button: {
    height: 90,
    width: 95,
    position: "absolute",
    zIndex: 10,
    top: 55,
    left: 52,
  },
  outer: {
    flex: 1,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.65)",
    borderRadius: 90,
    position: "absolute",
    height: 90,
    width: 95,
  },
  height: {
    backgroundColor: colors.themePrimary,
    borderRadius: 90,
    width: 75,
  },
  inner: {
    height: "100%",
    backgroundColor: colors.themeSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 90,
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default DuolingoButton;
