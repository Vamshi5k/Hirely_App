import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import { Eye, EyeOff, Lock } from 'lucide-react-native';
import { Colors } from '../../../theme/colors';
import { Fonts } from '../../../theme/typography';

interface PasswordInputProps extends TextInputProps {
  label?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: () => void;
  error?: string;
  touched?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  iconColor?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label = 'Password',
  placeholder = 'Enter password',
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
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(touched && error);
  const hasSuccess = Boolean(touched && !error && value);

  const tintColor = hasError
    ? Colors.error
    : hasSuccess
    ? Colors.primary
    : iconColor;

  return (
    <View style={[styles.container, containerStyle]}>
 
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

    
      <View
        style={[
          styles.inputWrapper,
          hasError && styles.inputError,
          hasSuccess && styles.inputSuccess,
        ]}
      >
        <Lock size={18} color={tintColor} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          placeholder={placeholder}
          placeholderTextColor={Colors.lightGray}
          secureTextEntry={!showPassword}
          style={[styles.input, inputStyle]}
          {...rest}
        />

        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          activeOpacity={0.7}
          style={styles.eyeButton}
        >
          {showPassword ? (
            <Eye size={18} color={tintColor} />
          ) : (
            <EyeOff size={18} color={tintColor} />
          )}
        </TouchableOpacity>
      </View>

      {/* Error */}
      {hasError && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default PasswordInput;


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
    borderWidth: 1.5,  // Add this
    borderColor: 'transparent',  // Add this (or your default border color)
  },

  inputError: {
    borderColor: Colors.error,
  },

  inputSuccess: {
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.dark,
    fontFamily: Fonts.bold,
    paddingVertical: 0,
  },

  eyeButton: {
    marginLeft: 8,
    padding: 4,
  },

  errorText: {
    marginTop: 6,
    marginLeft: 4,
    fontSize: 12,
    color: Colors.error,
    fontFamily: Fonts.bold,
  },
});
