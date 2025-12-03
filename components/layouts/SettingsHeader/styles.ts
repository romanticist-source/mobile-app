import { StyleSheet } from 'react-native';
import {
  surface,
  border,
  textPrimary,
  primary,
  xs,
  sm,
  xl,
  fontMd,
  fontXxxxl,
  headerButton,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sm,
    paddingTop: xl,
    paddingBottom: sm,
    backgroundColor: surface,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  backButton: {
    padding: xs,
    marginLeft: -xs,
  },
  backIcon: {
    fontSize: fontXxxxl,
    color: textPrimary,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: fontMd,
    fontWeight: '600',
    color: textPrimary,
  },
  headerRight: {
    width: headerButton,
  },
  rightButton: {
    paddingHorizontal: xs,
    paddingVertical: 4,
  },
  rightButtonText: {
    fontSize: fontMd,
    color: primary,
    fontWeight: '500',
  },
});
