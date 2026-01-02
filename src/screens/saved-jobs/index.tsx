import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, View, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appstyles } from '../../styles';
import { Colors } from '../../theme/colors';
import GoBackHeader from '../../components/common/GoBackHeader';

import EmptyState from '../../components/common/EmptyState';
import MyJobCardSkeleton from '../../components/skeleton/MyJobCardSkeleton';
import MyJobCard from '../../components/cards/MyJobCard';

type SavedJob = {
  id: string;
  title: string;
  company: string;
  description: string;
  badges: string[];
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchSavedJobs = useCallback(async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      await new Promise<void>(resolve => {
        setTimeout(() => resolve(), 1000);
      });

      const mockJobs: SavedJob[] = [
        {
          id: '1',
          title: 'Senior React Native Developer',
          company: 'Tech Corp',
          description:
            'We are looking for an experienced React Native developer to join our mobile team.',
          badges: ['Remote', 'Full-time', 'Senior Level', '$120k-$150k'],
        },
        {
          id: '2',
          title: 'Mobile App Developer',
          company: 'Startup Inc',
          description:
            'Join our fast-growing startup as a mobile developer working on cutting-edge applications.',
          badges: ['Hybrid', 'Full-time', 'Mid Level'],
        },
      ];

      setSavedJobs(mockJobs);
    } catch (error) {
      console.error('Error fetching saved jobs:', error);
      // You might want to show an error toast here
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const handleRefresh = useCallback(() => {
    fetchSavedJobs(true);
  }, [fetchSavedJobs]);

  const handleUnsaveJob = useCallback(
    async (jobId: string) => {
      try {
        setSavedJobs(prev => prev.filter(job => job.id !== jobId));

        console.log('Job unsaved:', jobId);
      } catch (error) {
        console.error('Error unsaving job:', error);
        fetchSavedJobs();
      }
    },
    [fetchSavedJobs],
  );

  const handleToggleBookmark = useCallback(async (jobId: string) => {
    try {
      // Replace with your actual API call
      // await toggleBookmark(jobId);

      console.log('Bookmark toggled:', jobId);
    } catch (error) {
      console.error('Error toggling bookmark:', error);
    }
  }, []);

  const renderSkeletons = () => (
    <>
      {[...Array(5)].map((_, index) => (
        <MyJobCardSkeleton key={`skeleton-${index}`} />
      ))}
    </>
  );

  const renderJobCard = ({ item }: { item: SavedJob }) => (
    <MyJobCard
      id={item.id}
      title={item.title}
      company={item.company}
      description={item.description}
      badges={item.badges}
      isSaved={true}
      isBookmarked={false}
      onPressSave={() => handleUnsaveJob(item.id)}
      onPressBookmark={() => handleToggleBookmark(item.id)}
    />
  );

  const renderEmptyState = () => {
    if (isLoading) return null;

    return (
      <EmptyState
        title="No saved jobs"
        description="Jobs you save will appear here for easy access later."
        variant="jobs"
      />
    );
  };
  const showSkeletons = isLoading || isRefreshing;
  return (
    <SafeAreaView style={appstyles.container} edges={['top']}>
      <View style={appstyles.horizontal}>
        <GoBackHeader title="Saved Jobs" />
      </View>

      {showSkeletons ? (
        <View style={styles.content}>{renderSkeletons()}</View>
      ) : (
        <FlatList
          data={savedJobs}
          renderItem={renderJobCard}
          keyExtractor={item => item.id}
          contentContainerStyle={[
            styles.listContent,
            savedJobs.length === 0 && styles.emptyListContent,
          ]}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SavedJobs;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  emptyListContent: {
    flexGrow: 1,
  },
});
