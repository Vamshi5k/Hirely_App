import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  Globe,
  FileText,
} from 'lucide-react-native';

import { appstyles } from '../../styles';
import GoBackHeader from '../../components/common/GoBackHeader';
import BottomActionBar from '../../components/common/BottomActionBar';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Input from '../../components/common/fields/Input';
import TextArea from '../../components/common/fields/TextArea';
import FileUploader, {
  UploadedFile,
} from '../../components/common/fields/FileUploader';
import { CustomToast } from '../../components/Toast';
import { formatDOB } from '../../utlis/formatDOB';
import { useNavigation } from '@react-navigation/native';

interface PersonalInfoFormValues {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  jobTitle: string;
  experience: string;
  bio: string;
  portfolioUrl: string;
  linkedinUrl: string;
  profilePicture: UploadedFile[];
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters')
    .required('Full name is required'),

  email: Yup.string()
    .email('Please enter a valid email')
    .required('Email is required'),

  phone: Yup.string()
    .matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      'Please enter a valid phone number',
    )
    .required('Phone number is required'),

  dateOfBirth: Yup.string()
    .matches(
      /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
      'Please enter date in DD-MM-YYYY format',
    )
    .required('Date of birth is required'),

  address: Yup.string()
    .min(5, 'Address must be at least 5 characters')
    .required('Address is required'),

  city: Yup.string()
    .min(2, 'City must be at least 2 characters')
    .required('City is required'),

  state: Yup.string()
    .min(2, 'State must be at least 2 characters')
    .required('State is required'),

  zipCode: Yup.string()
    .matches(/^\d{5,6}$/, 'Please enter a valid zip code')
    .required('Zip code is required'),

  country: Yup.string()
    .min(2, 'Country must be at least 2 characters')
    .required('Country is required'),

  jobTitle: Yup.string()
    .min(2, 'Job title must be at least 2 characters')
    .required('Current job title is required'),

  experience: Yup.string()
    .matches(/^\d+$/, 'Experience must be a number')
    .required('Years of experience is required'),

  bio: Yup.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(500, 'Bio must be less than 500 characters')
    .required('Professional bio is required'),

  portfolioUrl: Yup.string().url('Please enter a valid URL').notRequired(),

  linkedinUrl: Yup.string().url('Please enter a valid URL').notRequired(),

  profilePicture: Yup.array().notRequired(),
});

const initialValues: PersonalInfoFormValues = {
  fullName: '',
  email: '',
  phone: '',
  dateOfBirth: '',
  address: '',
  city: '',
  state: '',
  zipCode: '',
  country: '',
  jobTitle: '',
  experience: '',
  bio: '',
  portfolioUrl: '',
  linkedinUrl: '',
  profilePicture: [],
};

