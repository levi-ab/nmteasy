import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '../../styles';

interface GlobalLoaderProps {
  isVisible: boolean;
}

const GlobalLoader: React.FC<GlobalLoaderProps> = ({ isVisible }) => {
  return isVisible ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.themePrimary} />
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