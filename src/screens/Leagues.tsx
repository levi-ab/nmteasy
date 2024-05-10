import { StyleSheet, Text, View,ScrollView, Dimensions } from "react-native";
import { colors } from "../styles";
import { useAuth } from "../data/AuthContext";
import { AvailableLeagues, LeaguesToUkrainianMap } from "../utils/constants";
import { Defs, G, LinearGradient, Path, Stop, Svg, Text as SvgText } from "react-native-svg";
import { Circle } from "react-native-svg";
import { useEffect, useState } from "react";
import { ILeague } from "../data/models/user";
import leagueService from "../services/leagueService";
import GlobalLoader from "../components/common/GlobalLoader";
import { getColorForLeague, getColorForPlace, getShieldSvgForLeague } from "../utils/themes";

const Leagues = () => {
  const {
    state: { user, token },
    dispatch,
  } = useAuth();

  const [loading, setLoading] = useState(false);
  const [currentLeague, setCurrentLeague] = useState<ILeague>();


  useEffect(() => {
    setLoading(true);
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

  const userLeagueIndex = AvailableLeagues.findIndex(x => x === currentLeague?.title)

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal={true}
        style={{ height: 250 }}
        snapToAlignment="center"
        snapToInterval={Dimensions.get("window").width}
        contentOffset={{
          x: userLeagueIndex * Dimensions.get("window").width,
          y: 0,
        }}
      >
        {AvailableLeagues.map((league, index) => (
          <View style={styles.leagueBatchContainer} key={league + index}>
            <Text style={styles.text}>
              {LeaguesToUkrainianMap[league ?? ""]}
            </Text>
            {index > userLeagueIndex && (
              <Svg
                viewBox="0 0 24 24"
                fill="none"
                width={70}
                height={70}
                style={{ position: "absolute", top: 80, zIndex: 10 }}
              >
                <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
                <G
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></G>
                <G id="SVGRepo_iconCarrier">
                  <Path
                    d="M7 10.0288C7.47142 10 8.05259 10 8.8 10H15.2C15.9474 10 16.5286 10 17 10.0288M7 10.0288C6.41168 10.0647 5.99429 10.1455 5.63803 10.327C5.07354 10.6146 4.6146 11.0735 4.32698 11.638C4 12.2798 4 13.1198 4 14.8V16.2C4 17.8802 4 18.7202 4.32698 19.362C4.6146 19.9265 5.07354 20.3854 5.63803 20.673C6.27976 21 7.11984 21 8.8 21H15.2C16.8802 21 17.7202 21 18.362 20.673C18.9265 20.3854 19.3854 19.9265 19.673 19.362C20 18.7202 20 17.8802 20 16.2V14.8C20 13.1198 20 12.2798 19.673 11.638C19.3854 11.0735 18.9265 10.6146 18.362 10.327C18.0057 10.1455 17.5883 10.0647 17 10.0288M7 10.0288V8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8V10.0288"
                    stroke={colors.grays60}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></Path>
                </G>
              </Svg>
            )}
            <Svg height={100} width={100}>
              <Defs>
                <LinearGradient id="gradient" x1="0%" y1="99%" x2="0%" y2="0%">
                  <Stop
                    offset="0%"
                    stopColor={colors.grays30}
                    stopOpacity={1}
                  />
                  <Stop
                    offset="0%"
                    stopColor={colors.grays40}
                    stopOpacity={1}
                  />
                  <Stop
                    offset="100%"
                    stopColor={getColorForLeague(league)}
                    stopOpacity={1}
                  />
                </LinearGradient>
              </Defs>
              <Circle
                cx={100 / 2}
                cy={100 / 2}
                r={100 / 2}
                fill="url(#gradient)"
              />
              <Svg viewBox="0 0 24 24" fill="none">
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
            {getShieldSvgForLeague(league)}
          </View>
        ))}
      </ScrollView>
      <ScrollView style={styles.usersContainer}>
        {currentLeague?.users
          ?.sort((a, b) => b.weekly_points - a.weekly_points)
          .map((x, index) => (
            <View
              key={index}
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
                {x?.weekly_points} xp
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
    position:"relative",
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