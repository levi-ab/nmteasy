import { Button, View, Text, TouchableWithoutFeedback, Animated, StyleSheet } from "react-native";
import DuolingoButton from "../components/common/PressableButton";
import CircularProgress from "../components/common/progresstest";
import { useState } from "react";



const HomeScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0)

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("SignIn")}
        title="Go to notifications"
      />
      <Button
        onPress={() => setProgress(prevProgress => prevProgress + 10)}
        title="increase progress"
      />
      <DuolingoButton />
    </View>
  );
}

export default HomeScreen;