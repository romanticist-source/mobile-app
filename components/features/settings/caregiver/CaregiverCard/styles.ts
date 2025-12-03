import { StyleSheet } from 'react-native';
import { surface, textPrimary, textSecondary, border, sm, xs, md } from '@/styles/tokens';

export const styles = StyleSheet.create({
  caregiverCard: {
    backgroundColor: surface,
    borderRadius: 12,
    padding: sm,
    marginBottom: sm,
    borderWidth: 1,
    borderColor: border,
  },
  caregiverHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: xs,
  },
  avatarContainer: {
    marginRight: sm,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  caregiverInfo: {
    flex: 1,
  },
  caregiverName: {
    fontSize: 16,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 2,
  },
  caregiverRole: {
    fontSize: 12,
    color: textSecondary,
    marginBottom: 2,
  },
  caregiverRelation: {
    fontSize: 12,
    color: textSecondary,
  },
  menuButton: {
    padding: xs,
  },
  contactInfo: {
    paddingTop: xs,
    borderTopWidth: 1,
    borderTopColor: border,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  contactIcon: {
    marginRight: 8,
  },
  contactText: {
    fontSize: 13,
    color: textSecondary,
    flex: 1,
  },
});
