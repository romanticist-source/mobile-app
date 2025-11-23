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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: md,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: xs,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: fontBase,
    fontWeight: '700',
    color: textPrimary,
  },
  fontSizeControl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: xs,
  },
  fontSizeLabel: {
    fontSize: fontMd,
    color: textPrimary,
  },
  fontSizeValue: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textSecondary,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sampleTextBox: {
    backgroundColor: '#F9F9F9',
    borderRadius: radiusSm,
    padding: sm,
    marginTop: sm,
    marginBottom: md,
  },
  sampleText: {
    fontSize: fontSm,
    color: textPrimary,
    lineHeight: 20,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: sm,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  toggleInfo: {
    flex: 1,
    marginRight: sm,
  },
  toggleLabel: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 4,
  },
  toggleDescription: {
    fontSize: fontSm,
    color: textSecondary,
    lineHeight: 18,
  },
  selectField: {
    marginBottom: md,
  },
  selectLabel: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: xs,
  },
  selectButton: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: border,
    borderRadius: radiusSm,
    paddingVertical: sm,
    paddingHorizontal: sm,
    marginBottom: xs,
  },
  selectValue: {
    fontSize: fontMd,
    color: textPrimary,
  },
  selectDescription: {
    fontSize: fontSm,
    color: textSecondary,
    lineHeight: 18,
  },
  infoItem: {
    paddingVertical: sm,
    borderTopWidth: 1,
    borderTopColor: '#F5F5F5',
  },
  infoLabel: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 4,
  },
  infoDescription: {
    fontSize: fontSm,
    color: textSecondary,
    lineHeight: 18,
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
