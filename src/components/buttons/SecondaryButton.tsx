import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type SecondaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
};

const SecondaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  style,
}: SecondaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.container,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.primary} />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </Pressable>
  );
};

export default SecondaryButton;

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 14,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    color: Colors.dark,
    fontSize: 14,
    fontFamily: Fonts.bold,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {

    backgroundColor: Colors.white,
  },
});
