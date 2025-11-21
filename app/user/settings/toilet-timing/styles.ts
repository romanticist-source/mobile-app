import { StyleSheet } from 'react-native';
import {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  accentPrimary,
  xs,
  sm,
  md,
  xl,
  fontSm,
  fontMd,
  fontBase,
  fontLg,
  fontXxxxl,
  radiusSm,
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
  scrollContent: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: sm,
    paddingVertical: md,
  },
  section: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
  },
  notificationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: md,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  notificationLabel: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  intervalContainer: {
    marginBottom: md,
  },
  intervalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: xs,
  },
  intervalLabel: {
    fontSize: fontMd,
    color: textPrimary,
  },
  intervalValue: {
    fontSize: fontBase,
    fontWeight: '600',
    color: accentPrimary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  intervalRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: xs,
  },
  intervalRangeText: {
    fontSize: fontSm,
    color: textSecondary,
  },
  descriptionBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: md,
  },
  descriptionText: {
    fontSize: fontSm,
    color: textSecondary,
    lineHeight: 18,
  },
  recordsSection: {
    marginTop: md,
  },
  recordsTitle: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: sm,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordCheckIcon: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: sm,
  },
  recordTime: {
    fontSize: fontBase,
    color: textPrimary,
  },
  recordBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordBadgeScheduled: {
    backgroundColor: '#F5F5F5',
  },
  recordBadgeManual: {
    backgroundColor: '#FFF3E0',
  },
  recordBadgeText: {
    fontSize: fontSm,
    fontWeight: '600',
  },
  recordBadgeTextScheduled: {
    color: '#757575',
  },
  recordBadgeTextManual: {
    color: '#FF9800',
  },
  footer: {
    backgroundColor: surface,
    paddingHorizontal: sm,
    paddingVertical: sm,
    borderTopWidth: 1,
    borderTopColor: border,
  },
  saveButton: {
    backgroundColor: accentPrimary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: sm,
    borderRadius: radiusSm,
  },
  saveButtonIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  saveButtonText: {
    fontSize: fontBase,
    fontWeight: '700',
    color: surface,
  },
});
