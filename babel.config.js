module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // Expo Router の設定を含めるために 'babel-preset-expo' を拡張します
      ["babel-preset-expo", { jsxRuntime: "automatic" }],
    ],
    // babel.config.js の plugins 部分を修正
    plugins: [
      [
        "@tamagui/babel-plugin",
        {
          config: "./tamagui.config.ts",
          components: ["tamagui", "@tamagui/core", "@tamagui/web"],
          // 以下の行を削除: 'expo-router/babel' の警告を解消するため
          // 'expo-router/babel',

          // --- 追加/修正するオプション ---
          // displayNameエラーの解消に役立つことがあります
          enableStudio: true,
        },
      ],
      // 警告を解消するため、この行を削除します
      // 'expo-router/babel',
      "react-native-reanimated/plugin",
    ],
  };
};
