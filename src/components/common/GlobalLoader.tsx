import React, { useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles';
import { getThemePrimaryColor } from '../../utils/themes';
import LessonTypeContext from '../../data/LessonsTypeContext';

interface GlobalLoaderProps {
  isVisible: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isVisible }) => {
  const { lessonType } = useContext(LessonTypeContext);

  return isVisible ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={getThemePrimaryColor(lessonType)} />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});

export default GlobalLoader;