import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  paginationButtonDisabled: {
    color: '#CCCCCC',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666666',
  },
});
