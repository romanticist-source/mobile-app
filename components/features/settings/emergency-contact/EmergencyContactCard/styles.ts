import { StyleSheet } from 'react-native';
import { surface, textPrimary, textSecondary, border, sm, xs } from '@/styles/tokens';

export const styles = StyleSheet.create({
  contactCard: {
    backgroundColor: surface,
    borderRadius: 12,
    marginBottom: sm,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: border,
  },
  contactContent: {
    padding: sm,
  },
  contactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: xs,
  },
  contactInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: textPrimary,
    marginRight: 8,
  },
  mainBadge: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  mainBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  contactRelationship: {
    fontSize: 13,
    color: textSecondary,
  },
  deleteButton: {
    padding: 4,
  },
  contactDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: textSecondary,
    flex: 1,
  },
  callButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
