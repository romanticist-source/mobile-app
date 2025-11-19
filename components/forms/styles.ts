import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  formField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  required: {
    color: '#FF3B30',
    marginLeft: 2,
  },
  fieldInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333333',
  },
  fieldInputError: {
    borderColor: '#FF3B30',
  },
  fieldTextArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333333',
  },
  fieldPlaceholder: {
    fontSize: 16,
    color: '#CCCCCC',
  },
  errorText: {
    fontSize: 12,
    color: '#FF3B30',
    marginTop: 4,
  },
});
