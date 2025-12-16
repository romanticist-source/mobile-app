# MisoWatch - Apple Watch App 技術仕様書

## 目次

1. [概要](#概要)
2. [アーキテクチャ](#アーキテクチャ)
3. [Watch App 構成](#watch-app-構成)
4. [iPhone 側実装](#iphone-側実装)
5. [React Native 連携](#react-native-連携)
6. [データフロー](#データフロー)
7. [使用方法](#使用方法)
8. [注意事項・制限](#注意事項制限)

---

## 概要

MisoWatch は、Apple Watch からヘルスデータ（心拍数、血中酸素濃度、歩数）を取得し、WatchConnectivity フレームワークを通じて iPhone の React Native アプリにリアルタイムで送信するアプリケーションです。

### 主な機能

| 機能 | 説明 |
|------|------|
| 心拍数モニタリング | HealthKit から最新の心拍数を取得・リアルタイム監視 |
| 血中酸素濃度 | SpO2（血中酸素飽和度）を取得 |
| 歩数カウント | 当日の累計歩数を取得 |
| iPhone 連携 | WatchConnectivity で iPhone へデータ送信 |

---

## アーキテクチャ

### ディレクトリ構成

```
ios/
├── MisoWatch Watch App/           # ⌚ Apple Watch アプリ
│   ├── MisoWatchApp.swift         # アプリエントリーポイント
│   ├── ContentView.swift          # メイン UI（SwiftUI）
│   ├── HealthManager.swift        # HealthKit データ取得
│   ├── WatchConnectivityManager.swift  # iPhone との通信管理
│   ├── MisoWatch.entitlements     # 権限設定
│   └── Assets.xcassets/           # アセット
│
└── mobileapp/                     # 📱 iPhone アプリ（React Native）
    ├── WatchConnectivityManager.swift  # Watch からのデータ受信
    ├── WatchConnectivityModule.swift   # React Native ブリッジ
    └── mobileapp.entitlements     # 権限設定

modules/
└── watch-connectivity/            # 📦 React Native モジュール
    ├── index.ts                   # ネイティブモジュールラッパー
    └── useWatchHealthData.ts      # React Hook
```

### システム構成図

```
┌─────────────────────────────────────────────────────────────────┐
│                        Apple Watch                              │
│  ┌─────────────────┐    ┌──────────────────────────────────┐   │
│  │   HealthKit     │───►│        HealthManager             │   │
│  │   (System)      │    │  - requestAuthorization()        │   │
│  └─────────────────┘    │  - fetchHeartRate()              │   │
│                         │  - fetchOxygenSaturation()       │   │
│                         │  - fetchSteps()                  │   │
│                         │  - startHeartRateMonitoring()    │   │
│                         └──────────────┬───────────────────┘   │
│                                        │                        │
│                                        ▼                        │
│                         ┌──────────────────────────────────┐   │
│                         │        ContentView               │   │
│                         │  - HealthCard UI コンポーネント    │   │
│                         │  - 更新ボタン                      │   │
│                         │  - iPhone 送信ボタン               │   │
│                         └──────────────┬───────────────────┘   │
│                                        │                        │
│                                        ▼                        │
│                         ┌──────────────────────────────────┐   │
│                         │  WatchConnectivityManager        │   │
│                         │  - sendHealthData()              │   │
│                         │  - transferHealthData()          │   │
│                         └──────────────┬───────────────────┘   │
└────────────────────────────────────────┼────────────────────────┘
                                         │
                    WatchConnectivity    │  sendMessage() /
                    Framework            │  transferUserInfo()
                                         │
                                         ▼
┌────────────────────────────────────────┼────────────────────────┐
│                        iPhone          │                        │
│                         ┌──────────────▼───────────────────┐   │
│                         │  WatchConnectivityManager        │   │
│                         │  - didReceiveMessage()           │   │
│                         │  - didReceiveUserInfo()          │   │
│                         └──────────────┬───────────────────┘   │
│                                        │                        │
│                                        ▼                        │
│                         ┌──────────────────────────────────┐   │
│                         │  WatchConnectivityModule         │   │
│  Native                 │  (RCTEventEmitter)               │   │
│  Layer                  │  - getLatestHealthData()         │   │
│                         │  - sendHealthDataEvent()         │   │
│                         └──────────────┬───────────────────┘   │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│                                        │ NativeEventEmitter     │
│                                        ▼                        │
│                         ┌──────────────────────────────────┐   │
│  React                  │  modules/watch-connectivity/     │   │
│  Native                 │  - getLatestHealthData()         │   │
│  Layer                  │  - addHealthDataListener()       │   │
│                         └──────────────┬───────────────────┘   │
│                                        │                        │
│                                        ▼                        │
│                         ┌──────────────────────────────────┐   │
│                         │  useWatchHealthData() Hook       │   │
│                         │  - data: HealthData              │   │
│                         │  - isLoading: boolean            │   │
│                         │  - refresh(): Promise<void>      │   │
│                         └──────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

---

## Watch App 構成

### 1. MisoWatchApp.swift

アプリケーションのエントリーポイント。

```swift
@main
struct MisoWatch_Watch_AppApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
```

### 2. HealthManager.swift

HealthKit からデータを取得するマネージャークラス。

#### プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `heartRate` | `Int` | 心拍数 (BPM) |
| `oxygenLevel` | `Int` | 血中酸素濃度 (%) |
| `steps` | `Int` | 歩数 |
| `isAuthorized` | `Bool` | HealthKit 認証状態 |

#### メソッド

| メソッド | 説明 |
|---------|------|
| `requestAuthorization()` | HealthKit の権限をリクエスト |
| `fetchAllData()` | 全ヘルスデータを一括取得 |
| `fetchHeartRate()` | 最新の心拍数を取得 |
| `fetchOxygenSaturation()` | 最新の血中酸素濃度を取得 |
| `fetchSteps()` | 今日の累計歩数を取得 |
| `startHeartRateMonitoring()` | 心拍数のリアルタイム監視を開始 |

#### 取得データタイプ

```swift
private let typesToRead: Set<HKObjectType> = [
    HKObjectType.quantityType(forIdentifier: .heartRate)!,
    HKObjectType.quantityType(forIdentifier: .oxygenSaturation)!,
    HKObjectType.quantityType(forIdentifier: .stepCount)!
]
```

### 3. WatchConnectivityManager.swift (Watch側)

iPhone との通信を管理するシングルトンクラス。

#### プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `isReachable` | `Bool` | iPhone が到達可能かどうか |
| `lastSentTime` | `Date?` | 最後にデータを送信した時刻 |

#### メソッド

| メソッド | 説明 |
|---------|------|
| `sendHealthData()` | リアルタイムでヘルスデータを送信 |
| `transferHealthData()` | バックグラウンド転送でデータを送信 |

#### 送信データフォーマット

```swift
let data: [String: Any] = [
    "type": "healthData",
    "heartRate": heartRate,      // Int
    "oxygenLevel": oxygenLevel,  // Int
    "steps": steps,              // Int
    "timestamp": Date().timeIntervalSince1970  // Double
]
```

### 4. ContentView.swift

Watch アプリの UI 実装。

#### UI コンポーネント

- **HealthCard**: 心拍数・血中酸素・歩数を表示するカードコンポーネント
- **更新ボタン**: 手動でデータを更新
- **iPhone 送信ボタン**: iPhone にデータを送信
- **接続状態インジケーター**: iPhone との接続状態を表示

---

## iPhone 側実装

### 1. WatchConnectivityManager.swift (iPhone側)

Watch からのデータを受信するシングルトンクラス。

#### プロパティ

| プロパティ | 型 | 説明 |
|-----------|-----|------|
| `latestHealthData` | `[String: Any]` | 最新のヘルスデータ |
| `onHealthDataReceived` | クロージャ | データ受信時のコールバック |

#### WCSessionDelegate メソッド

| メソッド | 説明 |
|---------|------|
| `session(_:didReceiveMessage:replyHandler:)` | リアルタイムメッセージ受信 |
| `session(_:didReceiveUserInfo:)` | バックグラウンド転送受信 |
| `sessionDidBecomeInactive(_:)` | セッション非アクティブ時 |
| `sessionDidDeactivate(_:)` | セッション非アクティブ化時 |

### 2. WatchConnectivityModule.swift

React Native との橋渡しをする Native Module。

#### React Native から呼び出し可能なメソッド

| メソッド | 説明 |
|---------|------|
| `getLatestHealthData()` | 最新のヘルスデータを Promise で返す |

#### イベント

| イベント名 | 説明 |
|-----------|------|
| `onHealthDataReceived` | Watch からデータ受信時に発火 |

---

## React Native 連携

### 1. modules/watch-connectivity/index.ts

ネイティブモジュールの TypeScript ラッパー。

#### 型定義

```typescript
export interface HealthData {
  heartRate: number;    // 心拍数 (BPM)
  oxygenLevel: number;  // 血中酸素濃度 (%)
  steps: number;        // 歩数
  timestamp: number;    // Unix タイムスタンプ
}
```

#### エクスポート

| 名前 | 型 | 説明 |
|-----|-----|------|
| `isAvailable` | `boolean` | iOS かつモジュールが利用可能か |
| `getLatestHealthData()` | `Promise<HealthData \| null>` | 最新データを取得 |
| `addHealthDataListener()` | `(callback) => () => void` | リスナーを追加（解除関数を返す） |

### 2. modules/watch-connectivity/useWatchHealthData.ts

React Hook として利用するためのカスタムフック。

#### 戻り値

```typescript
interface WatchHealthDataState {
  data: HealthData | null;  // ヘルスデータ
  isLoading: boolean;       // ローディング状態
  error: Error | null;      // エラー
  refresh: () => Promise<void>;  // 手動更新関数
}
```

---

## データフロー

### リアルタイム送信フロー

```
1. [Watch] ユーザーが「iPhone に送信」ボタンをタップ
       ↓
2. [Watch] WatchConnectivityManager.sendHealthData() を呼び出し
       ↓
3. [Watch] WCSession.sendMessage() でデータを送信
       ↓
4. [iPhone] WatchConnectivityManager.session(_:didReceiveMessage:) で受信
       ↓
5. [iPhone] WatchConnectivityModule.sendHealthDataEvent() を呼び出し
       ↓
6. [iPhone] RCTEventEmitter.sendEvent() で React Native にイベント送信
       ↓
7. [React Native] addHealthDataListener() のコールバックが発火
       ↓
8. [React Native] useWatchHealthData の state が更新
       ↓
9. [React Native] UI が再レンダリング
```

### バックグラウンド転送フロー

```
1. [Watch] WatchConnectivityManager.transferHealthData() を呼び出し
       ↓
2. [Watch] WCSession.transferUserInfo() でデータをキューに追加
       ↓
3. [System] iOS が適切なタイミングでデータを転送
       ↓
4. [iPhone] WatchConnectivityManager.session(_:didReceiveUserInfo:) で受信
       ↓
5. 以降は同じフロー
```

---

## 使用方法

### 基本的な使い方

```typescript
import { useWatchHealthData } from '@/modules/watch-connectivity/useWatchHealthData';

function HealthDashboard() {
  const { data, isLoading, error, refresh } = useWatchHealthData();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>エラー: {error.message}</Text>;
  }

  return (
    <View>
      <Text>心拍数: {data?.heartRate ?? '--'} BPM</Text>
      <Text>血中酸素: {data?.oxygenLevel ?? '--'}%</Text>
      <Text>歩数: {data?.steps ?? '--'} 歩</Text>

      {data?.timestamp && (
        <Text>
          最終更新: {new Date(data.timestamp * 1000).toLocaleString()}
        </Text>
      )}

      <Button title="更新" onPress={refresh} />
    </View>
  );
}
```

### 手動でリスナーを使う場合

```typescript
import { useEffect, useState } from 'react';
import {
  addHealthDataListener,
  getLatestHealthData,
  HealthData
} from '@/modules/watch-connectivity';

function MyComponent() {
  const [healthData, setHealthData] = useState<HealthData | null>(null);

  useEffect(() => {
    // 初回データ取得
    getLatestHealthData().then(setHealthData);

    // リアルタイム更新をリッスン
    const unsubscribe = addHealthDataListener((data) => {
      console.log('Watch からデータ受信:', data);
      setHealthData(data);
    });

    // クリーンアップ
    return () => unsubscribe();
  }, []);

  return (
    <View>
      {healthData && (
        <>
          <Text>❤️ {healthData.heartRate} BPM</Text>
          <Text>🫁 {healthData.oxygenLevel}%</Text>
          <Text>🚶 {healthData.steps} 歩</Text>
        </>
      )}
    </View>
  );
}
```

### プラットフォーム判定

```typescript
import WatchConnectivity from '@/modules/watch-connectivity';

if (WatchConnectivity.isAvailable) {
  // iOS で Watch Connectivity が利用可能
  const data = await WatchConnectivity.getLatestHealthData();
} else {
  // Android または Watch Connectivity が利用不可
  console.log('Watch 連携は iOS のみ対応しています');
}
```

---

## 注意事項・制限

### 動作環境

| 項目 | 要件 |
|------|------|
| プラットフォーム | iOS のみ（Android 非対応） |
| デバイス | **実機必須**（シミュレータでは動作しない） |
| ペアリング | iPhone と Apple Watch がペアリングされていること |
| watchOS | watchOS 7.0 以上推奨 |

### HealthKit 権限

Watch アプリで以下のデータへの読み取り権限が必要：

- `HKQuantityType.heartRate` - 心拍数
- `HKQuantityType.oxygenSaturation` - 血中酸素濃度
- `HKQuantityType.stepCount` - 歩数

### Entitlements 設定

#### Watch 側 (`MisoWatch.entitlements`)

```xml
<key>com.apple.developer.healthkit</key>
<true/>
<key>com.apple.developer.healthkit.access</key>
<array/>
```

#### iPhone 側 (`mobileapp.entitlements`)

```xml
<key>com.apple.developer.healthkit</key>
<true/>
```

### 通信方法の使い分け

| 方法 | 用途 | 特徴 |
|------|------|------|
| `sendMessage()` | リアルタイム通信 | iPhone がアクティブな時のみ動作、即時配信 |
| `transferUserInfo()` | バックグラウンド転送 | iPhone がスリープ中でも配信、システムが適切なタイミングで転送 |

### 既知の制限

1. **シミュレータ非対応**: WatchConnectivity はシミュレータでは動作しません。実機でのテストが必要です。

2. **HealthKit シミュレータ制限**: HealthKit のデータはシミュレータでは生成されないため、実機が必要です。

3. **バックグラウンド制限**: iOS のバックグラウンド制限により、アプリがバックグラウンドにある場合のリアルタイム通信は保証されません。

4. **データ遅延**: `transferUserInfo()` はシステムが最適なタイミングで転送するため、即時配信は保証されません。

---

## トラブルシューティング

### Watch と iPhone が接続できない

1. 両方のデバイスで Bluetooth が有効か確認
2. Apple Watch アプリでペアリング状態を確認
3. 両方のデバイスを再起動

### HealthKit の権限が取得できない

1. Watch の設定 → プライバシー → ヘルスケア で権限を確認
2. アプリを再インストール

### データが React Native に届かない

1. `WatchConnectivityModule.shared` が初期化されているか確認
2. Xcode のコンソールログを確認
3. `isReachable` が `true` になっているか確認
