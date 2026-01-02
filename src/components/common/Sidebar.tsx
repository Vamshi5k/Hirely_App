import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import MiniCalendar from '../calendar/calendar';
import EventCard, { CalendarEvent } from '../cards/EventCard';


interface Props {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  events: CalendarEvent[];
}

const Sidebar: React.FC<Props> = ({
  selectedDate,
  onDateSelect,
  events,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar</Text>
        <TouchableOpacity style={styles.add}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
      </View>

      <MiniCalendar
        selectedDate={selectedDate}
        onDateSelect={onDateSelect}
        eventDates={events.map(() => selectedDate)}
      />

      <View style={styles.today}>
        <Text style={styles.todayTitle}>Today</Text>
        {events.slice(0, 2).map(event => (
          <EventCard key={event.id} event={event} compact />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: Colors.white,
    borderRightWidth: 1,
    borderRightColor: Colors.border,
  },
  header: {
    padding: 20,
    paddingTop: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    color: Colors.dark,
  },
  add: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: Colors.white,
    fontSize: 20,
  },
  today: { padding: 20 },
  todayTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
});

export default Sidebar;
