import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NetInfo from '@react-native-community/netinfo';
import { WifiOff } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { CustomToast } from '../../components/Toast';

type Props = {
  onReconnect?: () => void;
};

const NoInternetScreen: React.FC<Props> = ({ onReconnect }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        onReconnect?.();
      }
    });

    return unsubscribe;
  }, []);

  const handleRetry = async () => {
    if (isRetrying) return;

    setIsRetrying(true);

    const state = await NetInfo.fetch();

    if (state.isConnected && state.isInternetReachable) {
      CustomToast('Internet connected');
      onReconnect?.();
    } else {
      CustomToast('No internet connection');
      setTimeout(() => setIsRetrying(false), 1000);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <View style={styles.iconSection}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBg}>
            <WifiOff size={56} color={Colors.white} strokeWidth={2} />
          </View>
          <View style={[styles.decorCircle, styles.decorCircle1]} />
          <View style={[styles.decorCircle, styles.decorCircle2]} />
          <View style={[styles.decorCircle, styles.decorCircle3]} />
        </View>
      </View>

      <View style={styles.contentSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>No Internet Connection</Text>
          <Text style={styles.description}>
            Please check your connection and try again. Make sure WiFi or mobile
            data is turned on.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title={isRetrying ? 'Checking...' : 'Try Again'}
            onPress={handleRetry}
            disabled={isRetrying}
          />
          <Text style={styles.hintText}>
            Swipe down to refresh or check your network settings
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NoInternetScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  iconSection: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  iconContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconBg: {
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
  contentSection: {
    flex: 0.5,
    paddingHorizontal: 28,
    paddingVertical: 20,
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
  hintText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontFamily: Fonts.regular,
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
    paddingHorizontal: 20,
  },
});
