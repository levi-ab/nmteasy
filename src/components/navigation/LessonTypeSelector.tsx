import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { G, Path, Polygon, Svg } from "react-native-svg";
import { colors } from "../../styles";
import { Dispatch, SetStateAction, useContext } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { LessonTypes, LessonTypesToUkrainianMap } from "../../utils/constants";

const LessonTypeSelectorButton = () => {
  const { lessonType } = useContext(LessonTypeContext);
  const { lessonTypeSelectorOpen, setLessonTypeSelectorOpen } = useContext(LessonTypeContext);

  return (
    <TouchableOpacity style={styles.lessonTypeContainer} onPress={() => setLessonTypeSelectorOpen(!lessonTypeSelectorOpen)}>
      <Text style={styles.text}>{LessonTypesToUkrainianMap[lessonType]}</Text>
      <HistorySVG width={30} height={30}/>
    </TouchableOpacity>
  );
};

export default LessonTypeSelectorButton;

const styles = StyleSheet.create({
  lessonTypeContainer: {
    borderWidth: 2,
    borderColor: colors.basicGray,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    maxWidth: 120,
    textAlign:"center"
  },
});

export const HistorySVG = ({width, height, color} : {width: number, height: number, color?: string}) => (
  <Svg
    fill={color ?? colors.black}
    id="Capa_1"
    viewBox="0 0 31.289 31.288"
    width={width}
    height={height}
  >
    <G id="SvgRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SvgRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SvgRepo_iconCarrier">
      <G>
        <G>
          <Path d="M28.327,13.357v-1.735l-0.25-0.099c-0.079-0.031-1.804-0.698-4.188-0.808v0.792c1.729,0.085,3.104,0.483,3.646,0.663 v16.084c-1.117-0.449-2.403-0.676-3.827-0.676c-3.489,0-6.812,1.338-7.812,1.777v-6.39l0.465,0.513v-4.58h-1.191v4.58l0.465-0.513 v6.398c-1.013-0.419-4.5-1.745-7.993-1.745c-1.381,0-2.603,0.212-3.645,0.63v-16.08c0.608-0.203,2.264-0.682,4.305-0.682 c0.146,0,0.288,0.012,0.434,0.017v-0.789c-0.146-0.004-0.288-0.017-0.434-0.017c-2.721,0-4.76,0.792-4.844,0.825l-0.25,0.099 v1.607c-0.823,0.154-1.335,0.431-1.335,0.88c0,2.342,0,16.562,0,16.562h12.196c0.422,0.376,1.038,0.617,1.729,0.617 c0.691,0,1.308-0.24,1.729-0.617h11.889c0,0,0-15.739,0-16.562C29.416,13.742,29.001,13.504,28.327,13.357z"></Path>
          <Polygon points="24.505,5.806 7.774,5.806 7.774,6.861 9.411,6.861 9.411,15.41 11.047,15.41 11.047,6.861 13.159,6.861 13.159,15.41 14.794,15.41 14.794,6.861 17.539,6.861 17.539,15.41 19.175,15.41 19.175,6.861 21.286,6.861 21.286,15.41 22.921,15.41 22.921,6.861 24.505,6.861 "></Polygon>
          <Polygon points="16.273,0 6.932,5.317 25.455,5.317 "></Polygon>
          <Polygon points="24.505,15.727 23.845,15.727 8.702,15.727 7.934,15.727 7.934,16.939 7.353,16.939 7.353,18.155 25.193,18.155 25.193,16.939 24.505,16.939 24.505,16.333 "></Polygon>
        </G>
      </G>
    </G>
  </Svg>
);

export const UkrainianSvg = ({width, height} : {width: number, height: number}) => (
  <Svg
    viewBox="0 0 36 36"
    fill="#000000"
    width={width}
    height={height}
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <Path
        fill="#005BBB"
        d="M32 5H4a4 4 0 0 0-4 4v9h36V9a4 4 0 0 0-4-4z"
      ></Path>
      <Path
        fill="#FFD500"
        d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-9h36v9z"
      ></Path>
    </G>
  </Svg>
)

export const LessonTypeToSvg = (props :{width: number, height: number, lessonType: LessonTypes, color?: string} ) => {
  if(props.lessonType === LessonTypes.History){
    return  <HistorySVG width={props.width} height={props.height} color={props.color}/>
  }

  if(props.lessonType === LessonTypes.Ukrainian){
    return  <UkrainianSvg width={props.width} height={props.height} />
  }

  return <View></View>
}