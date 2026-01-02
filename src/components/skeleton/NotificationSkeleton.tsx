import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../theme/colors';


const SkeletonLoader = () => {
  const fade = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fade, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fade, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      {[1, 2, 3].map(i => (
        <Animated.View key={i} style={[styles.row, { opacity: fade }]}>
          <View style={styles.icon} />
          <View style={styles.content}>
            <View style={styles.title} />
            <View style={styles.desc} />
            <View style={styles.time} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default SkeletonLoader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
  title: {
    height: 14,
    width: '70%',
    borderRadius: 6,
    backgroundColor: Colors.background,
    marginBottom: 6,
  },
  desc: {
    height: 12,
    borderRadius: 5,
    backgroundColor: Colors.background,
    marginBottom: 6,
  },
  time: {
    height: 9,
    width: '25%',
    borderRadius: 4,
    backgroundColor: Colors.background,
    alignSelf: 'flex-end',
  },
});
