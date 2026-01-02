import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../theme/colors';
import GoBackHeader from '../../components/common/GoBackHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { Fonts } from '../../theme/typography';
import {
  MapPin,
  Clock,
  DollarSign,
  Rocket,
  Briefcase,
  CheckCircle2,
  Star,
  Award,
} from 'lucide-react-native';
import JobDescriptionSkeleton from '../../components/skeleton/JobDescription';
import BottomActionBar from '../../components/common/BottomActionBar';

const JobDescription = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { id } = route.params;
  const [loading, setLoading] = useState(true);

  const jobData = {
    title: 'UI/UX Designer',
    company: 'TechCorp Inc.',
    location: 'Hybrid – San Francisco, CA',
    type: 'Part-time',
    salary: 'EUR 1 200 / month',
    startDate: 'Start as soon as possible',
    description:
      "We're looking for a UI/UX Designer to help us bring a new idea to life with a clean, modern, and user-focused interface. You'll be involved in every step — from early sketches and wireframes to delivering beautiful, high-fidelity designs.",
    responsibilities: [
      'Turn product concepts into intuitive, delightful interfaces',
      'Create wireframes, prototypes, and final UI designs',
      'Work closely with developers and product managers',
      'Ensure design consistency across screens and flows',
      'Conduct user research or interpret research insights',
    ],
    requirements: [
      'Proven experience in UI/UX or Product Design',
      'Strong portfolio of mobile/web design projects',
      'Proficiency in Figma or similar design tools',
      'Understanding of UX principles and user-centered design',
      'Excellent communication and collaboration skills',
    ],
    niceToHave: [
      'Experience with design systems (iOS/Android)',
      'Familiarity with Agile workflows',
      'Motion design skills (Principle, Protopie)',
    ],
    experienceRequired: '2-4 years',
  };

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleApply = () => {
    console.log('Apply for job:', id);

    navigation.navigate('ApplyJob');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.fixWidth}>
          <GoBackHeader title="Job Details" />
        </View>
        <JobDescriptionSkeleton />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.fixWidth}>
        <GoBackHeader title="Job Details" />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.companyBadge}>
            <Briefcase size={12} color={Colors.primary} />
            <Text style={styles.companyText}>{jobData.company}</Text>
          </View>

          <Text style={styles.jobTitle}>{jobData.title}</Text>

          {/* Meta Info Grid */}
          <View style={styles.metaGrid}>
            <View style={styles.metaCard}>
              <View style={styles.metaIconWrapper}>
                <MapPin size={14} color={Colors.primary} />
              </View>
              <Text style={styles.metaLabel}>Location</Text>
              <Text style={styles.metaValue}>{jobData.location}</Text>
            </View>

            <View style={styles.metaCard}>
              <View style={styles.metaIconWrapper}>
                <Clock size={14} color={Colors.primary} />
              </View>
              <Text style={styles.metaLabel}>Type</Text>
              <Text style={styles.metaValue}>{jobData.type}</Text>
            </View>

            <View style={styles.metaCard}>
              <View style={styles.metaIconWrapper}>
                <DollarSign size={14} color={Colors.primary} />
              </View>
              <Text style={styles.metaLabel}>Salary</Text>
              <Text style={styles.metaValue}>{jobData.salary}</Text>
            </View>
          </View>

          <View style={styles.startDateBanner}>
            <Rocket size={14} color={Colors.primary} />
            <Text style={styles.startDateText}>{jobData.startDate}</Text>
          </View>
        </View>

        <View style={styles.fixWidth}>
          {/* Job Description */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionIconBg}>
                <Briefcase size={16} color={Colors.primary} />
              </View>
              <Text style={styles.sectionTitle}>Job Description</Text>
            </View>
            <Text style={styles.bodyText}>{jobData.description}</Text>
          </View>

          {/* Experience Required Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionIconBg, { backgroundColor: '#FEF3C7' }]}
              >
                <Award size={16} color="#f59e0b" />
              </View>
              <Text style={styles.sectionTitle}>Experience Required</Text>
            </View>
            <View style={styles.experienceCard}>
              <View style={styles.experienceIconWrapper}>
                <Award size={20} color="#f59e0b" />
              </View>
              <Text style={styles.experienceText}>
                {jobData.experienceRequired}
              </Text>
              <Text style={styles.experienceSubtext}>
                of relevant experience
              </Text>
            </View>
          </View>

          {/* Responsibilities */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionIconBg, { backgroundColor: '#EEF2FF' }]}
              >
                <CheckCircle2 size={16} color="#6366f1" />
              </View>
              <Text style={styles.sectionTitle}>Responsibilities</Text>
            </View>
            {jobData.responsibilities.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.checkmarkWrapper}>
                  <CheckCircle2 size={16} color="#6366f1" />
                </View>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionIconBg, { backgroundColor: '#ECFDF5' }]}
              >
                <CheckCircle2 size={16} color="#10b981" />
              </View>
              <Text style={styles.sectionTitle}>Requirements</Text>
            </View>
            {jobData.requirements.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.checkmarkWrapper}>
                  <CheckCircle2 size={16} color="#10b981" />
                </View>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Nice to Have */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View
                style={[styles.sectionIconBg, { backgroundColor: '#FFF7ED' }]}
              >
                <Star size={16} color="#f59e0b" />
              </View>
              <Text style={styles.sectionTitle}>Nice to Have</Text>
            </View>
            {jobData.niceToHave.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.checkmarkWrapper}>
                  <Star size={16} color="#f59e0b" />
                </View>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Apply Button */}
      <BottomActionBar>
        <PrimaryButton title="Apply Now" onPress={handleApply} />
      </BottomActionBar>
    </SafeAreaView>
  );
};

export default JobDescription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingBottom: 90,
  },
  fixWidth: {
    paddingHorizontal: 16,
  },
  heroCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
  },
  companyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  companyText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginLeft: 5,
  },
  jobTitle: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    marginBottom: 14,
    lineHeight: 26,
  },
  metaGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  metaCard: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  metaIconWrapper: {
    width: 28,
    height: 28,
    borderRadius: 7,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metaLabel: {
    fontSize: 9,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
    marginBottom: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    textAlign: 'center',
  },
  startDateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary + '08',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    gap: 6,
  },
  startDateText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    flex: 1,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  sectionIconBg: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.primary + '12',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    flex: 1,
  },
  bodyText: {
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
  },
  experienceCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  experienceIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  experienceText: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: '#92400e',
    marginBottom: 4,
  },
  experienceSubtext: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: '#b45309',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  checkmarkWrapper: {
    marginTop: 2,
    marginRight: 8,
    marginLeft: 5,
  },
  listText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: Fonts.regular,
    color: Colors.mediumGray,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 26 : 14,
    backgroundColor: '#FFFFFF',
  },
});
