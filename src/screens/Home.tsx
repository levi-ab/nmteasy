import { Button, View, Text, TouchableWithoutFeedback, Animated, StyleSheet, Modal, Pressable } from "react-native";
import IslandButton from "../components/common/IslandButton";
import CircularProgress from "../components/common/progresstest";
import { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { colors } from "../styles";
import StartLevelModal from "../components/StartLevelModal";



const HomeScreen = ({ navigation }) => {
  const levelDummyData = [
    { percentage: 89, id: 1 },
    { percentage: 45, id: 2 },
    { percentage: 2, id: 3 },
    { percentage: 73, id: 4 },
    { percentage: 34, id: 5 },
    { percentage: 18, id: 6 },
    { percentage: 96, id: 7 },
    { percentage: 61, id: 8 },
    { percentage: 52, id: 9 },
    { percentage: 83, id: 10 },
    { percentage: 12, id: 11 },
    { percentage: 79, id: 12 },
    { percentage: 64, id: 13 },
    { percentage: 50, id: 14 },
    { percentage: 29, id: 15 },
    { percentage: 14, id: 16 },
    { percentage: 6, id: 17 },
    { percentage: 98, id: 18 },
    { percentage: 41, id: 19 },
    { percentage: 25, id: 20 },
    { percentage: 91, id: 21 },
    { percentage: 70, id: 22 },
    { percentage: 57, id: 23 },
    { percentage: 78, id: 24 },
    { percentage: 39, id: 25 },
    { percentage: 23, id: 26 },
    { percentage: 80, id: 27 },
    { percentage: 67, id: 28 },
    { percentage: 53, id: 29 },
    { percentage: 100, id: 30 },
  ];

  const [selectedLevelID, setSelectedLevelID] = useState<null | string>(null);

  const isLandRenderItem = ({ item, index }) => {
    let marginRight = 0;
    if(index % 5 >= 3){
      marginRight = -index % 5 * 30
    } else {
      marginRight = index % 5 * 60
    }

    return (
      <IslandButton
        percentage={item.percentage}
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
      <StartLevelModal setSelectedLevelID={setSelectedLevelID} selectedLevelID={selectedLevelID}/>
       <FlatList
        data={levelDummyData}
        renderItem={isLandRenderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{alignItems: "center", justifyContent: "center", backgroundColor: colors.basicGray}}
      />
    </View>
  );
}

export default HomeScreen;