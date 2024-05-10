import React, { useContext, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";
import { colors } from "../../styles";
import { useAuth } from "../../data/AuthContext";
import analyticsService from "../../services/analyticsService";
import LessonTypeContext from "../../data/LessonsTypeContext";

const AnalyticsChart = () => {
  const {
    state: { token },
  } = useAuth();

  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [questionNums, setQuestionNums] = useState<number[]>([]);
  const { lessonType } = useContext(LessonTypeContext);

  useEffect(() => {
    analyticsService
      .getWeeklyAnalytic(token, lessonType)
      .then((res) => {
        const datesArray = [];
        const numbersArray: number[] = [];
        for (const [dateString, number] of Object.entries(res)) {
          const date = new Date(dateString);
          const day = date.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "2-digit",
          });
          datesArray.push(day);
          numbersArray.push(number as number);
        }

        setWeekDays(datesArray);
        if(numbersArray.length === 1) {
          setQuestionNums([0, ...numbersArray]);
          return
        }
        setQuestionNums(numbersArray);
      })
      .catch((err) => console.error(err));
  }, []);

  const contentInset = { top: 20, bottom: 20 };

  return (
    <View>
      {questionNums.length > 1 ? (
        <>
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
        </>
      ) : (
        <View/>
      )}
    </View>
  );
};

export default AnalyticsChart;
