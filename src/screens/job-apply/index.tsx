import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { User, Mail, Phone, Briefcase } from 'lucide-react-native';

import { Colors } from '../../theme/colors';
import GoBackHeader from '../../components/common/GoBackHeader';
import { appstyles } from '../../styles';
import BottomActionBar from '../../components/common/BottomActionBar';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import FileUploader, {
  UploadedFile,
} from '../../components/common/fields/FileUploader';
import Input from '../../components/common/fields/Input';
import TextArea from '../../components/common/fields/TextArea';
import { CustomToast } from '../../components/Toast';
import { useNavigation } from '@react-navigation/native';

interface JobApplicationFormValues {
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  coverLetter: string;
  resumeFiles: UploadedFile[];
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

  portfolioUrl: Yup.string().url('Please enter a valid URL').notRequired(),

  coverLetter: Yup.string()
    .min(50, 'Cover letter must be at least 50 characters')
    .max(1000, 'Cover letter must be less than 1000 characters')
    .required('Cover letter is required'),

  resumeFiles: Yup.array()
    .min(1, 'Please upload your resume')
    .required('Resume is required'),
});

const initialValues: JobApplicationFormValues = {
  fullName: '',
  email: '',
  phone: '',
  portfolioUrl: '',
  coverLetter: '',
  resumeFiles: [],
};

const JobApply = () => {
  const navigation = useNavigation<any>();
  const handleSubmit = (
    values: JobApplicationFormValues,
    { setSubmitting, resetForm }: FormikHelpers<JobApplicationFormValues>,
  ) => {
    setTimeout(() => {
      console.log('Submiited', values);
      CustomToast('Appiled SuccessFully');
      resetForm();
      setSubmitting(false);
      navigation.navigate('Success');
    }, 1000);
  };

  return (
    <SafeAreaView style={appstyles.container} edges={['top']}>
      <View style={appstyles.horizontal}>
        <GoBackHeader title="Apply Job" />
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
              style={{ flex: 1 }}
              behavior={Platform.OS === 'ios' ? 'padding' : undefined}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}
            >
              <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
              >
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

                <FileUploader
                  label="Resume / CV"
                  files={values.resumeFiles}
                  onFilesChange={files => {
                    setFieldValue('resumeFiles', files);
                    setFieldTouched('resumeFiles', true);
                  }}
                  error={errors.resumeFiles as string}
                  touched={touched.resumeFiles}
                  maxFiles={1}
                  labelStyle={appstyles.labelText}
                />

                <Input
                  label="Portfolio URL (Optional)"
                  placeholder="https://yourportfolio.com"
                  icon={Briefcase}
                  value={values.portfolioUrl}
                  onChangeText={handleChange('portfolioUrl')}
                  onBlur={handleBlur('portfolioUrl')}
                  error={errors.portfolioUrl}
                  touched={touched.portfolioUrl}
                  keyboardType="url"
                  autoCapitalize="none"
                />

                <TextArea
                  label="Cover Letter"
                  placeholder="Tell us why you're a great fit..."
                  value={values.coverLetter}
                  onChangeText={handleChange('coverLetter')}
                  onBlur={handleBlur('coverLetter')}
                  error={errors.coverLetter}
                  touched={touched.coverLetter}
                  minHeight={150}
                />
              </ScrollView>
            </KeyboardAvoidingView>

            {/* 🔒 Fixed bottom CTA */}
            <BottomActionBar>
              <PrimaryButton
                title={'Submit Application'}
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

export default JobApply;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
});
