import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GoBackHeader from '../../components/common/GoBackHeader';
import JobTabs from '../../components/tabs';
import NotificationCard from '../../components/cards/NotificationCard';
import EmptyState from '../../components/common/EmptyState';

import { appstyles } from '../../styles';
import { mockNotifications } from '../../data/notification-data';
import { EMPTY_STATES } from '../../data/empty-state';
import { Notification, TabKey } from '../../types/Notification-Type';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    setNotifications(mockNotifications);
  }, []);

  const filteredNotifications = notifications.filter(item =>
    activeTab === 'all' ? true : item.type === activeTab,
  );

  return (
    <SafeAreaView style={appstyles.container} edges={['top']}>
      <View style={appstyles.horizontal}>
        <GoBackHeader title="Notifications" />
      </View>

      <JobTabs activeTab={activeTab} onChange={setActiveTab} />

      <FlatList
        data={filteredNotifications}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        ListEmptyComponent={
          <EmptyState
            title={EMPTY_STATES.notifications.title}
            description={EMPTY_STATES.notifications.description}
          />
        }
        contentContainerStyle={[
          styles.listContent,
          filteredNotifications.length === 0 && styles.listContentEmpty,
        ]}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listContentEmpty: {
    flexGrow: 1,
  },
});
