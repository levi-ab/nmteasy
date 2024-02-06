import { useState } from "react";
import { useAuth } from "../data/AuthContext";
import Toast from "react-native-toast-message";
import { colors } from "../styles";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import GlobalLoader from "../components/common/GlobalLoader";

const Analytics = () => {

    const {
        state: { user, token },
        dispatch,
      } = useAuth();
      const [isLoading, setIsLoading] = useState(false);
    
    
      const showToast = (text: string, type: "success" | "error") => {
        Toast.show({
          type: type,
          text1: type === "error" ? "Помилочка" : "Повідомлення",
          text2: text,
        });
      };


    return (
        <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <ScrollView style={{ flex: 1, backgroundColor: colors.basicGray, padding: 20 }}>
        <Text style={styles.header}>Аналітика</Text>
        <Text style={styles.smallLabel}>Тут зібраний твій прогрес
        </Text>
        <View
          style={{
            marginVertical: 25,
            borderBottomColor: colors.grays10,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />

      </ScrollView>
      <Toast />
      <GlobalLoader isVisible={isLoading}/>
    </View>
    )
}

export default Analytics;

const styles = StyleSheet.create({
    smallLabel: {
      fontWeight: "600",
      fontSize: 14,
      color: colors.grays30,
      fontFamily: "Inter-Black",
    },
    signUpLabel: {
      fontWeight: "400",
      fontSize: 14,
      color: colors.themePrimary,
      fontFamily: "Inter-Black",
    },
    header: {
      fontSize: 22,
      marginBottom: 10,
      color: colors.themePrimary,
      fontFamily: "Inter-Black",
      textAlign: "left",
      width: "100%",
    },
    label: {
      fontFamily: "Inter-Black",
      fontWeight: "500",
      color: colors.themePrimary,
    },
    input: {
      height: 45,
      color: colors.themeSecondary,
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      borderRadius: 10,
    },
    button: {
      backgroundColor: colors.themePrimary,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: "white",
      textAlign: "center",
    },
  });