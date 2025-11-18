import { config as defaultConfig } from '@tamagui/config/v3';
import { createTamagui, createTokens } from 'tamagui';

// デザイントークンの定義
const tokens = createTokens({
  // カラートークン
  color: {
    // Primary colors
    primary: '#FF6B6B',
    primaryLight: '#FFE5E5',
    primaryDark: '#E65555',

    // Status colors
    success: '#20C9A6',
    successLight: '#E0F7F7',
    warning: '#F57C00',
    warningLight: '#FFF3E0',
    error: '#FF6B6B',
    errorLight: '#FFE5E5',
    info: '#2196F3',
    infoLight: '#E3F2FD',

    // Category colors
    categoryRest: '#20C9A6',
    categoryRestBg: '#E0F7F7',
    categoryToilet: '#2196F3',
    categoryToiletBg: '#E3F2FD',
    categoryMedicine: '#F57C00',
    categoryMedicineBg: '#FFF3E0',
    categoryFood: '#8E24AA',
    categoryFoodBg: '#F3E5F5',
    categoryExercise: '#43A047',
    categoryExerciseBg: '#E8F5E9',

    // Neutral colors
    white: '#FFFFFF',
    black: '#000000',
    gray50: '#F5F5F5',
    gray100: '#E0E0E0',
    gray200: '#CCCCCC',
    gray300: '#999999',
    gray400: '#757575',
    gray500: '#666666',
    gray600: '#555555',
    gray700: '#333333',
    gray800: '#1A1A1A',
    gray900: '#0A0A0A',

    // Background colors
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F5',
    backgroundOverlay: 'rgba(0, 0, 0, 0.5)',

    // Text colors
    textPrimary: '#333333',
    textSecondary: '#666666',
    textTertiary: '#999999',
    textInverse: '#FFFFFF',
  },

  // サイズトークン
  size: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    12: 48,
    14: 56,
    16: 64,
    20: 80,
    true: 16, // デフォルト
  },

  // スペーシングトークン
  space: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    true: 16, // デフォルト
  },

  // 角丸トークン
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    round: 999,
    true: 8, // デフォルト
  },

  // z-indexトークン
  zIndex: {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    modal: 1000,
    overlay: 999,
  },
});

// テーマの定義
const light = {
  background: tokens.color.background,
  backgroundSecondary: tokens.color.backgroundSecondary,
  backgroundOverlay: tokens.color.backgroundOverlay,

  color: tokens.color.textPrimary,
  colorSecondary: tokens.color.textSecondary,
  colorTertiary: tokens.color.textTertiary,

  primary: tokens.color.primary,
  primaryLight: tokens.color.primaryLight,

  success: tokens.color.success,
  successLight: tokens.color.successLight,
  warning: tokens.color.warning,
  warningLight: tokens.color.warningLight,
  error: tokens.color.error,
  errorLight: tokens.color.errorLight,
  info: tokens.color.info,
  infoLight: tokens.color.infoLight,

  borderColor: tokens.color.gray100,
  placeholderColor: tokens.color.gray300,

  shadowColor: tokens.color.black,
};

const dark = {
  background: tokens.color.gray900,
  backgroundSecondary: tokens.color.gray800,
  backgroundOverlay: 'rgba(0, 0, 0, 0.7)',

  color: tokens.color.white,
  colorSecondary: tokens.color.gray300,
  colorTertiary: tokens.color.gray400,

  primary: tokens.color.primary,
  primaryLight: tokens.color.primaryDark,

  success: tokens.color.success,
  successLight: tokens.color.categoryRestBg,
  warning: tokens.color.warning,
  warningLight: tokens.color.warningLight,
  error: tokens.color.error,
  errorLight: tokens.color.errorLight,
  info: tokens.color.info,
  infoLight: tokens.color.infoLight,

  borderColor: tokens.color.gray700,
  placeholderColor: tokens.color.gray500,

  shadowColor: tokens.color.black,
};

// Tamaguiコンフィグの作成
const config = createTamagui({
  ...defaultConfig,
  tokens,
  themes: {
    light,
    dark,
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;
