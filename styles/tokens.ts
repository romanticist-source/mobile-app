/**
 * デザイントークンヘルパー
 * styles.tsファイルで簡単にトークンを使用できるようにする
 */
import { tokens } from '@/tamagui.config';

// カラートークン
export const {
  background,
  surface,
  border,
  textPrimary,
  textSecondary,
  textTertiary,
  textQuaternary,
  accentLight,
  accentPrimary,
} = tokens.color;

// スペーシングトークン
export const { xs, sm, md, lg, xl } = tokens.space;

// フォントサイズトークン（名前の衝突を避けるためにプレフィックスを付ける）
export const {
  xs: fontXs,
  sm: fontSm,
  md: fontMd,
  base: fontBase,
  lg: fontLg,
  xl: fontXl,
  xxl: fontXxl,
  xxxl: fontXxxl,
  xxxxl: fontXxxxl,
  xxxxxl: fontXxxxxl,
} = tokens.fontSize;

// 角丸トークン
export const {
  xs: radiusXs,
  sm: radiusSm,
  md: radiusMd,
  full: radiusFull,
} = tokens.radius;

// サイズトークン
export const {
  iconContainer: iconContainerSize,
  iconSize,
  headerButton,
} = tokens.size;

// カテゴリごとにまとめてエクスポート（必要に応じて使用）
export const colors = tokens.color;
export const spacing = tokens.space;
export const fontSizes = tokens.fontSize;
export const radii = tokens.radius;
export const sizes = tokens.size;
