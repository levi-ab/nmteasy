import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LineChart, Grid, YAxis, XAxis } from "react-native-svg-charts";
import { colors } from "../../styles";
import analyticsService from "../../services/analyticsService";
import { useAuth } from "../../data/AuthContext";

const AnalyticsChart = () => {
  const {
    state: { token },
  } = useAuth();

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [questionNums, setQuestionNums] = useState<number[]>([]);

  useEffect(() => {
    analyticsService
      .getWeeklyAnalytic(token)
      .then((res) => {
        const datesArray = [];
        const numbersArray: number[] = [];
        for (const [dateString, number] of Object.entries(res)) {
          const date = new Date(dateString);
          const day = date.toLocaleDateString('uk-UA', { weekday: 'short' });
          datesArray.push(day);
          numbersArray.push(number as number);
        }

        setWeekDays(datesArray);
        setQuestionNums(numbersArray)
      })
      .catch((err) => console.error(err));
  }, []);

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View>
      <View style={{ height: 200, flexDirection: "row" }}>
        <YAxis
          data={questionNums}
          contentInset={contentInset}
          svg={{
            fill: colors.grays50,
            fontSize: 10,
          }}
          style={{ width: 40, marginRight: -10 }}
          numberOfTicks={10}
          formatLabel={(value) => `${value}`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={questionNums}
          svg={{ stroke: colors.themeThird, strokeWidth: 2 }}
          contentInset={contentInset}
          animate={true}
          animationDuration={2000}
        >
          <Grid />
        </LineChart>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginLeft: 40,
          marginTop: -10,
        }}
      >
        {weekDays.map((day) => (
          <Text key={day} style={{ color: colors.grays50, fontSize: 8 }}>
            {day}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default AnalyticsChart;
