import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';

import { Colors } from '../../../theme/colors';
import { Fonts } from '../../../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: any;
  error?: string;
  touched?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  iconColor?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  icon: Icon,
  value,
  onChangeText,
  onBlur,
  error,
  touched,

  containerStyle,
  labelStyle,
  inputStyle,
  iconColor = Colors.lightGray,

  ...rest
}) => {
  const hasError = Boolean(touched && error);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {/* Input */}
      <View style={[styles.inputWrapper, hasError && styles.inputError]}>
        {Icon && <Icon size={18} color={hasError ? Colors.error : iconColor} />}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          style={[styles.input, inputStyle]}
          {...rest}
        />
      </View>

      {/* Error */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default Input;

/* -------------------------------- Styles -------------------------------- */

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },

  label: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
    marginBottom: 6,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  inputError: {
    borderColor: Colors.error,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.dark,
    fontFamily: Fonts.bold,
    paddingVertical: 0,
  },

  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: Colors.error,
    fontFamily: Fonts.bold,
  },
});
