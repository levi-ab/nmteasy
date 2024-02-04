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

type AppDrawerParamList = {
  Home: undefined;
  SignIn: undefined;
  Lesson: undefined;
};

const Drawer = createDrawerNavigator<AppDrawerParamList>();

const AppNavigator: React.FC = () => {
  const { state } = useAuth();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName={state.user ? "Home" : "SignIn"}
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
        {state.user ? (
          <>
            <Drawer.Screen name="Home" component={HomeScreen} />
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
          <Drawer.Screen name="SignIn" component={SignIn} />
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;