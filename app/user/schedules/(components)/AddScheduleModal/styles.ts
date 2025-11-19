import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalCloseButton: {
    padding: 8,
  },
  modalCloseIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  modalSaveButton: {
    padding: 8,
  },
  modalSaveIcon: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
  formField: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    color: '#333333',
    marginBottom: 8,
  },
  fieldInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#333333',
  },
  fieldPlaceholder: {
    color: '#CCCCCC',
  },
  fieldTextArea: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  fieldSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  fieldSelectorText: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  fieldSelectorArrow: {
    fontSize: 20,
    color: '#CCCCCC',
  },
});
