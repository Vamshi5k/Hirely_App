import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Briefcase, CheckCircle2, XCircle, Bell } from 'lucide-react-native';
import { Notification } from '../../types/Notification-Type';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

const NotificationCard = ({ item }: { item: Notification }) => {
  const iconMap = {
    approved: <CheckCircle2 size={18} color={Colors.success} />,
    rejected: <XCircle size={18} color={Colors.error} />,
    applied: <Briefcase size={18} color={Colors.primary} />,
    info: <Bell size={18} color={Colors.info} />,
  };

  return (
    <View style={styles.card}>
      <View style={styles.icon}>{iconMap[item.type]}</View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>

        <Text style={styles.desc} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={styles.timeRow}>
          <Text style={styles.time}>{item.time}</Text>
          {!item.read && <View style={styles.dot} />}
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: Colors.lightPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 2,
  },
  desc: {
    fontSize: 12,
    color: Colors.mediumGray,
    lineHeight: 16,
    fontFamily: Fonts.regular,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 5,
    marginTop: 4,
  },
  time: {
    fontSize: 9,
    fontFamily: Fonts.bold,
    color: Colors.lightGray,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.primary,
  },
});
