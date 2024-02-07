import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { useAuth } from "../data/AuthContext";
import CustomDrawer from "./Drawer";
import HomeScreen from "../screens/Home";
import Lesson from "../screens/Lesson";
import SignIn from "../screens/SignIn";
import { colors } from "../styles";
import { View } from "react-native";
import SignUp from "../screens/SignUp";
import Settings from "../screens/Settings";
import Analytics from "../screens/Analytics";

const Drawer = createDrawerNavigator<any>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={state.user ? "Home" : "SignIn"}
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: !!state.user,
          headerStyle: { backgroundColor: colors.themeSecondary },
          drawerActiveTintColor: colors.themeSecondary,
          drawerInactiveTintColor: colors.white,
          drawerItemStyle: {},

          drawerLabelStyle: {
            fontSize: 15,
          },
        }}
      >
        {state.user ? (
          <>
            <Drawer.Screen
              name="Home"
              component={HomeScreen}
              options={{ drawerLabel: "Головна", title: "Головна" }}
            />
            <Drawer.Screen
              name="Аналітика"
              component={Analytics}
              options={{ drawerLabel: "Аналітика", title: "Аналітика", unmountOnBlur:true }}
            />
            <Drawer.Screen
              name="Settings"
              component={Settings}
              options={{
                drawerLabel: "Налаштування",
                title: "Налаштування",
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Lesson"
              component={Lesson}
              options={{
                drawerItemStyle: { height: 0 },
                unmountOnBlur: true,
                header: ({ navigation, route, options }) => {
                  return <View />;
                },
              }}
            />
          </>
        ) : (
          <>
            <Drawer.Screen
              name="SignIn"
              component={SignIn}
              options={{ drawerLabel: "Увійти", title: "Увійти" }}
            />
            <Drawer.Screen
              name="SignUp"
              component={SignUp}
              options={{
                drawerLabel: "Зареєструватись",
                title: "Зареєструватись",
              }}
            />
          </>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
