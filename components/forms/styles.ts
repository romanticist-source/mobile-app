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
  pickerContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    overflow: 'hidden',
  },
  picker: {
    width: '100%',
    height: 48,
  },
  dateTimePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateTimePickerIcon: {
    fontSize: 20,
    color: '#666666',
  },
  iosPicker: {
    width: '100%',
    backgroundColor: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  modalDoneButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
});
