import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { Fonts } from '../../theme/typography';
import { Colors } from '../../theme/colors';
import { MaleIcon } from '../../utlis/Images';
import { useNavigation } from '@react-navigation/native';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
};

const getFormattedDate = () => {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
};

const Header = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>
          {getGreeting()}, Vamshi!
        </Text>
        <Text style={styles.date}>
          {getFormattedDate()}
        </Text>
      </View>

      <TouchableOpacity activeOpacity={0.95} style={styles.avatarWrapper} onPress={() => navigation.navigate('Profile')}>
        <Image source={MaleIcon} style={styles.avatarIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  greeting: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    color: Colors.dark,
  },
  date: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: Colors.mediumGray,
    marginTop: 2,
  },
  avatarWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.lightPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarIcon: {
    width: 42,
    height: 42,
    resizeMode: 'contain',
  },
});
