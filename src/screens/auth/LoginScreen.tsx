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
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

import PrimaryButton from '../../components/buttons/PrimaryButton';
import PasswordInput from '../../components/common/fields/PasswordInput';
import Input from '../../components/common/fields/Input';
import { CustomToast } from '../../components/Toast';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const Login = () => {
  const navigation = useNavigation<any>();

  const handleLogin = (values: { email: string; password: string }) => {
    console.log('Login successful', values);
    navigation.navigate("HomeScreen");
    CustomToast("Welcome To Hirely");
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleForgotPassword = () => {
    console.log('Navigate to forgot password');
    navigation.navigate("ForgotPassword")
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
          </View>

          {/* Content Section */}
          <View style={styles.contentSection}>
            {/* Title */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Welcome Back!</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your job search journey
              </Text>
            </View>

            {/* Formik Form */}
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={LoginSchema}
              onSubmit={handleLogin}
            >
              {({ handleSubmit, values, touched, errors, setFieldTouched }) => (
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

                    <Field name="password">
                      {({ field }: any) => (
                        <PasswordInput
                          label="Password"
                          placeholder="Enter your password"
                          value={field.value}
                          onChangeText={field.onChange('password')}
                          onBlur={() => setFieldTouched('password', true)}
                          error={errors.password}
                          touched={touched.password}
                        />
                      )}
                    </Field>

                    <Pressable
                      style={styles.forgotPassword}
                      onPress={handleForgotPassword}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot Password?
                      </Text>
                    </Pressable>

                    <PrimaryButton title="Sign In" onPress={handleSubmit} />
                  </View>

                  {/* Register Link */}
                  <View style={styles.registerContainer}>
                    <Text style={styles.registerText}>
                      Don't have an account?{' '}
                    </Text>
                    <Pressable onPress={handleRegister}>
                      <Text style={styles.registerLink}>Create Account</Text>
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
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: 'center',
    position: 'relative',
  },
  logoBg: {
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
  logo: {
    fontSize: 24,
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
    marginBottom: 24,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  // Register
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
  },
  registerLink: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },
});

export default Login