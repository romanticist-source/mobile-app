import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  actionsBar: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  unreadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FF6B6B',
  },
  bellIcon: {
    fontSize: 16,
  },
  unreadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  markAllReadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  checkIcon: {
    fontSize: 16,
    color: '#FF6B6B',
  },
  markAllReadText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
});
