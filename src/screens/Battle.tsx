import { useContext, useEffect, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import LessonTypeContext from "../data/LessonsTypeContext";
import GlobalLoader from "../components/common/GlobalLoader";
import { colors } from "../styles";
import PressableButton from "../components/common/PressableButton";
import { getThemePrimaryColor, getThemeSecondaryColor } from "../utils/themes";

const Battle = () => {
    const { lessonTypeSelectorOpen, lessonType, setLessonTypeSelectorOpen } = useContext(LessonTypeContext);
    const [searchingForBattle, setSearchingForBattle] = useState(false);
    const [isBattleLoading, setIsBattleLoading] = useState(false);

    const handleFindBattlePressed = () => {
        setSearchingForBattle(!searchingForBattle)
        setIsBattleLoading(!isBattleLoading)
    }

    return (
      <View style={styles.container}>
        {lessonTypeSelectorOpen ? (
          <Pressable
            style={styles.selectorOpenBackGround}
            onPress={() => setLessonTypeSelectorOpen(false)}
          />
        ) : null}
        <ActivityIndicator
          size="large"
          color={getThemePrimaryColor(lessonType)}
          style={{ height: 150 }}
        />
        <PressableButton
          onPress={handleFindBattlePressed}
          text={searchingForBattle ? "Скасувати" : "Баттл"}
          style={{
            backgroundColor: searchingForBattle
              ? colors.red
              : getThemePrimaryColor(lessonType),
            height: 60,
            width: "60%",
            borderRadius: 20,
          }}
          buttonShadow={
            searchingForBattle
              ? colors.redShadow
              : getThemeSecondaryColor(lessonType)
          }
          textStyle={{
            color: colors.grays80,
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 18,
          }}
        />
        <GlobalLoader isVisible={false} />
      </View>
    );
}

export default Battle;

const styles = StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      backgroundColor: colors.basicGray
    },
  
    selectorOpenBackGround: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: colors.gray,
      opacity: 0.5,
    },
  
    notFoundText: {
      fontSize: 20,
      fontFamily: "Inter-Black"
    }
  });
  