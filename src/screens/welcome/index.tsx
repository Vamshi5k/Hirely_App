import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

const Welcome = () => {
  const navigation = useNavigation<any>();

  const handleLogin = () => navigation.navigate('Login');
  const handleRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {/* Logo Section */}
      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <View style={styles.logoBg}>
            <Text style={styles.logo}>Hirely</Text>
          </View>
          <View style={[styles.decorCircle, styles.decorCircle1]} />
          <View style={[styles.decorCircle, styles.decorCircle2]} />
          <View style={[styles.decorCircle, styles.decorCircle3]} />
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Ready to Start Your Journey?</Text>
          <Text style={styles.description}>
            Join thousands of job seekers finding their dream careers
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title="Create Account" onPress={handleRegister} />
          <SecondaryButton title="Sign In" onPress={handleLogin} />
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  // Logo Section Styles
  logoSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    position: 'relative',
  },
  logoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoBg: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
    fontSize: 32,
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: -1,
  },

  // Decorative Circles
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: Colors.lightPrimary,
    opacity: 0.4,
  },
  decorCircle1: {
    width: 100,
    height: 100,
    top: 60,
    right: 40,
  },
  decorCircle2: {
    width: 70,
    height: 70,
    bottom: 80,
    left: 30,
  },
  decorCircle3: {
    width: 50,
    height: 50,
    top: 40,
    left: 50,
    opacity: 0.3,
  },

  // Content Section
  contentSection: {
    flex: 0.5,
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -1,
    marginBottom: 12,
    textAlign: 'center',
    lineHeight: 34,
  },
  description: {
    fontSize: 16,
    color: Colors.mediumGray,
    lineHeight: 24,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  buttonContainer: {
    gap: 14,
  },
  termsText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});

export default Welcome;
