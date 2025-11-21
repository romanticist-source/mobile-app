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
    marginBottom: md,
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: md,
  },
  scheduleHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scheduleIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  scheduleTitle: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  scheduleHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  autoSuggestLabel: {
    fontSize: fontSm,
    color: textSecondary,
    marginRight: xs,
  },
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: sm,
  },
  scheduleCardLeft: {
    flex: 1,
  },
  scheduleCardTitle: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 4,
  },
  scheduleCardDuration: {
    fontSize: fontSm,
    color: textSecondary,
  },
  scheduleCardTime: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  editScheduleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: border,
    borderRadius: radiusSm,
    paddingVertical: sm,
    alignItems: 'center',
    marginTop: xs,
  },
  editScheduleButtonText: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
  },
  recordsSection: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
  },
  recordsSectionTitle: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: md,
  },
  recordCard: {
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
    flex: 1,
  },
  recordCheckIcon: {
    fontSize: 18,
    color: '#4CAF50',
    marginRight: sm,
  },
  recordInfo: {
    flex: 1,
  },
  recordTime: {
    fontSize: fontBase,
    color: textPrimary,
    marginBottom: 2,
  },
  recordDuration: {
    fontSize: fontSm,
    color: textSecondary,
  },
  recordBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordBadgeScheduled: {
    backgroundColor: '#E8F5E9',
  },
  recordBadgeSuggested: {
    backgroundColor: '#E8F5E9',
  },
  recordBadgeText: {
    fontSize: fontSm,
    fontWeight: '600',
  },
  recordBadgeTextScheduled: {
    color: '#4CAF50',
  },
  recordBadgeTextSuggested: {
    color: '#4CAF50',
  },
  footer: {
    backgroundColor: surface,
    paddingHorizontal: sm,
    paddingVertical: sm,
    borderTopWidth: 1,
    borderTopColor: border,
  },
  saveButton: {
    backgroundColor: '#FF6B6B',
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
