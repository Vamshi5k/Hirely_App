import React from 'react';
import { View, StyleSheet } from 'react-native';

const Colors = {
  white: '#FFFFFF',
  skeleton: '#E5E7EB',
};

const EventCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <View style={[styles.skeleton, styles.title]} />
      <View style={[styles.skeleton, styles.time]} />
      <View style={[styles.skeleton, styles.description]} />

      <View style={styles.pillRow}>
        <View style={[styles.skeleton, styles.pill]} />
        <View style={[styles.skeleton, styles.pillSmall]} />
      </View>
    </View>
  );
};

export default EventCardSkeleton;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  skeleton: {
    backgroundColor: Colors.skeleton,
    borderRadius: 6,
  },
  title: {
    height: 14,
    width: '70%',
    marginBottom: 8,
  },
  time: {
    height: 12,
    width: '40%',
    marginBottom: 10,
  },
  description: {
    height: 12,
    width: '100%',
    marginBottom: 12,
  },
  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },
  pill: {
    height: 18,
    width: 80,
    borderRadius: 16,
  },
  pillSmall: {
    height: 18,
    width: 50,
    borderRadius: 16,
  },
});
