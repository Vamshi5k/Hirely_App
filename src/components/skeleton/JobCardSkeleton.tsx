import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { Colors } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface JobCardSkeletonProps {
  horizontal?: boolean;
}

const JobCardSkeleton: React.FC<JobCardSkeletonProps> = ({
  horizontal = false,
}) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  return (
    <View
      style={[
        styles.card,
        horizontal && styles.horizontalCard,
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <View style={styles.lineLarge} />
          <View style={styles.lineSmall} />
        </View>

        <View style={styles.iconGroup}>
          <View style={styles.icon} />
          <View style={styles.icon} />
        </View>
      </View>

      {/* Description */}
      <View style={styles.description}>
        <View style={styles.lineFull} />
        <View style={styles.lineFull} />
        <View style={styles.lineHalf} />
      </View>

      {/* Badges */}
      <View style={styles.badges}>
        <View style={styles.badge} />
        <View style={styles.badge} />
        <View style={styles.badge} />
      </View>

      {/* Shimmer Overlay */}
      <Animated.View
        style={[
          styles.shimmer,
          { transform: [{ translateX }] },
        ]}
      />
    </View>
  );
};

export default JobCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 20,
    marginBottom: 16,
    minHeight: 200,
    overflow: 'hidden',
  },
  horizontalCard: {
    width: Math.min(300, SCREEN_WIDTH * 0.85),
    marginRight: 4,
  },

  /* Layout */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  titleBlock: {
    flex: 1,
    gap: 8,
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  description: {
    gap: 8,
    marginTop: 6,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },

  /* Skeleton blocks */
  lineLarge: {
    height: 14,
    width: '65%',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  lineSmall: {
    height: 12,
    width: '45%',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  lineFull: {
    height: 12,
    width: '100%',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  lineHalf: {
    height: 12,
    width: '70%',
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  badge: {
    width: 70,
    height: 24,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },

  /* Shimmer */
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '40%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    opacity: 0.6,
  },
});
