import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import { JobField, jobFields } from '../../data/jobs-field-data';
import { CustomToast } from '../../components/Toast';

const JobFieldSelection = () => {
  const navigation = useNavigation<any>();
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const handleSelectField = (fieldId: string) => {
    if (selectedFields.includes(fieldId)) {
      setSelectedFields(selectedFields.filter(id => id !== fieldId));
    } else {
      setSelectedFields([...selectedFields, fieldId]);
    }
  };

  const handleContinue = () => {
    if (selectedFields.length > 0) {
      console.log('Selected fields:', selectedFields);
      navigation.navigate('HomeScreen');
      CustomToast('Welcome To Hirely !!');
    }
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen');
    CustomToast('Welcome To Hirely !!');
  };

  const renderFieldCard = ({ item }: { item: JobField }) => {
    const isSelected = selectedFields.includes(item.id);
    const Icon = item.icon;

    return (
      <TouchableOpacity
        style={[
          styles.fieldCard,
          isSelected && {
            borderColor: item.color,
            backgroundColor: item.bgColor,
          },
        ]}
        onPress={() => handleSelectField(item.id)}
        activeOpacity={0.7}
      >
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isSelected ? item.color : item.bgColor },
          ]}
        >
          <Icon
            size={22}
            color={isSelected ? Colors.white : item.color}
            strokeWidth={2}
          />
        </View>
        <Text
          style={[
            styles.fieldTitle,
            isSelected && { color: item.color, fontFamily: Fonts.bold },
          ]}
        >
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>Hirely</Text>
          </View>
          <Pressable style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Step 1 of 1</Text>
          </View>
          <Text style={styles.title}>
            What field are you searching for jobs?
          </Text>
          <Text style={styles.subtitle}>
            Select one or more fields that match your career interests. This
            helps us personalize your job recommendations.
          </Text>
        </View>

        {/* Job Fields Grid */}
        <View style={styles.gridContainer}>
          <FlatList
            data={jobFields}
            renderItem={renderFieldCard}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={styles.row}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Selected Count */}
        {selectedFields.length > 0 && (
          <View style={styles.selectedContainer}>
            <Text style={styles.selectedText}>
              {selectedFields.length} field
              {selectedFields.length > 1 ? 's' : ''} selected
            </Text>
          </View>
        )}

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Continue"
            onPress={handleContinue}
            disabled={selectedFields.length === 0}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 12,
  },
  logo: {
    fontSize: 20,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  skipButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  skipText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.mediumGray,
  },

  // Title Section
  titleSection: {
    paddingHorizontal: 20,
    paddingTop: 6,
    paddingBottom: 18,
  },
  badge: {
    backgroundColor: Colors.lightPrimary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 10,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.dark,
    letterSpacing: -0.8,
    marginBottom: 8,
    lineHeight: 30,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.mediumGray,
    lineHeight: 21,
    fontFamily: Fonts.regular,
  },

  // Grid
  gridContainer: {
    paddingHorizontal: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fieldCard: {
    flex: 0.48,
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.white,
 
  },
  iconContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldTitle: {
    fontSize: 12,
    fontFamily: Fonts.regular,
    color: Colors.dark,
    textAlign: 'center',
    lineHeight: 16,
  },

  // Selected Count
  selectedContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 13,
    fontFamily: Fonts.bold,
    color: Colors.primary,
  },

  // Button
  buttonContainer: {
    paddingHorizontal: 20,
    marginTop: 6,
  },
});

export default JobFieldSelection;
