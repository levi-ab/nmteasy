import { StyleSheet, Text, View,ScrollView, Dimensions } from "react-native";
import { colors } from "../styles";
import { useAuth } from "../data/AuthContext";
import { LeaguesToUkrainianMap } from "../utils/constants";
import { G, Path, Svg, Text as SvgText } from "react-native-svg";
import { Circle } from "react-native-svg";
import { useEffect, useState } from "react";
import { ILeague } from "../data/models/user";
import leagueService from "../services/leagueService";
import GlobalLoader from "../components/common/GlobalLoader";
import { getColorForLeague, getColorForPlace } from "../utils/themes";

const Leagues = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();

  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentLeague, setCurrentLeague] = useState<ILeague>();

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
    setLoading(true);
    leagueService
      .getLeagues(token)
      .then((res) => {
        setLeagues(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    leagueService
      .getCurrentLeague(token)
      .then((res) => {
        setCurrentLeague(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
              <Circle cx={100 / 2} cy={100 / 2} r={100 / 2} fill={getColorForLeague(league.title)} />
              <Svg
                viewBox="0 0 24 24"
                fill="none"
              >
                <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                <G
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></G>
                <G id="SVGRepo_iconCarrier">
                  <Path
                    d="M11.302 21.6149C11.5234 21.744 11.6341 21.8086 11.7903 21.8421C11.9116 21.8681 12.0884 21.8681 12.2097 21.8421C12.3659 21.8086 12.4766 21.744 12.698 21.6149C14.646 20.4784 20 16.9084 20 12V6.6C20 6.04207 20 5.7631 19.8926 5.55048C19.7974 5.36198 19.6487 5.21152 19.4613 5.11409C19.25 5.00419 18.9663 5.00084 18.3988 4.99413C15.4272 4.95899 13.7136 4.71361 12 3C10.2864 4.71361 8.57279 4.95899 5.6012 4.99413C5.03373 5.00084 4.74999 5.00419 4.53865 5.11409C4.35129 5.21152 4.20259 5.36198 4.10739 5.55048C4 5.7631 4 6.04207 4 6.6V12C4 16.9084 9.35396 20.4784 11.302 21.6149Z"
                    stroke={colors.grays20}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></Path>
                </G>
              </Svg>
            </Svg>
          </View>
        ))}
      </ScrollView>
      <ScrollView style={styles.usersContainer}>
        {currentLeague?.users
          ?.sort((a, b) => b.points - a.points)
          .map((x, index) => (
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
      <GlobalLoader isVisible={loading} />
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
    height: "100%",
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