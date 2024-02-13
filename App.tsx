import { useFonts } from "expo-font";
import { AuthProvider } from "./src/data/AuthContext";
import AppNavigator from "./src/components/navigation/AppNavigator";
import LessonsContext from "./src/data/LessonsContext";
import { useState } from "react";
import { ILessonByGeneralTitle } from "./src/data/models/lessons";
import { LessonTypes } from "./src/utils/constants";
import LessonTypeContext from "./src/data/LessonsTypeContext";
import GlobalLoader from "./src/components/common/GlobalLoader";
import { SafeAreaView, StatusBar } from "react-native";
import SafeViewAndroid from "./src/components/common/AndroidSafeArea"

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Inter-Black": require("./src/assets/fonts/Inter-Black.otf"),
    "Marlboro": require("./src/assets/fonts/Marlboro.ttf"),
  });

  const [lessons, setLessons] = useState<ILessonByGeneralTitle[]>([]);
  const [lessonTypeSelectorOpen, setLessonTypeSelectorOpen] = useState<boolean>(false);
  const [lessonType, setLessonType] = useState<string>(LessonTypes.History);

  return fontsLoaded ? (
    <AuthProvider>
      <LessonTypeContext.Provider
        value={{
          lessonType: lessonType,
          setLessonType: setLessonType,
          setLessonTypeSelectorOpen: setLessonTypeSelectorOpen,
          lessonTypeSelectorOpen: lessonTypeSelectorOpen,
        }}
      >
        <LessonsContext.Provider
          value={{ lessons: lessons, setLessons: setLessons }}
        >
            <AppNavigator />
        </LessonsContext.Provider>
      </LessonTypeContext.Provider>
      <StatusBar backgroundColor={'transparent'} translucent/>
    </AuthProvider>
    
  ) : (
    <GlobalLoader isVisible={true} />
  );
}