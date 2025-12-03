import { StyleSheet } from 'react-native';
import {
  surface,
  textPrimary,
  textSecondary,
  xs,
  sm,
  fontMd,
  fontLg,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  pageHeader: {
    backgroundColor: surface,
    borderRadius: 12,
    padding: sm,
    marginBottom: sm,
  },
  headerIcon: {
    marginBottom: xs,
  },
  pageTitle: {
    fontSize: fontLg,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 4,
  },
  pageDescription: {
    fontSize: fontMd,
    color: textSecondary,
    lineHeight: 18,
  },
});
