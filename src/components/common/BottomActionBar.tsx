import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';

type BottomActionBarProps = {
  children: React.ReactNode;
  style?: ViewStyle;
};

const BottomActionBar: React.FC<BottomActionBarProps> = ({
  children,
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: Math.max(insets.bottom, 12),
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default BottomActionBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 14,
    paddingTop: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 0.75,
    borderTopColor: '#E5E7EB',
  },
});
