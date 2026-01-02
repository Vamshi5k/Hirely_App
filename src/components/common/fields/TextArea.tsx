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

import { Colors } from '../../../theme/colors';
import { Fonts } from '../../../theme/typography';

interface TextAreaProps extends TextInputProps {
  /** Optional label above textarea */
  label?: string;

  /** Formik helpers */
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: any;
  error?: string;
  touched?: boolean;

  /** Height customization */
  minHeight?: number;

  /** Styling overrides */
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
  minHeight = 120,
  containerStyle,
  labelStyle,
  inputStyle,
  ...rest
}) => {
  const hasError = Boolean(touched && error);

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}

      {/* TextArea */}
      <View
        style={[
          styles.textAreaWrapper,
          { minHeight },
          hasError && styles.inputError,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          multiline
          textAlignVertical="top"
          style={[styles.textArea, inputStyle]}
          {...rest}
        />
      </View>

      {/* Error */}
      {hasError && (
        <Text style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
};

export default TextArea;

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

  textAreaWrapper: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.white,
  },

  textArea: {
    fontSize: 14,
    color: Colors.dark,
    fontFamily: Fonts.bold,
    paddingVertical: 0,
  },

  inputError: {
    borderColor: Colors.error,
  },

  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: Colors.error,
    fontFamily: Fonts.bold,
  },
});