import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import CustomDrawer from "./src/components/Drawer";
import { colors } from "./src/styles";
import Lesson from "./src/screens/Lesson";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from "expo-font";
import { useCallback } from "react";

const Drawer = createDrawerNavigator();


export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.otf'),
  });

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: colors.themeSecondary },
          drawerActiveTintColor: colors.themeSecondary,
          drawerInactiveTintColor: colors.white,
          drawerItemStyle: {},

          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Home1" component={HomeScreen} />
        <Drawer.Screen name="SignIn12" component={SignIn} />
        <Drawer.Screen
          name="Lesson"
          component={Lesson}
          options={{
            unmountOnBlur: true,
            header: ({ navigation, route, options }) => {
              return <View />;
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
