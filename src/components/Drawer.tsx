import React, { useContext } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors } from "../styles";
import { useAuth } from "../data/AuthContext";

const CustomDrawer = (props: any) => {

  const { state: { user }, dispatch } = useAuth();

  const handleSignOut = () => {
    dispatch({ type: 'SIGN_OUT' });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.basicGray,
        position: "relative",
        height: "100%",
      }}
    >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{
          opacity: 1,
          paddingTop: 0,
        }}
      >
        <ImageBackground
          source={require("../assets/gradient.png")}
          style={{
            flex: 1,
            alignItems: "center",
            paddingTop: 100,
            paddingBottom: 50,
            position: "relative",
          }}
        >
          <View style={styles.bellIcon}>
            <Image
              source={require("../assets/bell.png")}
              style={{ width: 20, height: 20 }}
            />
          </View>
          <Image
            source={require("../assets/user-icon.png")}
            style={{ width: 100, height: 100 }}
          />
          {user && (
            <Text
              style={{
                color: "#fff",
                fontSize: 18,
                marginBottom: 5,
              }}
            >
              {user.first_name + " " + user.last_name}
            </Text>
          )}
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "#fff",
                marginRight: 5,
              }}
            >
              280 Coins
            </Text>
          </View>
        </ImageBackground>
        <View
          style={{ flex: 1, backgroundColor: colors.basicGray, paddingTop: 10 }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
        }}
      >
        <TouchableOpacity onPress={() => {}} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: colors.lightGray,
              }}
            >
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSignOut()} style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: colors.lightGray,
              }}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bellIcon: {
    position: "absolute",
    top: 70,
    right: 20,
    padding: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 50,
  },
});

export default CustomDrawer;
