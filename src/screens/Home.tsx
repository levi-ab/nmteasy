import { RefreshControl, ScrollView, SectionList, Text, View } from "react-native";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { colors } from "../styles";
import StartLevelModal from "../components/modals/StartLevelModal";
import historyLessonService from "../services/historyLessonService";
import { ILessonByGeneralTitle } from "../data/models/lessons";
import { getLessonTitleById } from "../utils/utils";
import CloudTitleBanner from "../components/common/CloudTitleBanner";
import { MemoizedIsLandRenderItem } from "../components/common/IslandRenderItem";
import { useAuth } from "../data/AuthContext";
import { RouteProp, useRoute } from "@react-navigation/native";

type ParamList = {
  Home: {
    revalidate: boolean;
  };
};

const HomeScreen = () => {
  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);
  const [historyLessons, setHistoryLessons] = useState<ILessonByGeneralTitle[]>(
    []
    );
  const [refreshing, setRefreshing] = useState(false);
  const {
    state: { token },
  } = useAuth();
  const route = useRoute<RouteProp<ParamList, "Home">>();
  const revalidate: boolean = route?.params?.revalidate;

  useEffect(() => {
    if (revalidate) {
      historyLessonService
        .getHistoryLessons(token)
        .then((res) => setHistoryLessons(res))
        .catch((err) => console.error(err));
    }
  }, [revalidate]);

  useEffect(() => {
    historyLessonService
      .getHistoryLessons(token)
      .then((res) => setHistoryLessons(res))
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
    historyLessonService
    .getHistoryLessons(token)
      .then((res) => {setRefreshing(false); setHistoryLessons(res)})
      .catch((err) => {setRefreshing(false); console.error(err) });
  }; 

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={getLessonTitleById(selectedLevelID, historyLessons)}
      />
      <SectionList
        sections={historyLessons}
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
