import React, { useRef, useEffect, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { colors } from '../../styles';

const AnimatedProgressBar = ({ progress }: {progress: number}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [color, setColor] = useState(colors.gray);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress,
      duration: 500, // You can adjust the duration of the animation
      useNativeDriver: false, // Set to true if using native driver is supported
    }).start();
  }, [progress, animatedValue]);

  useEffect(() => {
    const filledPercentage = Math.min(Math.max(0, progress), 100);

    if (filledPercentage < 0.3) {
      setColor(colors.red);
      return;
    }
    if (filledPercentage < 0.4) {
      setColor(colors.orange);
      return;
    }
    setColor(colors.green);
  }, [progress]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.progressBar,
          {
            width: animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
            backgroundColor: color
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    backgroundColor: colors.grays30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 10,
  },
});

export default AnimatedProgressBar;