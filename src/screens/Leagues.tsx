import { StyleSheet, Text, View,ScrollView, Dimensions } from "react-native";
import { colors } from "../styles";
import { useAuth } from "../data/AuthContext";
import { LeaguesToUkrainianMap } from "../utils/constants";
import { Svg, Text as SvgText } from "react-native-svg";
import { Circle } from "react-native-svg";
import { useEffect, useState } from "react";
import { ILeague } from "../data/models/user";
import leagueService from "../services/leagueService";

const Leagues = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();

  const [leagues, setLeagues] = useState<ILeague[]>([])

  const peopleData = [
    {
      id: 3,
      first_name: "Mike",
      last_name: "Johnson",
      username: "mikejohnson",
      points: 150,
    },
    {
      id: 10,
      first_name: "Sophia",
      last_name: "Clark",
      username: "sophiaclark",
      points: 140,
    },
    {
      id: 6,
      first_name: "Sarah",
      last_name: "Williams",
      username: "sarahwilliams",
      points: 130,
    },
    {
      id: 1,
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      points: 120,
    },
    {
      id: 5,
      first_name: "Alex",
      last_name: "Taylor",
      username: "alextaylor",
      points: 110,
    },
    {
      id: 8,
      first_name: "Olivia",
      last_name: "Jones",
      username: "oliviajones",
      points: 115,
    },
    {
      id: 7,
      first_name: "Chris",
      last_name: "Miller",
      username: "chrismiller",
      points: 95,
    },
    {
      id: 2,
      first_name: "Jane",
      last_name: "Smith",
      username: "janesmith",
      points: 90,
    },
    {
      id: 9,
      first_name: "Daniel",
      last_name: "Lee",
      username: "daniellee",
      points: 100,
    },
    {
      id: 4,
      first_name: "Emily",
      last_name: "Brown",
      username: "emilybrown",
      points: 80,
    },
    user
  ];

  useEffect(() => {
    leagueService
      .getLeagues(token)
      .then((res) => setLeagues(res))
      .catch((err) => console.error(err));
  }, []);

 
  const getColorForPlace = (index: number) => {
    if (index === 0) {
      return colors.gold;
    }

    if (index === 1) {
      return colors.grays20;
    }

    if (index === 2) {
      return colors.historyThemeSecondary;
    }

    return colors.grays40;
  };

  const getDefaultScrollOffset = () => {
    for (let index = 0; index < leagues.length; index++) {
        if(user?.league.id === leagues[index].id){
            return index * Dimensions.get("window").width
        }
    }

    return 0;
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={{ height: 250 }}
        snapToAlignment="center"
        snapToInterval={Dimensions.get("window").width}
        contentOffset={{ x: getDefaultScrollOffset(), y: 0 }}
      >
        {leagues.map((league) => (
          <View style={styles.leagueBatchContainer} key={league.id}>
            <Text style={styles.text}>
              {LeaguesToUkrainianMap[league.title ?? ""]}
            </Text>
            <Svg height={100} width={100}>
              <Circle cx={100 / 2} cy={100 / 2} r={100 / 2} fill={"#3498db"} />
              <SvgText
                x="50%"
                y="50%"
                fontSize={20}
                fontWeight="bold"
                textAnchor="middle"
                alignmentBaseline="central"
                fill={"#ffffff"}
              ></SvgText>
            </Svg>
          </View>
        ))}
      </ScrollView>
      <ScrollView style={styles.usersContainer}>
        {peopleData.map((x, index) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 20,
            }}
          >
            <Text style={[styles.text, { color: getColorForPlace(index) }]}>
              #{index + 1}
            </Text>
            <Text style={styles.text}>
              {x?.first_name + " " + x?.last_name}
            </Text>
            <Text style={[styles.text, { color: colors.gold }]}>
              {x?.points} xp
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default Leagues;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    flex: 1,
    backgroundColor: colors.basicGray,
    justifyContent: "center",
    alignItems: "center"
  },

  usersContainer: {
    marginTop: 50,
    width: "100%",
  },

  leagueBatchContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    flexDirection: "column",
    paddingVertical: 20,
  },
  text: {
    textAlign: "left",
    fontSize: 20,
    fontFamily: "Inter-Black",
    color: colors.grays40,
    marginBottom: 20
  }
});