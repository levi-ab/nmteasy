import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import { AuthProvider } from "./src/data/AuthContext";
import AppNavigator from "./src/components/AppNavigator";
import LessonsContext from "./src/data/LessonsContext";
import { useState } from "react";
import { ILessonByGeneralTitle } from "./src/data/models/lessons";

const Drawer = createDrawerNavigator();

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./src/assets/fonts/Inter-Black.otf"),
    Marlboro: require("./src/assets/fonts/Marlboro.ttf"),
  });

  const [lessons, setLessons] = useState<ILessonByGeneralTitle[]>([])

  return (
    <AuthProvider>
      <LessonsContext.Provider
        value={{ lessons: lessons, setLessons: setLessons}}
      >
        <AppNavigator />
      </LessonsContext.Provider>
    </AuthProvider>
  );
}
