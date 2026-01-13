import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  vitalCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    width: '48%',
  },
  vitalCardLarge: {
    width: '100%',
  },
  vitalCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  vitalCardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  vitalCardContent: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  vitalCardValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    lineHeight: 36,
  },
  vitalCardUnit: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginLeft: 4,
  },
  vitalCardSubtext: {
    fontSize: 11,
    color: '#666666',
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
});
