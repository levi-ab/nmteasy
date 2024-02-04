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
import UserContext, { AuthInterface, defaultUserAuthValue } from "./src/data/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageUserKey } from "./utils/constants";

const Drawer = createDrawerNavigator();


export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./src/assets/fonts/Inter-Black.otf'),
  });

  const navigation = useNavigation<NavigationProp<any>>();
  const [userData, setUserData] = useState<AuthInterface>(defaultUserAuthValue)

  useEffect(() => {
    void async function GetUserData() {
      try {
        const jsonValue = await AsyncStorage.getItem(StorageUserKey);
        if(jsonValue === null){
          navigation.navigate("Login")
          return
        }

        const data = JSON.parse(jsonValue);
        setUserData(data);
      } catch (e) {
        console.error(e)
      }
    }();
}, []);

  return (
    <UserContext.Provider value={userData}>
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
    </UserContext.Provider>
  );
}
