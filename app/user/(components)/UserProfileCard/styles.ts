import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileInfo: {
    gap: 4,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileStatus: {
    fontSize: 13,
    color: '#666666',
  },
  settingsButton: {
    backgroundColor: '#D4F4E7',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  settingsButtonText: {
    fontSize: 14,
    color: '#20C9A6',
    fontWeight: '600',
  },
});
