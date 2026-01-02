import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ScreenHeader from '../../components/common/ScreenHeader';
import SectionHeader from '../../components/common/SectionHeader';
import MiniCalendar from '../../components/calendar/calendar';
import EventCard from '../../components/cards/EventCard';
import EventCardSkeleton from '../../components/skeleton/EventCardSkeleton';

import { Colors } from '../../theme/colors';
import { appstyles } from '../../styles';
import { calendarEvents } from '../../data/calendar-events';
import { CalendarEvent } from '../../components/cards/EventCard';
import { Fonts } from '../../theme/typography';

const getDateKey = (date: Date) => date.toISOString().split('T')[0];

const CalendarScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const dateKey = useMemo(() => getDateKey(selectedDate), [selectedDate]);

  const eventsForSelectedDay = useMemo<CalendarEvent[]>(
    () => calendarEvents[dateKey] ?? [],
    [dateKey],
  );

  const markedDates = useMemo(
    () => Object.keys(calendarEvents).map(d => new Date(d)),
    [],
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: CalendarEvent }) =>
      refreshing ? <EventCardSkeleton /> : <EventCard event={item} />,
    [refreshing],
  );

  const renderEmptyState = useCallback(
    () =>
      refreshing ? (
        <>
          <EventCardSkeleton />
          <EventCardSkeleton />
          <EventCardSkeleton />
        </>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No events scheduled for this day</Text>
        </View>
      ),
    [refreshing],
  );

  return (
    <SafeAreaView style={appstyles.container}>
      <ScreenHeader title="Calendar" />

      <MiniCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
        eventDates={markedDates}
        workingDays={[1, 2, 3, 4, 5, 6]}
      />

      <View style={styles.section}>
        <SectionHeader title="Today's Events" />

        <FlatList<CalendarEvent>
          data={eventsForSelectedDay}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    paddingHorizontal: 16,
  },
  emptyState: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
  },
});
