import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { appstyles } from '../../styles';

import GoBackHeader from '../../components/common/GoBackHeader';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import SecondaryButton from '../../components/buttons/SecondaryButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const Success = ({ navigation }: any) => {

  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const goToHome = () => {
    navigation.navigate('HomeScreen');
  };

  const goToAppliedJobs = () => {
    navigation.navigate('AppliedJobs');
  };


  return (
    <SafeAreaView style={appstyles.container}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.dark} />

      {/* Header */}
      <View style={appstyles.horizontal}>
        <GoBackHeader title="Success" />
      </View>

      {/* Animated Card */}
      <View style={styles.content}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity,
              transform: [{ scale }],
            },
          ]}
        >
          <View style={styles.iconWrapper}>
            <Check size={64} strokeWidth={3} color={Colors.primaryDark} />
          </View>

          <Text style={styles.title}>You've Applied</Text>

          <Text style={styles.description}>
            You have successfully applied to{'\n'}this job vacancy
          </Text>
        </Animated.View>
      </View>

      {/* Actions */}
      <View style={styles.footer}>
        <PrimaryButton title="Back To Home" onPress={goToHome} />
        <SecondaryButton title="Applied Jobs" onPress={goToAppliedJobs} />
      </View>
    </SafeAreaView>
  );
};

export default Success;


const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  card: {
    width: SCREEN_WIDTH - 48,
    minHeight: 380, // bigger card
    backgroundColor: Colors.primary + '10',
    borderRadius: 28,
    paddingVertical: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  iconWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: Colors.primary + '25',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },

  title: {
    fontSize: 28,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 16,
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    fontFamily: Fonts.regular,
    color: Colors.lightGray,
    textAlign: 'center',
    lineHeight: 24,
  },

  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
});
