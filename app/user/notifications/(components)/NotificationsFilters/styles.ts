import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  filterDropdown: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterDropdownText: {
    fontSize: 14,
    color: '#333333',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#999999',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  filterIcon: {
    fontSize: 14,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
  },
  // Dropdown Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  dropdownMenu: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  dropdownItem: {
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  dropdownItemActive: {
    backgroundColor: '#FFF0F0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333333',
  },
  dropdownItemTextActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
