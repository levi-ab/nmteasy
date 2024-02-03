import { memo } from 'react';
import { ILesson } from '../../../models/lessons';
import IslandButton from './IslandButton';
import { View } from 'react-native';

interface IsLandRenderItemProps {
  item: ILesson;
  index: number;
  handleLevelPress: Function;
}

const IsLandRenderItem: React.FC<IsLandRenderItemProps> = ({ item, index, handleLevelPress }) => {
  return (
    <View>
      <IslandButton
        percentage={100}
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
