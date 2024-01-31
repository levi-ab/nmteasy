import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import DuolingoButton from './PressableButton';

const CircularProgress = (props) => {
  const [color, setColor] = useState('#3498db'); // Default color
  const [filledLength, setFilledLength] = useState(0);
  const radius = 50; // Set your desired radius
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const filledPercentage = Math.min(Math.max(0, props.percentage), 100);
    setFilledLength((filledPercentage / 100) * circumference);

    // Adjust color based on the percentage
    if (filledPercentage < 30) {
      setColor('#e74c3c'); // Red color if percentage is less than 30
    } else if (filledPercentage < 70) {
      setColor('#f39c12'); // Orange color if percentage is between 30 and 70
    } else {
      setColor('#2ecc71'); // Green color if percentage is greater than 70
    }
  }, [props.percentage]);

  return (
    <View>
      <Svg height="200" width="200" style={{backgroundColor: "red", position: "relative"}}>
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
      </Svg>
    </View>
  );
};

export default CircularProgress;
