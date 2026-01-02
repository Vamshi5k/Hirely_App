import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Heart, Bookmark } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  description: string;
  badges: string[];
  isSaved?: boolean;
  isBookmarked?: boolean;
  onPressHeart?: () => void;
  onPressBookmark?: () => void;
  horizontal?: boolean;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const JobCard: React.FC<JobCardProps> = ({
  id,
  title,
  company,
  description,
  badges,
  isSaved = false,
  isBookmarked = false,
  onPressHeart,
  onPressBookmark,
  horizontal = false,
}) => {
  const navigation = useNavigation<any>();

  const handleNavigate = () => {
    navigation.navigate('JobDescription', { jobId: id });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={handleNavigate}
      style={[styles.card, horizontal && styles.horizontalCard]}
    >
      {isSaved && <View style={styles.glow} />}

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.company} numberOfLines={1}>
            {company}
          </Text>
        </View>

        <View style={styles.actions}>
          {/* Bookmark */}
          <TouchableOpacity
            onPress={onPressBookmark}
            onPressIn={(e) => e.stopPropagation()}
            activeOpacity={0.7}
            style={[
              styles.iconButton,
              isBookmarked && styles.bookmarkActive,
            ]}
          >
            <Bookmark
              size={18}
              color={isBookmarked ? Colors.white : Colors.lightGray}
              fill={isBookmarked ? Colors.white : 'transparent'}
            />
          </TouchableOpacity>

          {/* Heart */}
          <TouchableOpacity
            onPress={onPressHeart}
            onPressIn={(e) => e.stopPropagation()}
            activeOpacity={0.7}
            style={[
              styles.iconButton,
              isSaved && styles.heartActive,
            ]}
          >
            <Heart
              size={18}
              color={isSaved ? Colors.white : Colors.lightGray}
              fill={isSaved ? Colors.primary : 'transparent'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Description */}
      <Text style={styles.description} numberOfLines={3}>
        {description}
      </Text>

      {/* Badges */}
      <View style={styles.badges}>
        {badges.slice(0, 3).map((badge, index) => (
          <View key={index} style={styles.badge}>
            <Text style={styles.badgeText} numberOfLines={1}>
              {badge}
            </Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.primaryDark,
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    minHeight: 200,
    maxHeight: 275,
    position: 'relative',
  },

  horizontalCard: {
    width: Math.min(300, SCREEN_WIDTH * 0.85),
    marginRight: 8,
    minHeight: 205,
    maxHeight: 255,
  },

  glow: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 20,
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    zIndex: -1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  titleWrapper: {
    flex: 1,
    marginRight: 12,
  },

  title: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },

  company: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: Fonts.bold,
    color: Colors.lightGray,
  },

  actions: {
    flexDirection: 'row',
    gap: 8,
  },

  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
  },

  bookmarkActive: {
    backgroundColor: 'rgba(148,163,184,0.15)',
    borderColor: 'rgba(148,163,184,0.3)',
  },

  heartActive: {
    backgroundColor: 'rgba(37,99,235,0.2)',
    borderColor: 'rgba(37,99,235,0.4)',
  },

  description: {
    marginTop: 10,
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.lightGray,
    lineHeight: 22,
  },

  badges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },

  badge: {
    backgroundColor: 'rgba(26, 26, 200, 0.55)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 10,
    marginBottom: 6,
    maxWidth: 120,
  },

  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.white,
    letterSpacing: 0.3,
  },
});
