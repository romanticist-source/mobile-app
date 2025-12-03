import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 16,
    gap: 12,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  tabActive: {
    backgroundColor: '#FFF5F5',
    borderColor: '#FF6B6B',
  },
  tabIcon: {
    fontSize: 16,
  },
  tabIconActive: {
    // Icon remains the same
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  tabTextActive: {
    color: '#FF6B6B',
  },
});
