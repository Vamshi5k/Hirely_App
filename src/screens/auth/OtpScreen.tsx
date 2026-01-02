import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const OTPVerification = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const email = route.params?.email || 'example@email.com';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;

    const newOtp = [...otp];
    
    if (text.length > 1) {
      const pastedData = text.slice(0, 6).split('');
      pastedData.forEach((char, i) => {
        if (index + i < 6) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);
      
      const nextIndex = Math.min(index + pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      newOtp[index] = text;
      setOtp(newOtp);
      
      if (text && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      console.log('Verifying OTP:', otpCode);
      navigation.navigate('JobSelection');
    }
  };

  const handleResend = () => {
    if (canResend) {
      console.log('Resending OTP to:', email);
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const isOtpComplete = otp.every(digit => digit !== '');
  const formattedTime = `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}`;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Pressable style={styles.backButton} onPress={handleBack}>
              <ArrowLeft size={24} color={Colors.dark} />
            </Pressable>
          </View>

          {/* Icon Section */}
          <View style={styles.iconSection}>
            <View style={styles.iconBg}>
              <ShieldCheck size={44} color={Colors.white} strokeWidth={2.5} />
            </View>
            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Enter Verification Code</Text>
              <Text style={styles.subtitle}>
                We've sent a 6-digit verification code to
              </Text>
              <Text style={styles.email}>{email}</Text>
            </View>

            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp?.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref: any) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit && styles.otpInputFilled,
                  ]}
                  value={digit}
                  onChangeText={text => handleChange(text, index)}
                  onKeyPress={e => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={6}
                  selectTextOnFocus
                  returnKeyType={index === 5 ? 'done' : 'next'}
                  blurOnSubmit={index === 5}
                />
              ))}
            </View>

            {/* Timer and Resend */}
            <View style={styles.timerContainer}>
              {!canResend ? (
                <View style={styles.timerWrapper}>
                  <Text style={styles.timerText}>Code expires in </Text>
                  <Text style={styles.timerCount}>{formattedTime}</Text>
                </View>
              ) : (
                <View style={styles.resendWrapper}>
                  <Text style={styles.resendLabel}>Didn't receive code? </Text>
                  <Pressable onPress={handleResend}>
                    <Text style={styles.resendText}>Resend</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Verify Button */}
            <View style={styles.buttonContainer}>
              <PrimaryButton
                title="Verify & Continue"
                onPress={handleVerify}
                disabled={!isOtpComplete}
              />
            </View>

            {/* Help Text */}
            <View style={styles.helpContainer}>
              <Text style={styles.helpText}>
                Having trouble? Check your spam folder or contact support
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },

  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Icon Section
  iconSection: {
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  iconBg: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 24,
    elevation: 12,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: Colors.lightPrimary,
    opacity: 0.4,
  },
  decorCircle1: {
    width: 70,
    height: 70,
    top: 15,
    right: 50,
  },
  decorCircle2: {
    width: 50,
    height: 50,
    bottom: 25,
    left: 40,
  },

  // Content Section
  contentSection: {
    flex: 1,
    paddingHorizontal: 28,
  },

  // Title
  titleContainer: {
    marginBottom: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -1,
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: Colors.mediumGray,
    lineHeight: 22,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: Colors.primary,
    fontFamily: Fonts.bold,
    textAlign: 'center',
  },

  // OTP Input - REDESIGNED
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
    gap: 8,
  },
  otpInput: {
    flex: 1,
    height: 64,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.border,
    textAlign: 'center',
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    shadowColor: Colors.dark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  otpInputFilled: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightPrimary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.15,
  },

  // Timer
  timerContainer: {
    alignItems: 'center',
    marginBottom: 32,
    minHeight: 24,
  },
  timerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
  },
  timerCount: {
    fontSize: 14,
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },
  resendWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resendLabel: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
  },
  resendText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  // Button
  buttonContainer: {
    marginBottom: 20,
  },

  // Help
  helpContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  helpText: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default OTPVerification;