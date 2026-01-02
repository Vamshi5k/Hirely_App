import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import { getStatusConfig } from '../../utlis/getStatusConfig';

interface Props {
  title: string;
  company: string;
  description: string;
  badges: string[];
  status?: 'applied' | 'interviewing' | 'offer' | 'rejected' | 'saved'  | any;
  onPress?: () => void;
}

const MyJobCard: React.FC<Props> = ({
  title,
  company,
  description,
  badges,
  status,
  onPress,
}) => {
  const statusConfig = getStatusConfig(status);

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={onPress}
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>

          <View style={styles.companyRow}>
            <View style={styles.companyDot} />
            <Text style={styles.company} numberOfLines={1}>
              {company}
            </Text>
          </View>
        </View>

        {statusConfig && (
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusConfig.bg,
                borderColor: statusConfig.border,
              },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: statusConfig.dotColor },
              ]}
            />
            <Text
              style={[
                styles.statusText,
                { color: statusConfig.color },
              ]}
            >
              {statusConfig.text}
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      <View style={styles.badgeRow}>
        {badges.slice(0, 3).map((badge, index) => (
          <View key={index} style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        ))}

        {badges.length > 3 && (
          <View style={[styles.badge, styles.moreBadge]}>
            <Text style={styles.moreBadgeText}>
              +{badges.length - 3}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default MyJobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(15,23,42,0.06)',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  headerLeft: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 4,
  },

  companyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  companyDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primaryDark,
  },

  company: {
    fontSize: 11.5,
    fontFamily: Fonts.bold,
    color: Colors.primaryDark,
  },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },

  statusDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  statusText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    letterSpacing: 0.2,
  },

  description: {
    fontSize: 12.5,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
    lineHeight: 18,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 6,
  },

  badge: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
  },

  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },

  moreBadge: {
    backgroundColor: Colors.mediumGray,
  },

  moreBadgeText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});
