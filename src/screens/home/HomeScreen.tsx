import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../theme/colors';

import Header from '../../components/common/Header';
import SectionHeader from '../../components/common/SectionHeader';
import SearchBar from '../../components/common/SearchBar';
import JobCard from '../../components/cards/JobCard';
import MyJobCard from '../../components/cards/MyJobCard';

import JobCardSkeleton from '../../components/skeleton/JobCardSkeleton';
import MyJobCardSkeleton from '../../components/skeleton/MyJobCardSkeleton';
import EmptyState from '../../components/common/EmptyState';

import { RECOMMENDED_JOBS } from '../../data/recommended-jobs';
import { NEARBY_JOBS } from '../../data/nearby-jobs';
import { EMPTY_STATES } from '../../data/empty-state';
import { appstyles } from '../../styles';

type NearbyJob = (typeof NEARBY_JOBS)[0];
type RecommendedJob = (typeof RECOMMENDED_JOBS)[0];

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setRefreshing(false);
    }, 2000);
  }, []);

  const renderRecommendedItem = useCallback(
    ({ item }: { item: RecommendedJob }) => (
      <JobCard
        id={item.id}
        title={item.title}
        company={item.company}
        description={item.description}
        badges={item.badges}
        isSaved={item.isSaved}
        horizontal
      />
    ),
    [],
  );

  const renderNearbyItem = useCallback(
    ({ item }: { item: NearbyJob }) => (
      <MyJobCard
        id={item.id}
        title={item.title}
        company={item.company}
        description={item.description}
        badges={item.badges}
      />
    ),
    [],
  );

  const RecommendedSkeleton = () => (
    <View style={styles.horizontalSkeleton}>
      {Array.from({ length: 3 }).map((_, i) => (
        <JobCardSkeleton key={i} horizontal />
      ))}
    </View>
  );

  const NearbySkeleton = () => (
    <View>
      {Array.from({ length: 4 }).map((_, i) => (
        <MyJobCardSkeleton key={i} />
      ))}
    </View>
  );

  const ListHeader = () => (
    <>
      <SectionHeader title="Recommended Jobs" />
      {loading ? (
        <RecommendedSkeleton />
      ) : (
        <FlatList
          horizontal
          data={RECOMMENDED_JOBS}
          keyExtractor={item => item.id}
          renderItem={renderRecommendedItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      )}
      <SectionHeader title="Nearby Jobs" />
    </>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={appstyles.horizontal}>
        <Header />
        <SearchBar
          isPressable
          showFilter
          onPress={() => navigation.navigate('SearchScreen')}
        />
      </View>

      <FlatList
        data={loading ? [] : NEARBY_JOBS}
        keyExtractor={item => item.id}
        renderItem={renderNearbyItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={
          loading ? (
            <NearbySkeleton />
          ) : (
            <EmptyState
              title={EMPTY_STATES.nearbyJobs.title}
              description={EMPTY_STATES.nearbyJobs.description}
            />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
            colors={[Colors.primary]}
          />
        }
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  horizontalList: {
    paddingVertical: 8,
  },
  separator: {
    width: 12,
  },
  horizontalSkeleton: {
    flexDirection: 'row',
    paddingVertical: 8,
    gap: 12,
  },
});
