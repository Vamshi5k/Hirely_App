import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

interface Props {
  icon: React.ReactNode;
  title: string;
  onPress?: () => void;
}

const SettingsItem: React.FC<Props> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.icon}>{icon}</View>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

export default SettingsItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 14,
    borderRadius: 20,
    marginBottom: 8,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },
});
