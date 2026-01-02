import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';


type TabKey = 'applied' | 'approved' | 'all';

interface Props {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}

const tabs = [
  { key: 'applied', label: 'Applied' },
  { key: 'approved', label: 'Approved' },
  { key: 'all', label: 'All' },
];

const JobTabs: React.FC<Props> = ({ activeTab, onChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={[
            styles.tab,
            activeTab === tab.key && styles.activeTab,
          ]}
          onPress={() => onChange(tab.key as TabKey)}
        >
          <Text
            style={[
              styles.text,
              activeTab === tab.key && styles.activeText,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default JobTabs;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },

  tab: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: Colors.white,
    borderWidth: 1.3,
    borderColor: 'rgba(15,23,42,0.08)',
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },

  text: {
    fontSize: 12,
     fontFamily: Fonts.bold,
    color: Colors.mediumGray,
  },

  activeText: {
    color: Colors.white,
  },
});
