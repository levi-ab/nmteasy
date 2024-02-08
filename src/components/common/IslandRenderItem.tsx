import { memo } from "react";
import { ILesson } from "../../data/models/lessons";
import IslandButton from "./IslandButton";
import { View } from "react-native";

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
    </View>
  );
};

export const MemoizedIsLandRenderItem = memo(IsLandRenderItem);
