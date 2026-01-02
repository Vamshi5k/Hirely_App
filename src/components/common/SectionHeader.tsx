import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Fonts } from '../../theme/typography';
import { Colors } from '../../theme/colors';


interface SectionHeaderProps {
  title: string;
  onPressSeeAll?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  onPressSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {onPressSeeAll && (
        <TouchableOpacity onPress={onPressSeeAll} activeOpacity={0.6}>
          <Text style={styles.seeAll}>See all</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SectionHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 16,
    color: Colors.dark,
  },
  seeAll: {
    fontFamily: Fonts.bold,
    fontSize: 14,
    color: Colors.lightGray,
  },
});
