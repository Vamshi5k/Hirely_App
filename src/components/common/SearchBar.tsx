import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Search, SlidersHorizontal } from 'lucide-react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/typography';
import FiltersModal from '../modals/FilterModal';

interface SearchBarProps {
  value?: string;
  onChangeText?: (text: string) => void;

  isPressable?: boolean;
  onPress?: () => void;

  showFilter?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  isPressable = false,
  onPress,
  showFilter = false,
}) => {
  const Container = isPressable ? TouchableOpacity : View;

  const [showFilters, setShowFilters] = useState(false);

  return (
    <View style={styles.container}>
      <Container
        style={styles.searchWrapper}
        activeOpacity={0.7}
        onPress={isPressable ? onPress : undefined}
      >
        <Search size={18} color={Colors.lightGray} />

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Job name or keywords"
          placeholderTextColor={Colors.lightGray}
          style={styles.input}
          editable={!isPressable}
          pointerEvents={isPressable ? 'none' : 'auto'}
        />
      </Container>

      {showFilter && (
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
          activeOpacity={0.7}
        >
          <SlidersHorizontal size={20} color={Colors.dark} />
        </TouchableOpacity>
      )}

      <FiltersModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },

  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 30,
    height: 48,
    paddingHorizontal: 12,
  },

  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: Colors.dark,
    fontFamily: Fonts.bold,
  },

  filterButton: {
    marginLeft: 12,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
