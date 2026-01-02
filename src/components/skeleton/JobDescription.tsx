import { View, StyleSheet, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Colors } from '../../theme/colors';

const JobDescriptionSkeleton = () => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const SkeletonBox = ({ width, height, style }: any) => (
    <Animated.View
      style={[
        styles.skeleton,
        { width, height, opacity },
        style,
      ]}
    />
  );

  return (
    <View style={styles.container}>
      {/* Hero Card Skeleton */}
      <View style={styles.heroCard}>
        <SkeletonBox width={120} height={24} style={{ borderRadius: 16, marginBottom: 10 }} />
        <SkeletonBox width="80%" height={26} style={{ marginBottom: 14 }} />
        
        {/* Meta Grid */}
        <View style={styles.metaGrid}>
          <View style={styles.metaCard}>
            <SkeletonBox width={28} height={28} style={{ borderRadius: 7, marginBottom: 6 }} />
            <SkeletonBox width={40} height={10} style={{ marginBottom: 2 }} />
            <SkeletonBox width={60} height={12} />
          </View>
          <View style={styles.metaCard}>
            <SkeletonBox width={28} height={28} style={{ borderRadius: 7, marginBottom: 6 }} />
            <SkeletonBox width={40} height={10} style={{ marginBottom: 2 }} />
            <SkeletonBox width={60} height={12} />
          </View>
          <View style={styles.metaCard}>
            <SkeletonBox width={28} height={28} style={{ borderRadius: 7, marginBottom: 6 }} />
            <SkeletonBox width={40} height={10} style={{ marginBottom: 2 }} />
            <SkeletonBox width={60} height={12} />
          </View>
        </View>

        <SkeletonBox width="100%" height={40} style={{ borderRadius: 10, marginTop: 12 }} />
      </View>

      <View style={styles.fixWidth}>
        {/* Section Skeletons */}
        {[1, 2, 3, 4].map((item) => (
          <View key={item} style={styles.section}>
            <View style={styles.sectionHeader}>
              <SkeletonBox width={32} height={32} style={{ borderRadius: 8 }} />
              <SkeletonBox width={140} height={18} style={{ marginLeft: 8 }} />
            </View>
            <SkeletonBox width="100%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonBox width="95%" height={16} style={{ marginBottom: 8 }} />
            <SkeletonBox width="80%" height={16} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default JobDescriptionSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 6,
  },
  fixWidth: {
    paddingHorizontal: 16,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  metaCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skeleton: {
    backgroundColor: '#E2E8F0',
    borderRadius: 6,
  },
});