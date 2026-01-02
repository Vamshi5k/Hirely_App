import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  X,
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  Building2,
} from 'lucide-react-native';

const { height } = Dimensions.get('window');

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
  lightPrimary: '#DBEAFE',
  disabled: '#DBEAFE',
  disabledText: '#64748B',
};

const Fonts = {
  regular: 'Syne-Regular',
  bold: 'Syne-Bold',
  mono: 'Syne-Mono',
};

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[
      styles.chip,
      isSelected && styles.chipSelected,
    ]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[
      styles.chipText,
      isSelected && styles.chipTextSelected,
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

interface FilterSectionProps {
  icon: any;
  title: string;
  children: React.ReactNode;
}

const FilterSection: React.FC<FilterSectionProps> = ({ icon: Icon, title, children }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Icon size={16} color={Colors.mediumGray} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    {children}
  </View>
);

interface FiltersModalProps {
  visible: boolean;
  onClose: () => void;
}

const FiltersModal: React.FC<FiltersModalProps> = ({ visible, onClose }) => {
  const [jobType, setJobType] = useState<string[]>([]);
  const [workMode, setWorkMode] = useState<string[]>([]);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState('50k');
  const [companySize, setCompanySize] = useState<string[]>([]);

  const toggleSelection = (array: string[], setArray: (val: string[]) => void, value: string) => {
    if (array.includes(value)) {
      setArray(array.filter(item => item !== value));
    } else {
      setArray([...array, value]);
    }
  };

  const resetFilters = () => {
    setJobType([]);
    setWorkMode([]);
    setExperienceLevel([]);
    setSalaryRange('50k');
    setCompanySize([]);
  };

  const applyFilters = () => {
    // Handle filter application
    console.log({
      jobType,
      workMode,
      experienceLevel,
      salaryRange,
      companySize,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Filters</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={20} color={Colors.dark} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            {/* Job Type */}
            <FilterSection icon={Briefcase} title="Job Type">
              <View style={styles.chipContainer}>
                {['Full-time', 'Part-time', 'Contract', 'Freelance'].map(type => (
                  <FilterChip
                    key={type}
                    label={type}
                    isSelected={jobType.includes(type)}
                    onPress={() => toggleSelection(jobType, setJobType, type)}
                  />
                ))}
              </View>
            </FilterSection>

            {/* Work Mode */}
            <FilterSection icon={MapPin} title="Work Mode">
              <View style={styles.chipContainer}>
                {['Remote', 'On-site', 'Hybrid'].map(mode => (
                  <FilterChip
                    key={mode}
                    label={mode}
                    isSelected={workMode.includes(mode)}
                    onPress={() => toggleSelection(workMode, setWorkMode, mode)}
                  />
                ))}
              </View>
            </FilterSection>

            {/* Experience Level */}
            <FilterSection icon={Clock} title="Experience Level">
              <View style={styles.chipContainer}>
                {['Entry', 'Mid', 'Senior', 'Lead'].map(level => (
                  <FilterChip
                    key={level}
                    label={level}
                    isSelected={experienceLevel.includes(level)}
                    onPress={() => toggleSelection(experienceLevel, setExperienceLevel, level)}
                  />
                ))}
              </View>
            </FilterSection>

            {/* Salary Range */}
            <FilterSection icon={DollarSign} title="Minimum Salary">
              <View style={styles.salaryContainer}>
                <Text style={styles.salaryValue}>${salaryRange}+</Text>
                <View style={styles.salaryOptions}>
                  {['30k', '50k', '80k', '100k', '150k'].map(amount => (
                    <TouchableOpacity
                      key={amount}
                      style={[
                        styles.salaryOption,
                        salaryRange === amount && styles.salaryOptionSelected,
                      ]}
                      onPress={() => setSalaryRange(amount)}
                    >
                      <Text style={[
                        styles.salaryOptionText,
                        salaryRange === amount && styles.salaryOptionTextSelected,
                      ]}>
                        ${amount}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </FilterSection>

            {/* Company Size */}
            <FilterSection icon={Building2} title="Company Size">
              <View style={styles.chipContainer}>
                {['1-50', '51-200', '201-1000', '1000+'].map(size => (
                  <FilterChip
                    key={size}
                    label={`${size} employees`}
                    isSelected={companySize.includes(size)}
                    onPress={() => toggleSelection(companySize, setCompanySize, size)}
                  />
                ))}
              </View>
            </FilterSection>

            <View style={{ height: 12 }} />
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={resetFilters}
              activeOpacity={0.7}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.applyButton}
              onPress={applyFilters}
              activeOpacity={0.8}
            >
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default FiltersModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: height * 0.9,
    paddingBottom: 0,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.background,
  },

  headerTitle: {
    fontSize: 18,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },

  closeButton: {
    padding: 4,
  },

  scrollView: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  section: {
    marginBottom: 24,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },

  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.background,
    backgroundColor: Colors.white,
  },

  chipSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightPrimary,
  },

  chipText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },

  chipTextSelected: {
    color: Colors.primary,
  },

  salaryContainer: {
    gap: 12,
  },

  salaryValue: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  salaryOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  salaryOption: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.background,
    backgroundColor: Colors.white,
  },

  salaryOptionSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.lightPrimary,
  },

  salaryOptionText: {
    fontSize: 12,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },

  salaryOptionTextSelected: {
    color: Colors.primary,
  },

  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.background,
    backgroundColor: Colors.white,
  },

  resetButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },

  resetButtonText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.dark,
  },

  applyButton: {
    flex: 2,
    paddingVertical: 14,
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },

  applyButtonText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.white,
  },
});