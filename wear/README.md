# Wear OS Health Monitor

Pixel Watch用のヘルスモニタリングアプリケーション

## 機能

- **心拍数測定**: リアルタイムで心拍数を表示
- **呼吸数測定**: 呼吸数をモニタリング
- **Wear OS最適化UI**: Wear OS Composeを使用した円形画面対応のUI

## 必要な権限

- `BODY_SENSORS`: センサーデータへのアクセス
- `ACTIVITY_RECOGNITION`: アクティビティ認識

## 技術スタック

- **Kotlin**: プログラミング言語
- **Jetpack Compose for Wear OS**: UI構築
- **Health Services API**: センサーデータ取得
- **Coroutines & Flow**: 非同期処理とデータストリーム
- **ViewModel**: アーキテクチャコンポーネント

## アーキテクチャ

### HealthServicesManager
Health Services APIとのやり取りを管理するクラス。心拍数と呼吸数のデータストリームを提供。

### HealthViewModel
UIの状態を管理し、HealthServicesManagerからのデータを処理。

### HealthScreen
メインのUI画面。心拍数と呼吸数をリアルタイムで表示。

## ビルド方法

Wear OSアプリは`mobile-app/wear`ディレクトリに配置されています。

### Gradleでビルド

```bash
cd mobile-app/wear
./gradlew assembleDebug
```

### Android Studioでビルド

`mobile-app/wear`ディレクトリをAndroid Studioで開いてビルドできます。

## インストール

### Gradleでインストール

```bash
cd mobile-app/wear
./gradlew installDebug
```

### adb経由でインストール

```bash
cd mobile-app/wear
adb install -r build/outputs/apk/debug/app-debug.apk
```

**注意**: Pixel WatchなどのWear OSデバイスは、adb over Wi-Fiまたはデバッグブリッジ経由で接続する必要があります。

## 動作要件

- Wear OS 3.0以上 (API Level 30+)
- 心拍数センサー搭載デバイス
- Pixel Watchでの動作確認推奨

## UI構成

- **ステータスインジケータ**: センサーの状態を色で表示
  - 緑: データ取得中
  - 黄: データ取得準備中
  - グレー: 利用不可
- **メトリクス表示**: 大きな数値でデータを見やすく表示
- **TimeText**: Wear OS標準の時刻表示

## 注意事項

- 初回起動時に権限の許可が必要
- センサーデータの取得には数秒かかる場合がある
- デバイスによっては一部の機能が利用できない場合がある
