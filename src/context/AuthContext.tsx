import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from '../types/Auth-Types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ONBOARDING_KEY = 'onboarding_done';
const TOKEN_KEY = 'token';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    bootstrap();
  }, []);

  const bootstrap = async () => {
    try {
      const [token, onboardingDone] = await Promise.all([
        AsyncStorage.getItem(TOKEN_KEY),
        AsyncStorage.getItem(ONBOARDING_KEY),
      ]);

      setIsLoggedIn(!!token);
      setShowOnboarding(!onboardingDone);
    } catch (e) {
      console.warn('Auth bootstrap error', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setIsLoggedIn(false);
  };

  const completeOnboarding = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        showOnboarding,
        login,
        logout,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};
