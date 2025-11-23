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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  sectionTitle: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: surface,
    paddingVertical: 6,
    paddingHorizontal: sm,
    borderRadius: radiusSm,
    borderWidth: 1,
    borderColor: border,
  },
  addButtonIcon: {
    fontSize: 18,
    marginRight: 4,
    color: textPrimary,
  },
  addButtonText: {
    fontSize: fontSm,
    fontWeight: '600',
    color: textPrimary,
  },
  contactCard: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: md,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  contactCardPrimary: {
    backgroundColor: '#FFE5E5',
    borderColor: '#FF6B6B',
  },
  contactHeader: {
    flexDirection: 'row',
    marginBottom: md,
  },
  avatarContainer: {
    marginRight: sm,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: radiusFull,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarCirclePrimary: {
    backgroundColor: '#FFCCCC',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: '600',
    color: textPrimary,
  },
  avatarTextPrimary: {
    color: '#FF6B6B',
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
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
  },
  contactNamePrimary: {
    color: '#FF6B6B',
  },
  primaryStar: {
    fontSize: 16,
    marginLeft: 4,
  },
  contactRelationship: {
    fontSize: fontSm,
    color: textSecondary,
    marginBottom: 2,
  },
  contactRelationshipPrimary: {
    color: '#CC5555',
  },
  contactPhone: {
    fontSize: fontSm,
    color: textSecondary,
  },
  contactPhonePrimary: {
    color: '#CC5555',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B6B',
    paddingVertical: 10,
    paddingHorizontal: md,
    borderRadius: radiusSm,
    flex: 1,
    marginRight: xs,
  },
  callButtonIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  callButtonText: {
    fontSize: fontSm,
    fontWeight: '600',
    color: surface,
  },
  iconButtons: {
    flexDirection: 'row',
    gap: xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    backgroundColor: surface,
    borderRadius: radiusSm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: border,
  },
  iconButtonText: {
    fontSize: 18,
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
