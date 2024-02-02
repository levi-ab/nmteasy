import React, { useState } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { colors } from "../../styles";

export interface IPressableButton {
  onPress: () => void;
  style?: ViewStyle;
  buttonShadow: string;
  textStyle?: TextStyle;
  text: string;
  disabled?: boolean;
}

const PressableButton = (props: IPressableButton) => {
  const [animation, _] = useState(new Animated.Value(0));

  const handlePressIn = () => {
    if(props.disabled){
      return;
    }
    Animated.timing(animation, {
      toValue: 1,
      duration: 50,
      useNativeDriver: false,
    }).start(() => {
      props.onPress();
    });
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

  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <View style={[props.style]}>
        <View>
          <Animated.View
            style={[
              heightStyle,
              {
                backgroundColor: props.disabled ? colors.grays30 : props.buttonShadow,
                borderRadius: props?.style?.borderRadius,
              },
            ]}
          >
            <Animated.View
              style={[
                styles.inner,
                {
                  backgroundColor: props.disabled ? colors.grays30 : props?.style?.backgroundColor,
                  borderRadius: props?.style?.borderRadius,
                },
              ]}
            >
                <Text style={[props.textStyle, props.disabled && {color: colors.grays10}]}>{props.text}</Text>
            </Animated.View>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default PressableButton;

const styles = StyleSheet.create({
  outerProgress: {
    flex: 1,
    padding: 5,
  },
  inner: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  disabled: {
    backgroundColor: colors.grays30,
    color: colors.basicGray
  }
});
