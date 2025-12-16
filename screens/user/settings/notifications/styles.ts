import { StyleSheet } from 'react-native';
import {
  background,
  sm,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  scrollContent: {
    flex: 1,
  },
  contentWrapper: {
    padding: sm,
  },
});
