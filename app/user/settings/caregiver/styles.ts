import { StyleSheet } from 'react-native';
import {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  accentLight,
  accentPrimary,
  xs,
  sm,
  md,
  xl,
  fontXs,
  fontSm,
  fontMd,
  fontBase,
  fontLg,
  fontXxxxl,
  radiusSm,
  radiusFull,
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
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: md,
  },
  caregiverCount: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: accentPrimary,
    paddingVertical: 10,
    paddingHorizontal: md,
    borderRadius: radiusSm,
  },
  inviteIcon: {
    fontSize: 18,
    marginRight: xs,
  },
  inviteButtonText: {
    fontSize: fontMd,
    fontWeight: '600',
    color: surface,
  },
  caregiverCard: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: md,
    marginBottom: md,
  },
  caregiverHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: md,
  },
  avatarContainer: {
    marginRight: sm,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: radiusFull,
    backgroundColor: accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: textPrimary,
  },
  caregiverInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  caregiverName: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
    marginRight: xs,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeActive: {
    backgroundColor: '#E8F5E9',
  },
  statusBadgePending: {
    backgroundColor: '#FFF3E0',
  },
  statusBadgeText: {
    fontSize: fontXs,
    fontWeight: '600',
  },
  statusBadgeTextActive: {
    color: '#4CAF50',
  },
  statusBadgeTextPending: {
    color: '#FF9800',
  },
  caregiverRole: {
    fontSize: fontSm,
    color: textSecondary,
  },
  menuButton: {
    padding: xs,
    marginLeft: xs,
  },
  menuIcon: {
    fontSize: 20,
    color: textSecondary,
    fontWeight: '600',
  },
  contactInfo: {
    marginBottom: md,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  contactIcon: {
    fontSize: 16,
    marginRight: xs,
  },
  contactText: {
    fontSize: fontSm,
    color: textSecondary,
  },
  permissionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: xs,
  },
  permissionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  permissionButtonActive: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  permissionIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  permissionIconActive: {
    // Active state uses same icon
  },
  permissionButtonText: {
    fontSize: fontSm,
    color: textSecondary,
    fontWeight: '500',
  },
  permissionButtonTextActive: {
    color: '#1976D2',
    fontWeight: '600',
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
