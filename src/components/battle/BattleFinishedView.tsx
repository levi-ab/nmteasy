import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../../styles";
import {
  getThemePrimaryColor,
  getThemeSecondaryColor,
} from "../../utils/themes";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { useContext } from "react";
import PressableButton from "../common/PressableButton";
import { useAuth } from "../../data/AuthContext";
import IUser from "../../data/models/user";

const BattleFinishedView = ({
  userRightAnswerCount,
  opponentRightAnswerCount,
  opponentName
}: {
  userRightAnswerCount: number;
  opponentRightAnswerCount: number;
  opponentName: string;
}) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { lessonType } = useContext(LessonTypeContext);
  const {
    state: { user, token },
    dispatch,
  } = useAuth();

  const handleGoAway = () => {
    const updatedUserData = {
      ...user,
      points: (user?.points as number) + userRightAnswerCount,
    };
    dispatch({
      type: "SIGN_IN",
      payload: { user: updatedUserData as IUser, token: token },
    });
    navigation.navigate("Home");
  };

  return (
    <View style={{ width: "100%", padding: 30, gap: 30, alignItems: "center" }}>
      <Image
        source={require("../../assets/award.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text
        style={[styles.header, { color: getThemePrimaryColor(lessonType) }]}
      >
        Вітання!
      </Text>
      <View>
        <View
          style={[
            styles.analyticsBox,
            { borderColor: getThemePrimaryColor(lessonType) },
          ]}
        >
          <Text style={styles.smallLabel}>Ти набрав:</Text>
          <Text
            style={[styles.label, { color: getThemePrimaryColor(lessonType) }]}
          >
            {userRightAnswerCount} очок
          </Text>
        </View>
        <View
          style={[
            styles.analyticsBox,
            { borderColor: getThemePrimaryColor(lessonType) },
          ]}
        >
          <Text style={styles.smallLabel}>{opponentName} набрав:</Text>
          <Text
            style={[styles.label, { color: getThemePrimaryColor(lessonType) }]}
          >
            {opponentRightAnswerCount} очок
          </Text>
        </View>
      </View>
      <PressableButton
        onPress={handleGoAway}
        text={"Головна"}
        style={{
          backgroundColor: getThemePrimaryColor(lessonType),
          height: 60,
          width: "60%",
          borderRadius: 20,
        }}
        buttonShadow={getThemeSecondaryColor(lessonType)}
        textStyle={{
          color: colors.grays80,
          fontWeight: "bold",
          textAlign: "center",
          fontSize: 18,
        }}
      />
    </View>
  );
};

export default BattleFinishedView;

const styles = StyleSheet.create({
  analyticsBox: {
    flexDirection: "row",
    width: "100%",
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  smallLabel: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.grays30,
    fontFamily: "Inter-Black",
  },
  header: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "Inter-Black",
    textAlign: "center",
    width: "100%",
  },
  label: {
    fontFamily: "Inter-Black",
    fontWeight: "500",
  },
});
