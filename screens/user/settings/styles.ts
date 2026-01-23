import { StyleSheet } from 'react-native';
import {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  textTertiary,
  textQuaternary,
  accentLight,
  xs,
  sm,
  md,
  fontXs,
  fontSm,
  fontMd,
  fontBase,
  fontXl,
  fontXxxl,
  radiusXs,
  radiusSm,
  radiusMd,
} from '@/styles/tokens';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  pageHeader: {
    paddingHorizontal: sm,
    paddingTop: md,
    paddingBottom: sm,
    backgroundColor: surface,
  },
  pageTitle: {
    fontSize: fontXxxl,
    fontWeight: 'bold',
    color: textPrimary,
  },
  searchContainer: {
    paddingHorizontal: sm,
    paddingTop: sm,
    paddingBottom: xs,
    backgroundColor: background,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: surface,
    borderRadius: radiusXs,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: xs,
    borderWidth: 1,
    borderColor: border,
  },
  searchIcon: {
    fontSize: fontBase,
  },
  searchInput: {
    flex: 1,
    fontSize: fontMd,
    color: textPrimary,
  },
  settingsList: {
    flex: 1,
    paddingTop: xs,
  },
  section: {
    marginBottom: md,
  },
  sectionTitle: {
    fontSize: fontSm,
    fontWeight: '600',
    color: textTertiary,
    paddingHorizontal: sm,
    paddingBottom: xs,
  },
  sectionContent: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    marginHorizontal: sm,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: sm,
    paddingVertical: sm,
    borderBottomWidth: 1,
    borderBottomColor: background,
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingItemLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radiusMd,
    backgroundColor: accentLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingIcon: {
    fontSize: fontXl,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: fontBase,
    fontWeight: '600',
    color: textPrimary,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: fontXs,
    color: textSecondary,
  },
  chevron: {
    fontSize: fontXl,
    color: textQuaternary,
    marginLeft: xs,
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: md,
    paddingBottom: 100,
  },
  versionText: {
    fontSize: fontXs,
    color: textQuaternary,
  },
  // ...既存のコード

  // Logout Button (他の設定項目と同じスタイルに統合)
  logoutSection: {
    marginTop: md, // 他のセクションとの間隔
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // テキストを中央寄せにする場合
    paddingVertical: sm,
    backgroundColor: surface, // 他の項目と同じ背景色
    borderRadius: radiusSm,
    marginHorizontal: sm,
  },
  logoutButtonText: {
    color: "#FF6B6B", // 赤色を維持して警告感を表す
    fontSize: fontBase,
    fontWeight: "600",
  },
});
