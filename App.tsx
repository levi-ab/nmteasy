import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./src/screens/Home";
import SignIn from "./src/screens/SignIn";
import CustomDrawer from "./src/components/Drawer";
import { colors } from "./src/styles";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: true,
          drawerActiveTintColor: colors.themePrimary,
          drawerInactiveTintColor: colors.white,
          drawerItemStyle: {
          },
          drawerLabelStyle: {
            fontFamily: "Roboto-Medium",
            fontSize: 15,
          },
        }}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="SignIn" component={SignIn} />
        <Drawer.Screen name="Home1" component={HomeScreen} />
        <Drawer.Screen name="SignIn12" component={SignIn} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
