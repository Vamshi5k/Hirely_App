import React, { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';

import SplashScreen from '../screens/splash/splash';
import OnBoarding from '../screens/onboarding/onboarding';
import Welcome from '../screens/welcome';
import Login from '../screens/auth/LoginScreen';
import Register from '../screens/auth/RegisterScreen';
import ForgotPassword from '../screens/auth/ForgotPassword';
import OTPVerification from '../screens/auth/OtpScreen';
import JobFieldSelection from '../screens/auth/JobFieldSelection';

import Bottombar from '../components/bottombar/bottombar';
import SearchScreen from '../screens/search';
import JobDescription from '../screens/job-description';
import JobApply from '../screens/job-apply';
import Success from '../screens/sucess';
import Calendar from '../screens/calendar';

import NoInternetScreen from '../screens/NoInternet';
import { AuthProvider } from '../context/AuthContext';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import PersonalInformation from '../screens/personal-information';
import SavedJobs from '../screens/saved-jobs';
import Notifications from '../screens/notifications';

const Stack = createNativeStackNavigator<any>();

const RootNavigator = () => {
  const isConnected = useNetworkStatus();

  if (!isConnected) {
    return <NoInternetScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnBoarding} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Otp" component={OTPVerification} />
        <Stack.Screen name="JobSelection" component={JobFieldSelection} />

        <Stack.Screen name="HomeScreen" component={Bottombar} />
        <Stack.Screen name="SearchScreen" component={SearchScreen} />
        <Stack.Screen name="JobDescription" component={JobDescription} />
        <Stack.Screen name="ApplyJob" component={JobApply} />
        <Stack.Screen name="Success" component={Success} />
        <Stack.Screen name="CalendarScreen" component={Calendar} />
        <Stack.Screen name="PersonalInformation" component={PersonalInformation} />
        <Stack.Screen name="SavedJobs" component={SavedJobs} />
        <Stack.Screen name="Notifications" component={Notifications} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
