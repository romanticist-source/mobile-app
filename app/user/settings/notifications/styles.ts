import { StyleSheet } from 'react-native';
import {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  xs,
  sm,
  md,
  lg,
  xl,
  fontMd,
  fontLg,
  fontXxxxl,
  headerButton,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sm,
    paddingTop: xl,
    paddingBottom: sm,
    backgroundColor: surface,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  backButton: {
    padding: xs,
    marginLeft: -xs,
  },
  backIcon: {
    fontSize: fontXxxxl,
    color: textPrimary,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
  },
  headerRight: {
    width: headerButton,
  },
  scrollContent: {
    flex: 1,
  },
  contentWrapper: {
    padding: sm,
  },
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
