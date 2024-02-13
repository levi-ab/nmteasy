import { StyleSheet, Platform, StatusBar } from "react-native";
import { colors } from "../../styles";

export default StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: colors.basicGray,
    marginTop: Platform.OS === "android" ? -Number(StatusBar.currentHeight) : 0
  },
});