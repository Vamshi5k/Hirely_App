import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Image,
  Pressable,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { onboardingData } from '../../data/onboarding-data';
import PrimaryButton from '../../components/buttons/PrimaryButton';

const { width } = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation<any>();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = onboardingData.length;
  const isLastSlide = currentIndex === totalSlides - 1;

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (isLastSlide) {
      navigation.navigate('Welcome');
    } else {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    }
  };

  const handleSkip = () => {
    navigation.navigate('Welcome');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logo}>Hirely</Text>
      <Pressable style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>
    </View>
  );

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {[...Array(totalSlides)].map((_, idx) => (
        <View key={idx} style={styles.progressBarWrapper}>
          <View
            style={[
              styles.progressBar,
              idx === currentIndex && styles.progressBarActive,
            ]}
          />
        </View>
      ))}
    </View>
  );

  const renderOnboardingSlide = ({ item, index }: { item: any; index: number }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const imageScale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.3, 1, 0.3],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slide}>
        {/* Image Section */}
        <View style={styles.imageSection}>
          <Animated.View
            style={[
              styles.imageWrapper,
              {
                transform: [{ scale: imageScale }],
                opacity: imageOpacity,
              },
            ]}
          >
            <View style={styles.imageCard}>
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.gradientOverlay} />
            </View>

            <View style={[styles.decorCircle, styles.decorCircle1]} />
            <View style={[styles.decorCircle, styles.decorCircle2]} />
          </Animated.View>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          {renderProgressBar()}

          <View style={styles.textContainer}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {index + 1} of {totalSlides}
              </Text>
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      {renderHeader()}

      <View style={styles.content}>
        <FlatList
          ref={flatListRef}
          data={onboardingData}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onMomentumScrollEnd={handleScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          renderItem={renderOnboardingSlide}
          style={styles.flatList}
        />

        {/* Fixed Button at Bottom */}
        <View style={styles.fixedButtonContainer}>
          <PrimaryButton 
            title={isLastSlide ? "Get Started" : "Continue"} 
            onPress={handleNext} 
          />
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

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
  },
  logo: {
    fontSize: 22,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  skipButton: {
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  skipText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.mediumGray,
  },

  // Content wrapper
  content: {
    flex: 1,
  },
  flatList: {
    flex: 1,
  },

  // Slide Container
  slide: {
    width,
    flex: 1,
  },

  // Image Section Styles
  imageSection: {
    flex: 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 16,
    position: 'relative',
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  imageCard: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    backgroundColor: 'transparent',
  },

  // Decorative Circles
  decorCircle: {
    position: 'absolute',
    borderRadius: 1000,
    backgroundColor: Colors.lightPrimary,
    opacity: 0.4,
  },
  decorCircle1: {
    width: 120,
    height: 120,
    top: -20,
    right: -30,
  },
  decorCircle2: {
    width: 80,
    height: 80,
    bottom: 40,
    left: -20,
  },

  // Content Section Styles
  contentSection: {
    flex: 0.35,
    paddingHorizontal: 28,
    paddingTop: 24,
    paddingBottom: 12,
  },

  // Progress Bar
  progressContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  progressBarWrapper: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.disabled,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.disabled,
    borderRadius: 2,
  },
  progressBarActive: {
    backgroundColor: Colors.primary,
  },

  // Text Content
  textContainer: {
    alignItems: 'flex-start',
  },
  badge: {
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 29,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -1,
    marginBottom: 10,
    lineHeight: 35,
  },
  description: {
    fontSize: 16,
    color: Colors.mediumGray,
    lineHeight: 24,
    fontFamily: Fonts.regular,
  },

  // Fixed Button Container
  fixedButtonContainer: {
    paddingHorizontal: 28,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: Colors.background,
  },
});

export default Onboarding;