import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from "react-native";
import { Circle, Svg } from "react-native-svg";
import { SvgXml } from "react-native-svg";
import { colors } from "../../styles";

const IslandButton = ({percentage, marginLeft, marginRight, marginTop, onPress}) => {
  const [animation, _] = useState(new Animated.Value(0));
  const [color, setColor] = useState(colors.gray);
  const [filledLength, setFilledLength] = useState(0);
  const radius = 38;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const filledPercentage = Math.min(Math.max(0, percentage), 100);
    setFilledLength((filledPercentage / 100) * circumference);

    if (filledPercentage < 30) {
      setColor(colors.red);
      return;
    }
    if (filledPercentage < 70) {
      setColor(colors.orange);
      return;
    }
    setColor(colors.green);
  }, [percentage]);

  const handlePressIn = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 25,
      useNativeDriver: false,
    }).start(() => {
      onPress()
    });
  };

  const handlePressOut = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 25,
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

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{backgroundColor:"red"}}
    >
      <Svg height="100" width="100" style={{marginLeft: marginLeft, marginRight: marginRight, marginTop: marginTop}}>
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#bdc3c7"
          strokeWidth="7"
          fill="transparent"
        />
        <Circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth="7"
          strokeDasharray={[circumference, circumference]}
          strokeDashoffset={circumference - filledLength}
          strokeLinecap="round"
          fill="transparent"
        />
        <View style={styles.button}>
          <View style={styles.outerProgress}>
            <View>
              <Animated.View style={[styles.height, heightStyle]}>
                <Animated.View style={[styles.inner]}></Animated.View>
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
    padding: 5,
    backgroundColor: colors.grays70,
    borderRadius: 70,
    borderRightColor: "green",
    position: "relative",
  },
  button: {
    height: 70,
    width: 75,
    position: "absolute",
    zIndex: 10,
    top: 15,
    left: 12,
  },
  height: {
    backgroundColor: "#55a310",
    borderRadius: 70,
    width: 65,
  },
  inner: {
    height: "100%",
    backgroundColor: colors.themeSecondary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 70,
  },
  white: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default IslandButton;
