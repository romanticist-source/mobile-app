import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navigationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    minWidth: 60,
    alignItems: 'center',
  },
  navigationButtonDisabled: {
    backgroundColor: '#F5F5F5',
    borderColor: '#E0E0E0',
  },
  navigationButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  navigationButtonTextDisabled: {
    color: '#CCCCCC',
  },
  pageNumbersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pageButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageButtonActive: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
  },
  pageButtonTextActive: {
    color: '#FFFFFF',
  },
  ellipsis: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ellipsisText: {
    fontSize: 14,
    color: '#666666',
  },
});
