import { StyleSheet } from 'react-native';
import { textPrimary, textSecondary, accentPrimary, md, xs } from '@/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: md,
  },
  message: {
    marginTop: md,
    fontSize: 16,
    color: textPrimary,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: md,
    paddingHorizontal: md,
    paddingVertical: xs,
    backgroundColor: accentPrimary,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
