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
  lg,
  xl,
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
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: md,
    marginBottom: sm,
  },
  photoContainer: {
    marginRight: sm,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: radiusFull,
    backgroundColor: accentLight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: textPrimary,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: accentPrimary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: surface,
  },
  cameraIcon: {
    fontSize: 16,
  },
  photoInfo: {
    flex: 1,
  },
  photoName: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 4,
  },
  photoAction: {
    fontSize: fontSm,
    color: textSecondary,
  },
  section: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: sm,
  },
  sectionTitle: {
    fontSize: fontBase,
    fontWeight: '700',
    color: textPrimary,
    marginBottom: md,
  },
  formField: {
    marginBottom: md,
  },
  fieldLabel: {
    fontSize: fontMd,
    fontWeight: '500',
    color: textPrimary,
    marginBottom: xs,
  },
  fieldInput: {
    // FormInput, FormSelect, FormDateTimePicker components have their own styles
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
