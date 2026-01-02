import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import Input from '../../components/common/fields/Input';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
});

const ForgotPassword = () => {
  const navigation = useNavigation<any>();

  const handleSendOTP = (values: { email: string }) => {
    console.log('Sending OTP to:', values.email);
    navigation.navigate('Otp', { email: values.email });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

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
              <KeyRound size={40} color={Colors.white} strokeWidth={2.5} />
            </View>
            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Forgot Password?</Text>
              <Text style={styles.subtitle}>
                Don't worry! Enter your email and we'll send you a code to reset
                your password
              </Text>
            </View>

            {/* Formik Form */}
            <Formik
              initialValues={{ email: '' }}
              validationSchema={ForgotPasswordSchema}
              onSubmit={handleSendOTP}
            >
              {({ handleSubmit, touched, errors, setFieldTouched }) => (
                <>
                  <View style={styles.formContainer}>
                    <Field name="email">
                      {({ field }: any) => (
                        <Input
                          label="Email"
                          placeholder="Enter your email"
                          icon={Mail}
                          value={field.value}
                          onChangeText={field.onChange('email')}
                          onBlur={() => setFieldTouched('email', true)}
                          error={errors.email}
                          touched={touched.email}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                      )}
                    </Field>

                    <PrimaryButton title="Send Code" onPress={handleSubmit} />
                  </View>

                  {/* Back to Login */}
                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>Remember password? </Text>
                    <Pressable onPress={handleBackToLogin}>
                      <Text style={styles.loginLink}>Sign In</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </Formik>
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
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: Colors.lightPrimary,
    opacity: 0.4,
  },
  decorCircle1: {
    width: 60,
    height: 60,
    top: 20,
    right: 60,
  },
  decorCircle2: {
    width: 40,
    height: 40,
    bottom: 30,
    left: 50,
  },

  // Content Section
  contentSection: {
    flex: 1,
    paddingHorizontal: 28,
  },

  // Title
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -1,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.mediumGray,
    lineHeight: 24,
    fontFamily: Fonts.regular,
  },

  // Form
  formContainer: {
    marginBottom: 24,
  },

  // Login
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
  },
  loginLink: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
});

export default ForgotPassword;