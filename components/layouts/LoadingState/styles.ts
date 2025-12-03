import { StyleSheet } from 'react-native';
import { textSecondary, md } from '@/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: md,
  },
  message: {
    marginTop: md,
    fontSize: 14,
    color: textSecondary,
  },
});
