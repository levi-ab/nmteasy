import { View } from "react-native";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../styles";
import IslandButton from "../components/common/IslandButton";
import StartLevelModal from "../components/StartLevelModal";
import historyLessonService from "../../services/historyLessonService";
import { ILesson } from "../../models/lessons";

const HomeScreen = ({}) => {
  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);
  const [historyLessons, setHistoryLessons] = useState<ILesson[]>();

  useEffect(() => {
    historyLessonService.getHistoryLessons()
    .then((res) => setHistoryLessons(res))
    .catch((err) => console.error(err));
  }, []);


  const isLandRenderItem = ({ item , index }: {item: ILesson, index: number}) => {
    let marginRight = 0;
    if (index % 5 >= 3) {
      marginRight = (-index % 5) * 30;
    } else {
      marginRight = (index % 5) * 60;
    }

    return (
      <IslandButton
        percentage={100}
        key={item.id}
        marginLeft={0}
        marginTop={20}
        marginRight={marginRight}
        onPress={() => setSelectedLevelID(item.id)}
      />
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.grays100 }}>
      <StartLevelModal
        setSelectedLevelID={setSelectedLevelID}
        selectedLevelID={selectedLevelID}
        levelTitle={historyLessons?.filter(element => element.id === selectedLevelID)[0]?.proper_title ?? ""}
      />
      <FlatList
        data={historyLessons}
        renderItem={isLandRenderItem}
        keyExtractor={(item) => item.id.toString()}
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
