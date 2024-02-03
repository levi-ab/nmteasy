import { ScrollView, SectionList, Text, View } from "react-native";
import { SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../styles";
import IslandButton from "../components/common/IslandButton";
import StartLevelModal from "../components/StartLevelModal";
import historyLessonService from "../../services/historyLessonService";
import { ILesson, ILessonByGeneralTitle } from "../../models/lessons";
import { getLessonTitleById } from "../../utils/utils";
import CloudTitleBanner from "../components/common/CloudTitleBanner";
import { MemoizedIsLandRenderItem } from "../components/common/IslandRenderItem";

const HomeScreen = ({}) => {
  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);
  const [historyLessons, setHistoryLessons] = useState<ILessonByGeneralTitle[]>([]);

  useEffect(() => {
    historyLessonService.getHistoryLessons()
    .then((res) => setHistoryLessons(res))
    .catch((err) => console.error(err));
  }, []);


const handleLevelPress = useCallback((id: SetStateAction<string | null>) => {
  setSelectedLevelID(id);
}, [setSelectedLevelID]);

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.grays100 }}
    >
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={getLessonTitleById(selectedLevelID, historyLessons)}
      />
      <SectionList
        sections={historyLessons}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <MemoizedIsLandRenderItem
            item={item}
            index={index}
            handleLevelPress={handleLevelPress}
          />
        )}
        initialNumToRender={5}
        renderSectionHeader={({ section: { title } }) => (
          <CloudTitleBanner title={title} />
        )}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: colors.basicGray,
        }}
      />
    </View>
  );
};

export default HomeScreen;
