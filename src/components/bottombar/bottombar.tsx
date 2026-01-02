import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Platform } from 'react-native';
import { Home, Calendar, MessageCircle, User } from 'lucide-react-native';

import HomeScreen from '../../screens/home/HomeScreen';
import ProfileScreen from '../../screens/profile/ProfileScreen';
import CalendarScreen from '../../screens/calendar';
import { FolderOpenDot } from 'lucide-react-native/icons';
import AppliedJobs from '../../screens/applied-jobs';
// Import your Calendar and Messages screens
// import CalendarScreen from '../../screens/calendar/CalendarScreen';
// import MessagesScreen from '../../screens/messages/MessagesScreen';

const Tab = createBottomTabNavigator();

const Colors = {
  primary: '#2563EB',
  primaryDark: '#1E40AF',
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
  disabled: '#1E293B',
  disabledText: '#64748B',
} as const;

const Bottombar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = Home;
              break;
            case 'Calendar':
              IconComponent = Calendar;
              break;
            case 'AppliedJobs':
              IconComponent = FolderOpenDot;
              break;
            case 'Profile':
              IconComponent = User;
              break;
            default:
              IconComponent = Home;
          }

          return (
            <View
              style={[
                styles.iconContainer,
                focused && styles.iconContainerFocused,
              ]}
            >
              <IconComponent
                size={24}
                color={color}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          );
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Platform.OS === 'ios' ? 78 : 73,
          paddingTop: Platform.OS === 'ios' ? 10 : 12,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
          backgroundColor: Colors.white,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -1,
          },
          shadowOpacity: 0.05,
          shadowRadius: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="Calendar"
        component={CalendarScreen} 
        options={{
          tabBarLabel: '',
        }}
      />

      <Tab.Screen
        name="AppliedJobs"
        component={AppliedJobs} 
        options={{
          tabBarLabel: '',
          tabBarBadge: 10, // Optional: show unread count
          tabBarBadgeStyle: {
            backgroundColor: Colors.error,
            color: Colors.white,
            fontSize: 9,
            fontWeight: '700',
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            lineHeight: 16,
            top: 8,
            right: 8,
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: '',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 16,
  },
  iconContainerFocused: {
    backgroundColor: `${Colors.primary}10`,
    transform: [{ scale: 1 }],
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 8,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});

export default Bottombar;
