import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

interface CompleteProfileCardProps {
  onPress?: (event: GestureResponderEvent) => void;
}

const CompleteProfileCard: React.FC<CompleteProfileCardProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={styles.card}
    >
      <Text style={styles.title}>Complete your profile</Text>
      <Text style={styles.text}>
        Add your skills, experience, and preferences so employers can find you
        faster — and you can apply in just a few taps.
      </Text>
    </TouchableOpacity>
  );
};

export default CompleteProfileCard;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colors.primary,
    borderRadius: 20,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.white,
    marginBottom: 6,
  },
  text: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.white,
    lineHeight: 18,
    opacity: 0.9,
  },
});
