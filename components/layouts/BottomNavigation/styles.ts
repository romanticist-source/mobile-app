import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navIconActive: {
    // Icon color is controlled via the color prop
  },
  navLabel: {
    fontSize: 11,
    color: '#999999',
  },
  navLabelActive: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
});
