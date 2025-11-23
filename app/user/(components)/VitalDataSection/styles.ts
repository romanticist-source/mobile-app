import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  vitalIcon: {
    fontSize: 16,
  },
  vitalLabel: {
    fontSize: 12,
    color: '#666666',
  },
  vitalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  vitalUnit: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#999999',
  },
  vitalBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  vitalBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  vitalStatus: {
    fontSize: 12,
    color: '#666666',
  },
});
