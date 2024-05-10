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
  useMemo,
  useRef,
  useState,
} from "react";
import { colors } from "../styles";
import StartLevelModal from "../components/modals/StartLevelModal";
import { ILessonByGeneralTitle } from "../data/models/lessons";
import { getLessonTitleById, isConnectedToInternet, mapSavedLessonToRealLesson } from "../utils/utils";
import CloudTitleBanner from "../components/common/CloudTitleBanner";
import { MemoizedIsLandRenderItem } from "../components/common/IslandRenderItem";
import { useAuth } from "../data/AuthContext";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import LessonsContext from "../data/LessonsContext";
import LessonTypeContext from "../data/LessonsTypeContext";
import GlobalLoader from "../components/common/GlobalLoader";
import { useLessonSearch } from "../data/LessonSearchContext";
import { getThemePrimaryColor } from "../utils/themes";
import lessonService from "../services/lessonService";
import Toast from "react-native-toast-message";

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
  const navigation = useNavigation<NavigationProp<any>>();
  const memoizedLessonType = useMemo(() => lessonType, [lessonType]);
  const {
    state: { token },
  } = useAuth();

  useEffect(() => {
    setIsLoading(true);
    fetchLessons();
  }, [lessonType]);

  async function fetchLessons() {
    if(await isConnectedToInternet()) {
      lessonService.getLessons(token, lessonType)
      .then((res) => {setLessons(res); setIsLoading(false)})
      .catch((err) => {console.error(err); setIsLoading(false)});
    } else {
      lessonService
        .getLocalLessonsKeys(lessonType)
        .then((res) => {
          setLessons(
            res.map((item: string) => (mapSavedLessonToRealLesson(item)))
          );
          setIsLoading(false);
          setRefreshing(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          setRefreshing(false);
        });
    }
  }

  const handleLevelPress = useCallback(
    (id: SetStateAction<string | null>) => {
      setSelectedLevelID(id);
    },
    [setSelectedLevelID]
  );

  const showToast = (text: string, type: "success" | "error") => {
    Toast.show({
      type: type,
      text1: type === "error" ? "Помилочка" : "Повідомлення",
      text2: text,
    });
  };

  const onRefresh = () => {
    setRefreshing(true);
    setIsLoading(true);
    fetchLessons();
  };

  const filteredLessons = lessons.filter((lesson) =>
    lesson.title?.toLocaleLowerCase().includes(lessonSearch.toLocaleLowerCase())
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.basicGray }}>
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={getLessonTitleById(selectedLevelID, lessons)}
        showSaveLocallyBtn={true}
        showToast={showToast}
        onButtonPress={() =>
          navigation.navigate("Lesson", {
            lessonID: selectedLevelID,
            lessonTitle: getLessonTitleById(selectedLevelID, lessons)
          })
        }
      />
      {filteredLessons.length || isLoading ? (
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
              lessonType={memoizedLessonType}
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
      <Toast />
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
