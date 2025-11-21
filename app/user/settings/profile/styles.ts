import { StyleSheet } from 'react-native';
import {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  accentLight,
  xs,
  sm,
  md,
  lg,
  xl,
  fontMd,
  fontLg,
  fontXxl,
  fontXxxxl,
  radiusFull,
  iconContainerSize,
  iconSize,
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
    fontSize: fontLg,
    fontWeight: '600',
    color: textPrimary,
  },
  headerRight: {
    width: headerButton,
  },
  saveButton: {
    padding: xs,
  },
  saveButtonText: {
    fontSize: fontMd,
    fontWeight: '600',
    color: '#007AFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: lg,
    paddingTop: md,
  },
  iconContainer: {
    width: iconContainerSize,
    height: iconContainerSize,
    borderRadius: radiusFull,
    backgroundColor: accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: md,
  },
  icon: {
    fontSize: iconSize,
  },
  title: {
    fontSize: fontXxl,
    fontWeight: 'bold',
    color: textPrimary,
    marginBottom: xs,
  },
  description: {
    fontSize: fontMd,
    color: textSecondary,
    textAlign: 'center',
  },
});
