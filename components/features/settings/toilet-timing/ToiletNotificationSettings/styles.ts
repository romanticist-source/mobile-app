import { StyleSheet } from 'react-native';
import { surface, textPrimary, textSecondary, border, sm, xs, md } from '@/styles/tokens';

export const styles = StyleSheet.create({
  section: {
    backgroundColor: surface,
    borderRadius: 12,
    padding: sm,
    borderWidth: 1,
    borderColor: border,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: sm,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  notificationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: xs,
  },
  notificationLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: textPrimary,
  },
  intervalContainer: {
    paddingTop: sm,
    paddingBottom: sm,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  intervalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: xs,
  },
  intervalLabel: {
    fontSize: 14,
    color: textPrimary,
  },
  intervalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  intervalRange: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  intervalRangeText: {
    fontSize: 12,
    color: textSecondary,
  },
  descriptionBox: {
    paddingTop: sm,
  },
  descriptionText: {
    fontSize: 13,
    color: textSecondary,
    lineHeight: 18,
  },
});
