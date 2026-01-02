import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { User, Bookmark, Bell } from 'lucide-react-native';

import SettingsItem from './SettingsItem';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { useNavigation } from '@react-navigation/native';

const SettingsSection = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <SettingsItem
        title="Personal Information"
        icon={<User size={20} color={Colors.dark} />}
        onPress={() => navigation.navigate('PersonalInformation')}
      />

      <SettingsItem
        title="Saved Jobs"
        icon={<Bookmark size={20} color={Colors.dark} />}
        onPress={() => navigation.navigate('SavedJobs')}
      />

      <SettingsItem
        title="Notifications"
        icon={<Bell size={20} color={Colors.dark} />}
        onPress={() => navigation.navigate('Notifications')}
      />
    </View>
  );
};

export default SettingsSection;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 12,
  },
});
