import React, { useState } from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { appstyles } from '../../styles';
import ScreenHeader from '../../components/common/ScreenHeader';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import ProfileHeader from '../../components/common/ProfileHeader';
import CompleteProfileCard from '../../components/cards/CompleteProfileCard';
import SettingsSection from '../../components/common/SettingSection';
import { useProfile } from '../../hooks/useProfile';
import { CustomToast } from '../../components/Toast';
import LogoutModal from '../../components/modals/LogoutModal';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();
  const { user, logout } = useProfile();
  const [logoutVisible, setLogoutVisible] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogoutPress = () => {
    setLogoutVisible(true);
  };

  const handleConfirmLogout = async () => {
    try {
      setLoading(true);
      setLogoutVisible(false);

      // ⏳ force 2 seconds loader
      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 2000);
      });

      await logout();
    } catch (error) {
      CustomToast('Logout failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={appstyles.container} edges={['top']}>
      <ScreenHeader title="My Profile" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <ProfileHeader user={user} />

        <CompleteProfileCard
          onPress={() => navigation.navigate("PersonalInformation")}
        />

        <SettingsSection />

        <View style={appstyles.horizontal}>
          <PrimaryButton
            title="Logout"
            onPress={handleLogoutPress}
            loading={loading}
          />
        </View>

        <View style={styles.version}>
          <Text style={styles.versionText}>App Version 1.0.0</Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <LogoutModal
        visible={logoutVisible}
        onClose={() => setLogoutVisible(false)}
        onConfirm={handleConfirmLogout}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  version: {
    alignItems: 'center',
    marginTop: 20,
  },
  versionText: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.lightGray,
  },
});
