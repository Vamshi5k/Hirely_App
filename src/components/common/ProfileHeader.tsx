import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Briefcase } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { MaleIcon } from '../../utlis/Images';

interface User {
  name: string;
  role: string;
}

interface Props {
  user: User;
}

const ProfileHeader: React.FC<Props> = ({ user }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image source={MaleIcon} style={styles.avatarIcon} />
      </View>

      <Text style={styles.name}>{user.name}</Text>

      <View style={styles.roleRow}>
        <Briefcase size={14} color={Colors.mediumGray} />
        <Text style={styles.role}>{user.role}</Text>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.lightPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarIcon: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 4,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  role: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
  },
});
