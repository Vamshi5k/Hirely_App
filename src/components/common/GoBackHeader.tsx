import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeft } from 'lucide-react-native';

import { Fonts } from '../../theme/typography';
import { Colors } from '../../theme/colors';

type GoBackHeaderProps = {
  title?: string;
};

const GoBackHeader: React.FC<GoBackHeaderProps> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <Pressable
        onPress={() => navigation.goBack()}
        hitSlop={12}
        style={styles.backButton}
      >
        <ArrowLeft size={22} color={Colors.dark} />
      </Pressable>

      {/* Title */}
      {title ? (
        <Text style={styles.title}>{title}</Text>
      ) : (
        <View style={{ flex: 1 }} />
      )}

      {/* Right spacer to keep title centered */}
      <View style={styles.rightSpacer} />
    </View>
  );
};

export default GoBackHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.dark,
  },
  rightSpacer: {
    width: 50,
  },
});
