import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { G, Path, Polygon, Svg } from "react-native-svg";
import { colors } from "../../styles";
import { useContext } from "react";
import LessonTypeContext from "../../data/LessonsTypeContext";
import { LessonTypes, LessonTypesToUkrainianMap } from "../../utils/constants";
import LessonSearch from "./LessonSearch";

const LessonTypeSelectorButton = () => {
  const { lessonType } = useContext(LessonTypeContext);
  const { lessonTypeSelectorOpen, setLessonTypeSelectorOpen } = useContext(LessonTypeContext);

  return (
    <View style={{flexDirection:"row", alignItems:"center", gap: 5 }}>
      <LessonSearch />
      <TouchableOpacity
        style={styles.lessonTypeContainer}
        onPress={() => setLessonTypeSelectorOpen(!lessonTypeSelectorOpen)}
      >
        <Text style={styles.text}>{LessonTypesToUkrainianMap[lessonType]}</Text>
        <LessonTypeToSvg
          width={30}
          height={30}
          lessonType={lessonType as LessonTypes}
        />
      </TouchableOpacity>
    </View>
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

export const BiologySvg = ({
  width,
  height,
  color,
}: {
  width: number;
  height: number;
  color?: string;
}) => (
  <Svg
    viewBox="0 0 128 128"
    width={width}
    height={height}
    fill={color ?? colors.black}
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <G id="Biology">
        <Path d="M104.82,91H110a3,3,0,0,0,3-3V87a3,3,0,0,0-3-3h-2.08A5.21,5.21,0,0,0,110,80V68.31a8.06,8.06,0,0,0-3.69-6.43L93,49.56V22a1,1,0,0,0,1-1V16a1,1,0,0,0-1-1H75a1,1,0,0,0-1,1v5a1,1,0,0,0,1,1V49.56L61.69,61.88A8.06,8.06,0,0,0,58,68.31V80a5.21,5.21,0,0,0,2.08,4H45.5A19,19,0,0,0,43,49V31h1a1,1,0,0,0,1-1V26a1,1,0,0,0-1-1H30a1,1,0,0,0-1,1v4a1,1,0,0,0,1,1h1V49A18.86,18.86,0,0,0,18.05,68.35,19.21,19.21,0,0,0,28.55,84H26c-6.07,0-11,6.73-11,15s4.93,15,11,15h84a3,3,0,0,0,3-3v-1a3,3,0,0,0-3-3h-5.18A39.2,39.2,0,0,1,104.82,91ZM76,17H92v3H76ZM60,80V68.31a6.05,6.05,0,0,1,2.9-4.84l.1-.08L76.68,50.73A1,1,0,0,0,77,50V42h3a1,1,0,0,0,0-2H77V38h3a1,1,0,0,0,0-2H77V34h3a1,1,0,0,0,0-2H77V30h3a1,1,0,0,0,0-2H77V22H91V50a1,1,0,0,0,.32.73L105,63.39l.1.08a6.05,6.05,0,0,1,2.9,4.84V80c0,2.17-2.79,4-6.08,4H66.08C62.79,84,60,82.17,60,80ZM31,27H43v2H31Zm4,56.89A17.15,17.15,0,0,1,20,68.21,16.89,16.89,0,0,1,32.28,50.68a1,1,0,0,0,.72-1V44h2a1,1,0,0,0,0-2H33V40h2a1,1,0,0,0,0-2H33V36h2a1,1,0,0,0,0-2H33V31h8V49.72a1,1,0,0,0,.72,1,17,17,0,0,1,6.61,29A16.79,16.79,0,0,1,36.9,84h0C36.27,84,35.66,84,35.05,83.89ZM111,110v1a1,1,0,0,1-1,1H26c-5,0-9-5.83-9-13s4-13,9-13h84a1,1,0,0,1,1,1v1a1,1,0,0,1-1,1H31.38a10,10,0,1,0,0,20H110A1,1,0,0,1,111,110Zm-79.62-3a8,8,0,1,1,0-16h71.38a41.42,41.42,0,0,0,0,16Z"></Path>
        <Path d="M37.37,81.71A14.71,14.71,0,0,0,51.63,67.09a14.44,14.44,0,0,0-1.55-6.54,1,1,0,0,0-.89-.55H24.81a1,1,0,0,0-.89.55A14.61,14.61,0,0,0,37,81.72Zm-13-14A12.35,12.35,0,0,1,25.45,62h23.1a12.37,12.37,0,0,1,1.08,5.09,12.63,12.63,0,0,1-25.25.57Z"></Path>
        <Path d="M32,21a1,1,0,0,0,1-1V16a1,1,0,0,0-2,0v4A1,1,0,0,0,32,21Z"></Path>
        <Path d="M37,21a1,1,0,0,0,1-1V16a1,1,0,0,0-2,0v4A1,1,0,0,0,37,21Z"></Path>
        <Path d="M42,21a1,1,0,0,0,1-1V16a1,1,0,0,0-2,0v4A1,1,0,0,0,42,21Z"></Path>
        <Path d="M87,56l-2.22-2.55a1,1,0,0,0-1.5,0L81,56a12.21,12.21,0,0,0,0,16.15l2.22,2.56a1,1,0,0,0,1.5,0L87,72.19A12.21,12.21,0,0,0,87,56ZM84,72.56l-1.46-1.68a10.23,10.23,0,0,1,0-13.53L84,55.67l1.46,1.68a10.23,10.23,0,0,1,0,13.53Z"></Path>
        <Path d="M98.05,69.47l-2.76.21a10.31,10.31,0,0,0-9.54,9.54L85.54,82a1,1,0,0,0,1,1.08h.08l2.75-.22a10.3,10.3,0,0,0,9.54-9.53l.21-2.76a1,1,0,0,0-1.07-1.07Zm-1.13,3.67a8.33,8.33,0,0,1-7.7,7.7L87.63,81l.12-1.59a8.32,8.32,0,0,1,7.7-7.7L97,71.55Z"></Path>
        <Path d="M72.71,69.68,70,69.47a.94.94,0,0,0-.78.29,1,1,0,0,0-.29.78l.21,2.76a10.3,10.3,0,0,0,9.54,9.53l2.75.22h.08a1,1,0,0,0,1-1.08l-.21-2.75A10.31,10.31,0,0,0,72.71,69.68Zm6.07,11.16a8.33,8.33,0,0,1-7.7-7.7L71,71.55l1.59.12a8.32,8.32,0,0,1,7.7,7.7L80.37,81Z"></Path>
      </G>
    </G>
  </Svg>
);

export const LessonTypeToSvg = (props :{width: number, height: number, lessonType: LessonTypes, color?: string} ) => {
  if(props.lessonType === LessonTypes.History){
    return (
      <HistorySVG
        width={props.width}
        height={props.height}
        color={props.color}
      />
    );
  }

  if(props.lessonType === LessonTypes.Ukrainian){
    return <UkrainianSvg width={props.width} height={props.height} />;
  }

  if(props.lessonType === LessonTypes.Biology){
    return  <BiologySvg width={props.width} height={props.height} color={props.color}/>
  }

  return <View></View>
}