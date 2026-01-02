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
import { Mail, User, ArrowLeft } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import Input from '../../components/common/fields/Input';
import PasswordInput from '../../components/common/fields/PasswordInput';
import { CustomToast } from '../../components/Toast';

const RegisterSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, 'Name must be at least 3 characters')
    .required('Full name is required'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Include uppercase, lowercase, and number',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
});

const Register = () => {
  const navigation = useNavigation<any>();

  const handleRegister = (values: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    console.log('Registration successful', values);
    navigation.navigate("Otp", {
      email: values.email,
    });

    CustomToast(`Otp Sent To ${values.email}`)
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
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

          {/* Logo Section */}
          <View style={styles.logoSection}>
            <View style={styles.logoBg}>
              <Text style={styles.logo}>Hirely</Text>
            </View>
            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
            <View style={[styles.decorCircle, styles.decorCircle3]} />
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>
                Start your journey to finding your dream job
              </Text>
            </View>

            {/* Formik Form */}
            <Formik
              initialValues={{
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={RegisterSchema}
              onSubmit={handleRegister}
            >
              {({ handleSubmit, values, touched, errors, setFieldTouched }) => (
                <>
                  <View style={styles.formContainer}>
                    <Field name="fullName">
                      {({ field }: any) => (
                        <Input
                          label="Full Name"
                          placeholder="Enter your full name"
                          icon={User}
                          value={field.value}
                          onChangeText={field.onChange('fullName')}
                          onBlur={() => setFieldTouched('fullName', true)}
                          error={errors.fullName}
                          touched={touched.fullName}
                          autoCapitalize="words"
                        />
                      )}
                    </Field>

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

                    <Field name="password">
                      {({ field }: any) => (
                        <PasswordInput
                          label="Password"
                          placeholder="Create a password"
                          value={field.value}
                          onChangeText={field.onChange('password')}
                          onBlur={() => setFieldTouched('password', true)}
                          error={errors.password}
                          touched={touched.password}
                        />
                      )}
                    </Field>

                    <Field name="confirmPassword">
                      {({ field }: any) => (
                        <PasswordInput
                          label="Confirm Password"
                          placeholder="Re-enter your password"
                          value={field.value}
                          onChangeText={field.onChange('confirmPassword')}
                          onBlur={() => setFieldTouched('confirmPassword', true)}
                          error={errors.confirmPassword}
                          touched={touched.confirmPassword}
                        />
                      )}
                    </Field>

                    <PrimaryButton
                      title="Create Account"
                      onPress={handleSubmit}
                    />
                  </View>

                  {/* Terms */}
                  <Text style={styles.termsText}>
                    By creating an account, you agree to our{' '}
                    <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                    <Text style={styles.termsLink}>Privacy Policy</Text>
                  </Text>

                  {/* Login Link */}
                  <View style={styles.loginContainer}>
                    <Text style={styles.loginText}>
                      Already have an account?{' '}
                    </Text>
                    <Pressable onPress={handleLogin}>
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

  // Logo Section
  logoSection: {
    paddingHorizontal: 28,
    paddingTop: 10,
    paddingBottom: 20,
    alignItems: 'center',
    position: 'relative',
  },
  logoBg: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logo: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: -1,
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
    top: 15,
    right: 50,
  },
  decorCircle2: {
    width: 45,
    height: 45,
    bottom: 20,
    left: 40,
  },
  decorCircle3: {
    width: 35,
    height: 35,
    top: 10,
    left: 60,
    opacity: 0.3,
  },

  // Content Section
  contentSection: {
    flex: 1,
    paddingHorizontal: 28,
  },

  // Title
  titleContainer: {
    marginBottom: 28,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.mediumGray,
    lineHeight: 22,
    fontFamily: Fonts.regular,
  },

  // Form
  formContainer: {
    marginBottom: 20,
  },

  // Terms
  termsText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  termsLink: {
    color: Colors.primary,
    fontFamily: Fonts.bold,
  },

  // Login
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
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

export default Register;