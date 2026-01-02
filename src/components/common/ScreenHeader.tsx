import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Plus } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

interface Props {
  title: string;
  onAddPress?: () => void;
  showIcon?: boolean;
}

const ScreenHeader: React.FC<Props> = ({
  title,
  onAddPress,
  showIcon = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {showIcon && (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.addButton}
          onPress={onAddPress}
        >
          <Plus size={20} color={Colors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenHeader;
