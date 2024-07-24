import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerScreenProps,
} from "@react-navigation/drawer";
import { useAuth } from "../../data/AuthContext";
import CustomDrawer from "./Drawer";
import HomeScreen from "../../screens/Home";
import Lesson from "../../screens/Lesson";
import SignIn from "../../screens/SignIn";
import { colors } from "../../styles";
import { View } from "react-native";
import SignUp from "../../screens/SignUp";
import Settings from "../../screens/Settings";
import Analytics from "../../screens/Analytics";
import { getHeaderTitle } from '@react-navigation/elements';
import AppHeader from "./AppHeader";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { getThemePrimaryColor } from "../../utils/themes";
import Leagues from "../../screens/Leagues";
import Questions from "../../screens/Questions";
import Battle from "../../screens/Battle";
import Introduction from "../../screens/Introduction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NOT_FIRST_TIME } from "../../utils/constants";

const Drawer = createDrawerNavigator<any>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();
  const { lessonType } = useContext(LessonTypeContext);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={state.user ? "Home" : "SignIn"}
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          swipeEnabled: false,
          headerShown: !!state.user,
          headerStyle: { backgroundColor: getThemePrimaryColor(lessonType) },
          drawerActiveTintColor: getThemePrimaryColor(lessonType),
          drawerInactiveTintColor: colors.white,
          drawerItemStyle: {},
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            return <AppHeader title={title} navigation={navigation} />;
          },
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
              name="League"
              component={Leagues}
              options={{
                drawerLabel: "Ліга",
                title: "Ліга",
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Questions"
              component={Questions}
              options={{
                drawerLabel: "Інші Режими",
                title: "Інші Режими",
                unmountOnBlur: true,
              }}
            />
            <Drawer.Screen
              name="Battle"
              component={Battle}
              options={{
                drawerLabel: "Баттл",
                title: "Баттл",
                unmountOnBlur: true,
                header: ({ navigation, route, options }) => {
                  return <View />;
                },
              }}
            />
            <Drawer.Screen
              name="Analytics"
              component={Analytics}
              options={{
                drawerLabel: "Аналітика",
                title: "Аналітика",
              }}
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
              name="Introduction"
              component={Introduction}
              options={{ drawerLabel: "Увійти", title: "Увійти" }}
            />
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
