import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer, NavigationProp, useNavigation } from "@react-navigation/native";
import HomeScreen from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import CustomDrawer from "./src/components/Drawer";
import { colors } from "./src/styles";
import Lesson from "./src/screens/Lesson";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageUserKey } from "./utils/constants";
import { AuthProvider } from "./src/data/AuthContext";
import AppNavigator from "./src/components/AppNavigator";

const Drawer = createDrawerNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.otf'),
  });

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
