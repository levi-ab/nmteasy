import { memo } from "react";
import { ILesson } from "../../data/models/lessons";
import IslandButton from "./IslandButton";
import { View } from "react-native";
import { Circle, G, Path, Svg } from "react-native-svg";
import { colors } from "../../styles";

interface IsLandRenderItemProps {
  item: ILesson;
  index: number;
  handleLevelPress: Function;
}

const IsLandRenderItem: React.FC<IsLandRenderItemProps> = ({
  item,
  index,
  handleLevelPress,
}) => {

  return (
    <View>
      <IslandButton
        percentage={
          item.lesson_analytic.right_answers_count !== 0
            ? (item.lesson_analytic.right_answers_count /
                item.lesson_analytic.questions_count) *
              100
            : 0
        }
        key={item.id}
        marginLeft={0}
        marginTop={20}
        marginRight={index % 5 >= 2 ? (-index % 5) * 30 : (index % 5) * 60}
        onPress={() => handleLevelPress(item.id)}
      />
      {index % 2 === 0 && index !== 0 ? (
        Math.random() < 0.5
          ? <WindSvg index={index}/>
          : <MedalSvg index={index}/>
      ) : null}

      {index === 0 ? (
        Math.random() < 0.5
        ? <StarSVG index={index}/>
        : <LightBulbSvg index={index}/>
      ) : null}
    </View>
  );
};

const StarSVG = ({ index }: {index: number}) => (
  <Svg
    height="60px"
    width="60px"
    style={{ position: "absolute", left: index === 2 ? 100 : -100, opacity: 0.8 , top: 30 }}
    id="Capa_1"
    viewBox="0 0 47.94 47.94"
    fill="#ED8A19"
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <Path d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"></Path>
    </G>
  </Svg>
);

const MedalSvg = ({ index }: {index: number}) => (
  <Svg
    viewBox="-2 0 20 20"
    height="70px"
    width="70px"
    style={{ position: "absolute", left: index === 2 ? 100 : -100, top: 30, opacity: 0.8 }}
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <G id="reward-3" transform="translate(-4 -2)">
        <Circle
          id="secondary"
          fill={colors.gold}
          cx="7"
          cy="7"
          r="7"
          transform="translate(5 3)"
        ></Circle>
        <Path
          id="primary"
          d="M11,8l1-1v6"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
        <Path
          id="primary-2"
          data-name="primary"
          d="M16.11,15.66,17,21l-5-1L7,21l.89-5.34"
          fill="none"
          stroke={colors.black}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
        <Path
          id="primary-3"
          data-name="primary"
          d="M11,13h2M12,3a7,7,0,1,0,7,7,7,7,0,0,0-7-7Z"
          fill="none"
          stroke="#000000"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
      </G>
    </G>
  </Svg>
);

const WindSvg = ({ index }: {index: number}) => (
  <Svg
    viewBox="0 -2 20 20"
    height="50px"
    width="50px"
    style={{
      position: "absolute",
      left: index === 2 ? 120 : -120,
      top: 30,
      opacity: 0.6,
    }}
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <G id="wave" transform="translate(-2 -4)">
        <Path
          id="primary"
          d="M21,11c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,11,3,11"
          fill="none"
          stroke={colors.grays10}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
        <Path
          id="primary-2"
          data-name="primary"
          d="M3,5C5.25,5,5.25,7,7.5,7S9.75,5,12,5s2.26,2,4.51,2S18.75,5,21,5"
          fill="none"
          stroke={colors.grays10}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
        <Path
          id="primary-3"
          data-name="primary"
          d="M21,17c-2.25,0-2.25,2-4.5,2s-2.25-2-4.5-2-2.25,2-4.5,2S5.25,17,3,17"
          fill="none"
          stroke={colors.grays10}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
        ></Path>
      </G>
    </G>
  </Svg>
);

const LightBulbSvg = ({ index }: {index: number}) => (
  <Svg
    viewBox="0 0 512 512"
    height="70px"
    width="70px"
    style={{
      position: "absolute",
      left: index === 2 ? 100 : -100,
      top: 30,
      opacity: 0.8,
    }}
  >
    <G id="SVGRepo_bgCarrier" stroke-width="0"></G>
    <G
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></G>
    <G id="SVGRepo_iconCarrier">
      <G
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <G
          id="bulb-white"
          fill={colors.gold}
          transform="translate(42.666667, 21.333333)"
        >
          <Path
            d="M213.333333,85.3333333 C284.025781,85.3333333 341.333333,142.640885 341.333333,213.333333 C341.333333,260.711239 315.5928,302.077122 277.333732,324.208982 L277.333333,405.333333 L256,426.666667 L234.666667,426.666667 C234.666667,438.448741 225.115408,448 213.333333,448 C201.551259,448 192,438.448741 192,426.666667 L192,426.666667 L170.666667,426.666667 L149.333333,405.333333 L149.332954,324.208993 C111.073876,302.077136 85.3333333,260.711248 85.3333333,213.333333 C85.3333333,142.640885 142.640885,85.3333333 213.333333,85.3333333 Z M234.667665,339.563386 C227.72957,340.727434 220.602209,341.333333 213.333333,341.333333 C206.064458,341.333333 198.937097,340.727434 191.999002,339.563386 L192,384 L234.666667,384 L234.667665,339.563386 Z M96.4250122,307.614237 L119.052429,330.241654 L73.7975952,375.496488 L51.1701782,352.869071 L96.4250122,307.614237 Z M330.241654,307.614237 L375.496488,352.869071 L352.869071,375.496488 L307.614237,330.241654 L330.241654,307.614237 Z M426.666667,197.333333 L426.666667,229.333333 L362.666667,229.333333 L362.666667,197.333333 L426.666667,197.333333 Z M64,197.333333 L64,229.333333 L7.10542736e-15,229.333333 L7.10542736e-15,197.333333 L64,197.333333 Z M352.869071,51.1701782 L375.496488,73.7975952 L330.241654,119.052429 L307.614237,96.4250122 L352.869071,51.1701782 Z M73.7975952,51.1701782 L119.052429,96.4250122 L96.4250122,119.052429 L51.1701782,73.7975952 L73.7975952,51.1701782 Z M229.333333,-1.0658141e-14 L229.333333,64 L197.333333,64 L197.333333,-1.0658141e-14 L229.333333,-1.0658141e-14 Z"
            id="Combined-Shape"
          ></Path>
        </G>
      </G>
    </G>
  </Svg>
)

export const MemoizedIsLandRenderItem = memo(IsLandRenderItem);
