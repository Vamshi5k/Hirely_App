import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../theme/colors';
import GoBackHeader from '../../components/common/GoBackHeader';
import SearchBar from '../../components/common/SearchBar';
import MyJobCard from '../../components/cards/MyJobCard';
import MyJobCardSkeleton from '../../components/skeleton/MyJobCardSkeleton';
import EmptyState from '../../components/common/EmptyState';
import { JOBS } from '../../data/search-jobs';

const SKELETON_COUNT = 5;

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const PAGE_SIZE = 5;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const filteredJobs = useMemo(() => {
    if (!query.trim()) return JOBS;

    return JOBS.filter(job =>
      `${job.title} ${job.company}`.toLowerCase().includes(query.toLowerCase()),
    );
  }, [query]);

  const paginatedJobs = useMemo(() => {
    return filteredJobs.slice(0, page * PAGE_SIZE);
  }, [filteredJobs, page]);

  const handleLoadMore = () => {
    if (loadingMore) return;

    if (paginatedJobs.length >= filteredJobs.length) return;

    setLoadingMore(true);

    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
    }, 1000);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  const renderJob = ({ item }: any) => (
    <MyJobCard
      id={item?.id}
      title={item.title}
      company={item.company}
      description={item.description}
      badges={item.badges}
      isSaved={item.isSaved}
      isBookmarked={item.isBookmarked}
      // onPress={() => console.log('Open job', item.id)}
      onPressSave={() => console.log('Save job', item.id)}
      onPressBookmark={() => console.log('Bookmark job', item.id)}
    />
  );

  const ListEmptyComponent = () => {
    if (loading) {
      return (
        <>
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <MyJobCardSkeleton key={index} />
          ))}
        </>
      );
    }

    return (
      <EmptyState
        variant="search"
        title="No results found"
        description="Try different keywords or check spelling."
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.container}>
        <GoBackHeader title="Search Job" />

        <SearchBar value={query} onChangeText={setQuery} showFilter />

        <FlatList
          data={loading ? [] : paginatedJobs}
          keyExtractor={item => item.id}
          renderItem={renderJob}
          ListEmptyComponent={ListEmptyComponent}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.3}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingTop: 8,
    paddingBottom: 24,
  },
});
