#!/bin/bash

echo "🔧 Wear OSアプリをビルド・インストールします..."

# wearディレクトリに移動
cd wear

# ビルド
echo "📦 ビルド中..."
./gradlew assembleDebug

# デバイスが接続されているか確認
echo "🔍 Wear OSデバイスを確認中..."
adb devices

# インストール
echo "📲 Wear OSデバイスにインストール中..."
adb install -r build/outputs/apk/debug/wear-debug.apk

# アプリ起動
echo "🚀 アプリを起動..."
adb shell am start -n com.hasegawa.miso.wear/.MainActivity

echo "✅ 完了しました！"
