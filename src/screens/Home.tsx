import {
  Pressable,
  RefreshControl,
  ScrollView,
  SectionList,
  Text,
  View,
} from "react-native";
import {
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import LessonTypeContext from "../data/LessonsTypeContext";
import GlobalLoader from "../components/common/GlobalLoader";

type ParamList = {
  Home: {
    revalidate: boolean;
  };
};

const HomeScreen = () => {
  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { lessons, setLessons } = useContext(LessonsContext);
  const { lessonTypeSelectorOpen, lessonType, setLessonTypeSelectorOpen } = useContext(LessonTypeContext);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    LessonService.getLessons(token, lessonType)
      .then((res) => {setLessons(res); setIsLoading(false)})
      .catch((err) => {console.error(err); setIsLoading(false)});
  }, [lessonType]);

  const handleLevelPress = useCallback(
    (id: SetStateAction<string | null>) => {
      setSelectedLevelID(id);
    },
    [setSelectedLevelID]
  );

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    LessonService.getLessons(token, lessonType)
      .then((res) => {
        setRefreshing(false);
        setIsLoading(false);
        setLessons(res);
      })
      .catch((err) => {
        setIsLoading(false)
        setRefreshing(false);
        console.error(err);
      });
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
        scrollEnabled={!lessonTypeSelectorOpen}
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
      {lessonTypeSelectorOpen ? (
        <Pressable
          style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: colors.gray, opacity: 0.5 }}
          onPress={() => setLessonTypeSelectorOpen(false)}
        />
      ) : null}
      <GlobalLoader isVisible={isLoading} />
    </View>
  );
};

export default HomeScreen;
