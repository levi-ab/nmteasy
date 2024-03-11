import { memo, useContext } from "react";
import { Image, View } from "react-native";
import { Circle, G, Path, Svg } from "react-native-svg";
import { ILesson } from "../../data/models/lessons";
import IslandButton from "./IslandButton";
import { LessonImagesMap, LessonTypes } from "../../utils/constants";
import LessonTypeContext from "../../data/LessonsTypeContext";

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
  const { lessonType } = useContext(LessonTypeContext);

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

      <GetImageByLessonType lessonType={lessonType} index={index} />
      <GetSecondImageByLessonType lessonType={lessonType} index={index} />

      {/* {index === 0 ? (
        Math.random() < 0.5
        ? <StarSVG index={index}/>
        : <LightBulbSvg index={index}/>
      ) : null} */}
    </View>
  );
};

export const MemoizedIsLandRenderItem = memo(IsLandRenderItem);

const GetImageByLessonType = ({
  lessonType,
  index,
}: {
  lessonType: string;
  index: number;
}) => {
  if (lessonType === LessonTypes.History) {
    return index % 2 === 0 && index !== 0 ? (
      Math.random() < 0.5 ? (
        <Image
          source={require("../../assets/swords.png")}
          style={{
            tintColor: "white",
            position: "absolute",
            left: index === 2 ? 120 : -120,
            top: 30,
            width: 70,
            height: 70,
            opacity: 0.6,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/coin.png")}
          style={{
            position: "absolute",
            left: index === 2 ? 120 : -120,
            top: 30,
            width: 80,
            height: 80,
            opacity: 0.6,
            tintColor:"white"
          }}
        />
      )
    ) : null;
  }

  if (lessonType === LessonTypes.Biology) {
    return index % 2 === 0 && index !== 0 ? (
      Math.random() < 0.5 ? (
        <Image
          source={require("../../assets/cell.png")}
          style={{
            tintColor: "white",
            position: "absolute",
            left: index === 2 ? 120 : -120,
            top: 30,
            width: 70,
            height: 70,
            opacity: 0.6,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/sprout.png")}
          style={{
            position: "absolute",
            tintColor: "white",
            left: index === 2 ? 120 : -120,
            top: 30,
            width: 60,
            height: 60,
            opacity: 0.6,
          }}
        />
      )
    ) : null;
  }
};

const GetSecondImageByLessonType = ({
  lessonType,
  index,
}: {
  lessonType: string;
  index: number;
}) => {
  if (lessonType === LessonTypes.History) {
    return index == 0 ? (
      Math.random() < 0.5 ? (
        <Image
          source={require("../../assets/jar.png")}
          style={{
            tintColor: "white",
            position: "absolute",
            left: -120,
            top: 30,
            width: 70,
            height: 70,
            opacity: 0.6,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/manuscript.png")}
          style={{
            position: "absolute",
            tintColor: "white",
            left: -120,
            top: 30,
            width: 80,
            height: 80,
            opacity: 0.6,
          }}
        />
      )
    ) : null;
  }

  if (lessonType === LessonTypes.Biology) {
    return index === 0 ? (
      Math.random() < 0.5 ? (
        <Image
          source={require("../../assets/frog.png")}
          style={{
            tintColor: "white",
            position: "absolute",
            left: -120,
            top: 30,
            width: 70,
            height: 70,
            opacity: 0.6,
          }}
        />
      ) : (
        <Image
          source={require("../../assets/microscope.png")}
          style={{
            position: "absolute",
            tintColor: "white",
            left: -120,
            top: 30,
            width: 80,
            height: 80,
            opacity: 0.6,
          }}
        />
      )
    ) : null;
  }
};
