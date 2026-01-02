import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { Colors } from '../../theme/colors';

const MyJobCardSkeleton = () => {
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
    outputRange: [-200, 300],
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.titleLine} />
          <View style={styles.companyLine} />
        </View>

        <View style={styles.actionButtons}>
          <View style={styles.icon} />
          <View style={styles.icon} />
        </View>
      </View>

      {/* Description */}
      <View style={styles.description}>
        <View style={styles.descLine} />
        <View style={styles.descLineHalf} />
      </View>

      {/* Badges */}
      <View style={styles.badgeRow}>
        <View style={styles.badge} />
        <View style={styles.badge} />
        <View style={styles.badgeSmall} />
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

export default MyJobCardSkeleton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    overflow: 'hidden',
  },

  /* Header */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerLeft: {
    flex: 1,
    marginRight: 12,
    gap: 6,
  },

  /* Description */
  description: {
    gap: 8,
    marginTop: 2,
  },

  /* Badges */
  badgeRow: {
    flexDirection: 'row',
    gap: 7,
    marginTop: 14,
  },

  /* Skeleton blocks */
  titleLine: {
    height: 16,
    width: '65%',
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  companyLine: {
    height: 12,
    width: '45%',
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },
  descLine: {
    height: 12,
    width: '100%',
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },
  descLineHalf: {
    height: 12,
    width: '70%',
    borderRadius: 6,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },
  icon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },
  badge: {
    width: 70,
    height: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.08)',
  },
  badgeSmall: {
    width: 45,
    height: 24,
    borderRadius: 20,
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
  },

  /* Actions */
  actionButtons: {
    flexDirection: 'row',
    gap: 6,
  },

  /* Shimmer */
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '40%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    opacity: 0.6,
  },
});
