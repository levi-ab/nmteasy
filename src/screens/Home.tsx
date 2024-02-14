import {
  Image,
  Pressable,
  RefreshControl,
  ScrollView,
  SectionList,
  SectionListScrollParams,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
import { useLessonSearch } from "../data/LessonSearchContext";
import { getThemePrimaryColor } from "../utils/themes";

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
  const { lessonSearch } = useLessonSearch();
  const sectionListRef = useRef<SectionList>(null);
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

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title.toLocaleLowerCase().includes(lessonSearch.toLocaleLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={getLessonTitleById(selectedLevelID, lessons)}
      />
      {filteredLessons.length ? (
        <SectionList
          ref={sectionListRef}
          sections={filteredLessons}
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
      ) : (
        <View style={styles.container}>
          <Image
            source={require("../assets/nothing-to-see.png")}
            style={{ width: 120, height: 120 }}
          />
          <Text
            style={[
              styles.notFoundText,
              { color: getThemePrimaryColor(lessonType) },
            ]}
          >
            Нічого не знайдено
          </Text>
        </View>
      )}

      {lessonTypeSelectorOpen ? (
        <Pressable
          style={styles.selectorOpenBackGround}
          onPress={() => setLessonTypeSelectorOpen(false)}
        />
      ) : null}

      <GlobalLoader isVisible={isLoading} />
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 50
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
