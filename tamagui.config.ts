import { config as defaultConfig } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

// デザイントークン定義
export const tokens = {
  // カラートークン
  color: {
    // 背景色
    background: '#F5F5F5',
    surface: '#FFFFFF',

    // ボーダー
    border: '#E0E0E0',

    // テキスト
    textPrimary: '#333333',
    textSecondary: '#888888',
    textTertiary: '#999999',
    textQuaternary: '#CCCCCC',

    // アクセント
    accentLight: '#FFE5E5',
    accentPrimary: '#FF6B6B',
  },

  // スペーシングトークン
  space: {
    xs: 8,
    sm: 16,
    md: 24,
    lg: 32,
    xl: 50,
  },

  // フォントサイズトークン
  fontSize: {
    xs: 12,
    sm: 13,
    md: 14,
    base: 16,
    lg: 17,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    xxxxl: 32,
    xxxxxl: 40,
  },

  // 角丸トークン
  radius: {
    xs: 8,
    sm: 12,
    md: 20,
    full: 40,
  },

  // サイズトークン
  size: {
    iconContainer: 80,
    iconSize: 40,
    headerButton: 40,
  },
} as const;

// Tamaguiの設定にカスタムトークンを統合
const config = createTamagui({
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    color: {
      ...defaultConfig.tokens.color,
      ...tokens.color,
    },
    space: {
      ...defaultConfig.tokens.space,
      ...tokens.space,
    },
    size: {
      ...defaultConfig.tokens.size,
      ...tokens.size,
    },
    radius: {
      ...defaultConfig.tokens.radius,
      ...tokens.radius,
    },
  },
  themes: {
    ...defaultConfig.themes,
  },
});

export type Conf = typeof config;

declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
