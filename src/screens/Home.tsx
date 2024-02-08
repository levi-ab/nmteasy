import { RefreshControl, ScrollView, SectionList, Text, View } from "react-native";
import { SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import { colors } from "../styles";
import StartLevelModal from "../components/modals/StartLevelModal";
import LessonService from "../services/LessonService";
import { ILessonByGeneralTitle } from "../data/models/lessons";
import { getLessonTitleById } from "../utils/utils";
import CloudTitleBanner from "../components/common/CloudTitleBanner";
import { MemoizedIsLandRenderItem } from "../components/common/IslandRenderItem";
import { useAuth } from "../data/AuthContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import LessonsContext from "../data/LessonsContext";

type ParamList = {
  Home: {
    revalidate: boolean;
  };
};

const HomeScreen = () => {
  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);
  const [refreshing, setRefreshing] = useState(false);
  const {lessons, setLessons} = useContext(LessonsContext);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    LessonService
      .getLessons(token)
      .then((res) => setLessons(res))
      .catch((err) => console.error(err));
  }, []);

  const handleLevelPress = useCallback(
    (id: SetStateAction<string | null>) => {
      setSelectedLevelID(id);
    },
    [setSelectedLevelID]
  );

  const onRefresh = () => { 
    setRefreshing(true); 
    LessonService
    .getLessons(token)
      .then((res) => {setRefreshing(false); setLessons(res)})
      .catch((err) => {setRefreshing(false); console.error(err) });
  }; 

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={getLessonTitleById(selectedLevelID, lessons)}
      />
      <SectionList
        sections={lessons}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
