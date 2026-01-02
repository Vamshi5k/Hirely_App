import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../components/common/ScreenHeader';
import JobTabs from '../../components/tabs';
import MyJobCard from '../../components/cards/AppiledJobCard';

import { Colors } from '../../theme/colors';
import { mockJobs } from '../../data/appiled-jobs';
import MyJobCardSkeleton from '../../components/skeleton/MyJobCardSkeleton';

type TabType = 'applied' | 'approved' | 'all';

const SKELETON_COUNT = 6;

const AppliedJobs = () => {
  const [activeTab, setActiveTab] = useState<TabType>('applied');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const jobs = mockJobs[activeTab];

  /* Initial Load */
  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [activeTab]);

  /* Pull to Refresh */
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const showSkeletons = loading || refreshing;

  const renderItem = ({ item }: any) => (
    <MyJobCard {...item} status={item.status} />
  );

  const renderSkeleton = () => <MyJobCardSkeleton />;

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Text style={styles.emptyText}>No jobs found</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScreenHeader title="Applied Jobs" />

      <JobTabs activeTab={activeTab} onChange={setActiveTab} />

      <FlatList
        data={showSkeletons ? Array.from({ length: SKELETON_COUNT }) : jobs}
        renderItem={showSkeletons ? renderSkeleton : renderItem}
        keyExtractor={(_: any, index) =>
          showSkeletons ? `skeleton-${index}` : _.id
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListEmptyComponent={!showSkeletons ? renderEmpty : null}
        refreshControl={
          <RefreshControl
            refreshing={false} 
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default AppliedJobs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  empty: {
    paddingVertical: 80,
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 16,
    color: Colors.mediumGray,
  },
});
