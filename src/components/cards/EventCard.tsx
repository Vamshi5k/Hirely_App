import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Clock, Briefcase } from 'lucide-react-native';
import { Fonts } from '../../theme/typography';

/* ===================== TYPES ===================== */

export interface CalendarEvent {
  id: number;
  title: string;
  time: string;
  description?: string;
  company?: string;
  tag?: string;
}

/* ===================== COMPONENT ===================== */

interface Props {
  event: any;
}

const EventCard: React.FC<Props> = ({ event }) => {
  return (
    <View style={styles.card}>
      {/* Title */}
      <Text style={styles.title}>{event.title}</Text>

      {/* Time */}
      <View style={styles.timeRow}>
        <Clock size={13} color={Colors.mediumGray} />
        <Text style={styles.timeText}>{event.time}</Text>
      </View>

      {/* Description */}
      {event.description && (
        <Text style={styles.description}>{event.description}</Text>
      )}

      {/* Pills */}
      <View style={styles.pillRow}>
        {event.company && (
          <View style={styles.companyPill}>
            <Briefcase size={13} color={Colors.primary} />
            <Text style={styles.companyText}>{event.company}</Text>
          </View>
        )}

        {event.tag && (
          <View style={styles.tagPill}>
            <Text style={styles.tagText}>{event.tag}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default EventCard;

/* ===================== STYLES ===================== */

const Colors = {
  primary: '#2563EB',
  dark: '#0F172A',
  mediumGray: '#64748B',
  white: '#FFFFFF',
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  title: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 4,
  },

  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },

  timeText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontFamily: Fonts.mono,
  },

  description: {
    fontSize: 13,
    color: Colors.mediumGray,
    lineHeight: 18,
    marginBottom: 10,
    fontFamily: Fonts.regular,
  },

  pillRow: {
    flexDirection: 'row',
    gap: 8,
  },

  companyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#EEF2FF',
  },

  companyText: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  tagPill: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: Colors.primary,
  },

  tagText: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
