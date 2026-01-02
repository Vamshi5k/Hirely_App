import { StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { Fonts } from '../theme/typography';

export const appstyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  horizontal: {
    paddingHorizontal: 16,
  },
  labelText: {
    fontSize: 13,
    color: Colors.mediumGray,
    fontFamily: Fonts.bold,
    marginBottom: 6,
  },
});
