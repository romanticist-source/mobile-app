import { StyleSheet } from 'react-native';
import {
  surface,
  textPrimary,
  textSecondary,
  accentPrimary,
  border,
  xs,
  sm,
  md,
  lg,
  fontSm,
  fontBase,
  fontLg,
  radiusSm,
  radiusMd,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: surface,
    borderTopLeftRadius: radiusMd,
    borderTopRightRadius: radiusMd,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: md,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  closeButton: {
    padding: xs,
  },
  closeButtonText: {
    fontSize: fontLg,
    color: textSecondary,
  },
  title: {
    fontSize: fontLg,
    fontWeight: '600',
    color: textPrimary,
  },
  saveButton: {
    padding: xs,
  },
  saveButtonText: {
    fontSize: fontBase,
    fontWeight: '600',
    color: accentPrimary,
  },
  saveButtonDisabled: {
    color: textSecondary,
  },
  content: {
    padding: md,
  },
  inputGroup: {
    marginBottom: md,
  },
  label: {
    fontSize: fontSm,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: xs,
  },
  required: {
    color: '#F44336',
  },
  input: {
    borderWidth: 1,
    borderColor: border,
    borderRadius: radiusSm,
    padding: sm,
    fontSize: fontBase,
    color: textPrimary,
    backgroundColor: surface,
  },
  inputError: {
    borderColor: '#F44336',
  },
  errorText: {
    fontSize: fontSm,
    color: '#F44336',
    marginTop: xs,
  },
  buttonContainer: {
    padding: md,
    paddingBottom: lg,
  },
  submitButton: {
    backgroundColor: accentPrimary,
    paddingVertical: sm,
    borderRadius: radiusSm,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  submitButtonText: {
    fontSize: fontBase,
    fontWeight: '600',
    color: surface,
  },
});