const PersonalInformation = () => {
  const navigation = useNavigation<any>();
  const handleSubmit = (
    values: PersonalInfoFormValues,
    { setSubmitting }: FormikHelpers<PersonalInfoFormValues>,
  ) => {
    setTimeout(() => {
      console.log('Personal Info Updated', values);
      CustomToast('Personal information updated successfully');
      setSubmitting(false);
    }, 1000);
    CustomToast('Personal Information Updated !!');
    navigation.goback();
  };

  return (
    <SafeAreaView style={appstyles.container} edges={['top', 'bottom']}>
      <View style={appstyles.horizontal}>
        <GoBackHeader title="Personal Information" />
      </View>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          setFieldTouched,
          isSubmitting,
        }) => (
          <>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
                {/* Profile Picture */}
                <FileUploader
                  label="Profile Picture"
                  files={values.profilePicture}
                  onFilesChange={files => {
                    setFieldValue('profilePicture', files);
                    setFieldTouched('profilePicture', true);
                  }}
                  error={errors.profilePicture as string}
                  touched={touched.profilePicture}
                  maxFiles={1}
                  labelStyle={appstyles.labelText}
                />

                {/* Basic Information */}
                <Input
                  label="Full Name"
                  placeholder="Enter your full name"
                  icon={User}
                  value={values.fullName}
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                  error={errors.fullName}
                  touched={touched.fullName}
                />

                <Input
                  label="Email Address"
                  placeholder="your.email@example.com"
                  icon={Mail}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  error={errors.email}
                  touched={touched.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <Input
                  label="Phone Number"
                  placeholder="+91 7XXXXXXX1707"
                  icon={Phone}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  error={errors.phone}
                  touched={touched.phone}
                  keyboardType="phone-pad"
                />

                <Input
                  label="Date of Birth"
                  placeholder="DD-MM-YYYY"
                  icon={Calendar}
                  value={values.dateOfBirth}
                  onChangeText={text =>
                    setFieldValue('dateOfBirth', formatDOB(text))
                  }
                  onBlur={() => setFieldTouched('dateOfBirth', true)}
                  error={errors.dateOfBirth}
                  touched={touched.dateOfBirth}
                  keyboardType="numeric"
                  maxLength={10}
                />

                {/* Address Information */}
                <Input
                  label="Street Address"
                  placeholder="123 Main Street"
                  icon={MapPin}
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  error={errors.address}
                  touched={touched.address}
                />

                <Input
                  label="City"
                  placeholder="Enter your city"
                  icon={MapPin}
                  value={values.city}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  error={errors.city}
                  touched={touched.city}
                />

                <Input
                  label="State / Province"
                  placeholder="Enter your state"
                  icon={MapPin}
                  value={values.state}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  error={errors.state}
                  touched={touched.state}
                />

                <Input
                  label="Zip / Postal Code"
                  placeholder="12345"
                  icon={MapPin}
                  value={values.zipCode}
                  onChangeText={handleChange('zipCode')}
                  onBlur={handleBlur('zipCode')}
                  error={errors.zipCode}
                  touched={touched.zipCode}
                  keyboardType="numeric"
                />

                <Input
                  label="Country"
                  placeholder="Enter your country"
                  icon={Globe}
                  value={values.country}
                  onChangeText={handleChange('country')}
                  onBlur={handleBlur('country')}
                  error={errors.country}
                  touched={touched.country}
                />

                {/* Professional Information */}
                <Input
                  label="Current Job Title"
                  placeholder="e.g. Software Engineer"
                  icon={Briefcase}
                  value={values.jobTitle}
                  onChangeText={handleChange('jobTitle')}
                  onBlur={handleBlur('jobTitle')}
                  error={errors.jobTitle}
                  touched={touched.jobTitle}
                />

                <Input
                  label="Years of Experience"
                  placeholder="e.g. 5"
                  icon={FileText}
                  value={values.experience}
                  onChangeText={handleChange('experience')}
                  onBlur={handleBlur('experience')}
                  error={errors.experience}
                  touched={touched.experience}
                  keyboardType="numeric"
                />

                <TextArea
                  label="Professional Bio"
                  placeholder="Tell us about your professional background and expertise..."
                  value={values.bio}
                  onChangeText={handleChange('bio')}
                  onBlur={handleBlur('bio')}
                  error={errors.bio}
                  touched={touched.bio}
                  minHeight={120}
                />

                {/* Social Links */}
                <Input
                  label="Portfolio URL (Optional)"
                  placeholder="https://yourportfolio.com"
                  icon={Globe}
                  value={values.portfolioUrl}
                  onChangeText={handleChange('portfolioUrl')}
                  onBlur={handleBlur('portfolioUrl')}
                  error={errors.portfolioUrl}
                  touched={touched.portfolioUrl}
                  keyboardType="url"
                  autoCapitalize="none"
                />

                <Input
                  label="LinkedIn URL (Optional)"
                  placeholder="https://linkedin.com/in/yourprofile"
                  icon={Globe}
                  value={values.linkedinUrl}
                  onChangeText={handleChange('linkedinUrl')}
                  onBlur={handleBlur('linkedinUrl')}
                  error={errors.linkedinUrl}
                  touched={touched.linkedinUrl}
                  keyboardType="url"
                  autoCapitalize="none"
                />
              </ScrollView>
            </KeyboardAvoidingView>

            {/* Fixed bottom action bar */}
            <BottomActionBar>
              <PrimaryButton
                title="Save Changes"
                onPress={handleSubmit}
                disabled={isSubmitting}
                loading={isSubmitting}
              />
            </BottomActionBar>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default PersonalInformation;

const styles = StyleSheet.create({
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
});
