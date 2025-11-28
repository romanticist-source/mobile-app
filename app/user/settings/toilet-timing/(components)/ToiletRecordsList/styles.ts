import { StyleSheet } from 'react-native';
import { surface, textPrimary, textSecondary, border, sm, xs } from '@/styles/tokens';

export const styles = StyleSheet.create({
  recordsSection: {
    backgroundColor: surface,
    borderRadius: 12,
    padding: sm,
    marginTop: sm,
    borderWidth: 1,
    borderColor: border,
  },
  recordsTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: sm,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: xs,
    paddingHorizontal: sm,
    marginBottom: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
  },
  recordLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: xs,
  },
  recordCheckIcon: {
    fontSize: 16,
    color: '#10B981',
  },
  recordTime: {
    fontSize: 14,
    fontWeight: '500',
    color: textPrimary,
  },
  recordBadge: {
    paddingHorizontal: xs,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordBadgeScheduled: {
    backgroundColor: '#DBEAFE',
  },
  recordBadgeManual: {
    backgroundColor: '#FEE2E2',
  },
  recordBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  recordBadgeTextScheduled: {
    color: '#1E40AF',
  },
  recordBadgeTextManual: {
    color: '#991B1B',
  },
});
