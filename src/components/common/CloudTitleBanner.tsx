import { Dimensions, StyleSheet, View,Text } from "react-native";
import { colors } from "../../styles";
import { ClipPath, Defs, G, Path, Rect, Svg} from "react-native-svg";

const CloudTitleBanner = ({ title }: { title: string }) => {
  return (
    <View style={styles.cloudContainer}>
      <Svg
        viewBox="0 0 1920 480"
        width={"100%"}
        height={80}
        preserveAspectRatio="xMinYMin slice"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <Defs>
          <ClipPath id="__lottie_element_2">
            <Rect width={1920} height={480} x={0} y={0} />
          </ClipPath>
        </Defs>
        <G clipPath="url(#__lottie_element_2)">
          <G
            transform="matrix(1,0,0,1,971.2106323242188,240)"
            opacity={1}
            style={{
              display: "block",
            }}
          >
            <G opacity={1} transform="matrix(1,0,0,1,0,0)">
              <Path
                fill="rgb(241,241,241)"
                fillOpacity={1}
                d="M-347,-177.5 C-401.5,-202 -464.0010070800781,-182 -492,-139 C-591.5,-157 -602,-77 -604.5,-78.5 C-607,-80 -639.5,-87 -664.5,-76.5 C-685,-90 -725.5,-110.5 -767,-96.5 C-808.5,-82.5 -814.5,-33.5 -814.5,-33.5 C-814.5,-33.5 -840.0460205078125,-38.48099899291992 -870,-26 C-888,-18.5 -898.5,0.5 -896.5,17.5 C-952.9639892578125,-1.3209999799728394 -964,47.5 -964,47.5 C-964,47.5 -1132,40 -1132,40 C-1132,40 -1104,454 -1104,454 C-1104,454 979.5,348 979.5,348 C979.5,348 984.5,165.5 979.5,84 C974.5,2.5 914.5,15.5 886.5,13 C880,-56 821,-40.5 806.5,-37 C800,-82 751,-106 717,-106 C683,-106 641,-72 633.5,-40 C631,-49 635.5919799804688,-63.08599853515625 603.5,-81.5 C573,-99 546,-80 546,-80 C546,-80 555.5,-137 485.5,-176 C425.635009765625,-209.35299682617188 361.5,-165 339.5,-140.5 C252,-152.5 235,-109 219.5,-78 C187.5,-86 177.5,-80 160,-77.5 C152.5,-84.5 119.83300018310547,-116.8499984741211 67,-101 C12,-84.5 13,-34 13,-34 C13,-34 -1,-34.5 -20,-34.5 C-39,-95 -83,-102 -108,-105 C-132.99899291992188,-108 -166.49899291992188,-86 -191.49899291992188,-50 C-222,-87.5 -253,-80 -277.5,-80.5 C-279,-104.5 -292.5010070800781,-153 -347,-177.5z"
              />
            </G>
          </G>
        </G>
      </Svg>
      <Text style={styles.cloudTitle}>
        {title}
      </Text>
    </View>
  );
};

export default CloudTitleBanner;

const styles = StyleSheet.create({
  cloudTitle: {
    padding: 20,
    color: colors.grays70,
    top: 18,
    textAlign: "center",
    position: "absolute",
    width: Dimensions.get('window').width,
    fontFamily: 'Inter-Black'
  },

  cloudContainer: {
   height: 80,
   width: Dimensions.get('window').width,
   position: "relative"
  },
});
