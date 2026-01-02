import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Heart, Bookmark } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type MyJobCardProps = {
  id: string;
  title: string;
  company: string;
  description: string;
  badges: string[];
  isSaved?: boolean;
  isBookmarked?: boolean;
  onPressSave?: () => void;
  onPressBookmark?: () => void;
};

const MyJobCard: React.FC<MyJobCardProps> = ({
  id,
  title,
  company,
  description,
  badges,
  isSaved = false,
  isBookmarked = false,
  onPressSave,
  onPressBookmark,
}) => {
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate('JobDescription', { jobId: id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.container}
      onPress={handleNavigate}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {company}
          </Text>
        </View>

        <View style={styles.actionButtons}>
          {/* Bookmark */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation();
              onPressBookmark?.();
            }}
            style={[
              styles.iconButton,
              isBookmarked && styles.iconButtonBookmarked,
            ]}
          >
            <Bookmark
              size={16}
              color={isBookmarked ? Colors.primaryDark : Colors.mediumGray}
              fill={isBookmarked ? Colors.primaryDark : 'transparent'}
              strokeWidth={2.5}
            />
          </TouchableOpacity>

          {/* Save / Heart */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={(e) => {
              e.stopPropagation();
              onPressSave?.();
            }}
            style={[
              styles.iconButton,
              isSaved && styles.iconButtonSaved,
            ]}
          >
            <Heart
              size={16}
              color={isSaved ? Colors.error : Colors.mediumGray}
              fill={isSaved ? Colors.error : 'transparent'}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>

      {/* Badges */}
      <View style={styles.badgeRow}>
        {badges.slice(0, 3).map((badge, index) => (
          <View key={index} style={styles.badge}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {badge}
            </Text>
          </View>
        ))}

        {badges.length > 3 && (
          <View style={[styles.badge, styles.badgeMore]}>
            <Text style={styles.badgeText}>
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
  container: {
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  headerLeft: {
    flex: 1,
    marginRight: 10,
  },

  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 2,
  },

  company: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.primaryDark,
  },

  actionButtons: {
    flexDirection: 'row',
    gap: 5,
  },

  iconButton: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: Colors.background,
    borderWidth: 1.3,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  iconButtonBookmarked: {
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
    borderColor: 'rgba(37, 99, 235, 0.2)',
  },

  iconButtonSaved: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },

  description: {
    fontSize: 13,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
    marginTop: 2,
    lineHeight: 18,
  },

  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    gap: 6,
  },

  badge: {
    backgroundColor: Colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 18,
    maxWidth: 105,
  },

  badgeMore: {
    backgroundColor: Colors.mediumGray,
  },

  badgeText: {
    fontSize: 9.5,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});

