import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../../theme/typography';

const Colors = {
  primary: '#2563EB',
  primaryDark: '#1545e4ff',
  dark: '#0F172A',
  mediumGray: '#475569',
  lightGray: '#94A3B8',
  background: '#F2F1F4',
  surface: '#0F172A',
  border: '#1E293B',
  white: '#FFFFFF',
  success: '#22C55E',
  error: '#EF4444',
  warning: '#2563EB',
  info: '#3B82F6',
  disabled: '#1E293B',
  disabledText: '#64748B',
};

interface Props {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  workingDays?: number[];
  eventDates?: Date[];
}

const WORKING_DAYS = [1, 2, 3, 4, 5, 6];

const MiniCalendar: React.FC<Props> = ({
  selectedDate,
  onDateSelect,
  workingDays = WORKING_DAYS,
  eventDates = [],
}) => {
  const [month, setMonth] = useState(
    new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
  );

  const calendar = useMemo(() => {
    const y = month.getFullYear();
    const m = month.getMonth();
    const firstDay = new Date(y, m, 1).getDay();
    const totalDays = new Date(y, m + 1, 0).getDate();

    const rows: (Date | null)[][] = [];
    let row: (Date | null)[] = [];

    for (let i = 0; i < firstDay; i++) row.push(null);

    for (let d = 1; d <= totalDays; d++) {
      row.push(new Date(y, m, d));
      if (row.length === 7) {
        rows.push(row);
        row = [];
      }
    }

    while (row.length && row.length < 7) row.push(null);
    if (row.length) rows.push(row);

    return rows;
  }, [month]);

  const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

  const hasEvent = (date: Date) => eventDates.some(d => isSameDay(d, date));

  const isWorkingDay = (date: Date) => workingDays.includes(date.getDay());

  const isToday = (date: Date) => isSameDay(date, new Date());

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <View style={styles.container}>
      {/* Month header */}
      <View style={styles.monthHeader}>
        <TouchableOpacity
          onPress={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
          style={styles.navButton}
        >
          <Text style={styles.nav}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.monthText}>
          {month.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })}
        </Text>

        <TouchableOpacity
          onPress={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
          style={styles.navButton}
        >
          <Text style={styles.nav}>›</Text>
        </TouchableOpacity>
      </View>

      {/* Weekday headers */}
      <View style={styles.weekdayRow}>
        {weekDays.map((day, i) => (
          <View key={i} style={styles.weekdayCell}>
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      {calendar.map((week, i) => (
        <View key={i} style={styles.row}>
          {week.map((date, j) => {
            if (!date) return <View key={j} style={styles.cell} />;

            const selected = isSameDay(date, selectedDate);
            const disabled = !isWorkingDay(date);
            const today = isToday(date);
            const hasEventMarker = hasEvent(date);

            return (
              <TouchableOpacity
                key={j}
                disabled={disabled}
                style={[
                  styles.cell,
                  today && !selected && styles.today,
                  selected && styles.selected,
                  disabled && styles.disabled,
                ]}
                onPress={() => onDateSelect(date)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.text,
                    today && !selected && styles.todayText,
                    selected && styles.selectedText,
                    disabled && styles.disabledText,
                  ]}
                >
                  {date.getDate()}
                </Text>

                {hasEventMarker && !selected && <View style={styles.dot} />}
              </TouchableOpacity>
            );
          })}
        </View>
      ))}

      {/* Event indicator */}
      {eventDates.length > 0 && (
        <View style={styles.eventInfo}>
          <View style={styles.eventDot} />
          <Text style={styles.eventText}>
            {eventDates.length} event{eventDates.length !== 1 ? 's' : ''} this
            month
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 14,
  },

  monthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 2,
  },
  monthText: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -0.2,
  },
  navButton: {
    padding: 6,
    borderRadius: 6,
  },
  nav: {
    fontSize: 20,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
  },

  weekdayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },
  weekdayCell: {
    width: 32,
    alignItems: 'center',
  },
  weekdayText: {
    fontSize: 11,
    fontFamily: Fonts.bold,
    color: Colors.mediumGray,
    letterSpacing: 0.4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 2,
  },
  cell: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  today: {
    backgroundColor: Colors.background,
  },
  selected: {
    backgroundColor: Colors.primary,
  },
  disabled: {
    opacity: 0.35,
  },

  text: {
    fontSize: 13,
    color: Colors.dark,
    fontFamily: Fonts.bold,
  },
  todayText: {
    color: Colors.primary,
  },
  selectedText: {
    color: Colors.white,
  },
  disabledText: {
    color: Colors.lightGray,
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    position: 'absolute',
    bottom: 4,
  },

  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
  },
  eventDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.primary,
    marginRight: 6,
  },
  eventText: {
    fontSize: 12,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
  },
});


export default MiniCalendar;
