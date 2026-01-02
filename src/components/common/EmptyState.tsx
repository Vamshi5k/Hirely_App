import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Briefcase, SearchX } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';

type EmptyStateProps = {
  title?: string;
  description?: string;
  variant?: 'jobs' | 'search';
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No jobs found',
  description = 'Try adjusting your filters or check back later.',
  variant = 'jobs',
}) => {
  const Icon = variant === 'search' ? SearchX : Briefcase;

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Icon size={28} color={Colors.white} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 36,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
    textAlign: 'center',
    lineHeight: 20,
  },
});
