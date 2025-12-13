# Apple Watch アプリ開発ガイド - Miso Health

  概要

  React Native (Expo) プロジェクトに Apple Watch
  アプリを追加し、生体情報（心拍数、血中酸素濃度、歩数など）を取得してモバイルアプリに送信する機能を実装する。

  ---
  1. プロジェクト構成

  全体アーキテクチャ

  ┌─────────────────────────────────────┐
  │   Apple Watch App (WatchOS)        │
  │   - SwiftUI で開発                  │
  │   - HealthKit で生体情報取得        │
  │   - Watch Connectivity で通信       │
  └──────────────┬──────────────────────┘
                 │ Watch Connectivity
  ┌──────────────▼──────────────────────┐
  │   iOS App - Native Layer (Swift)    │
  │   - Watch からのデータを受信         │
  │   - React Native に橋渡し           │
  └──────────────┬──────────────────────┘
                 │ React Native Bridge
  ┌──────────────▼──────────────────────┐
  │   React Native App (TypeScript)     │
  │   - 生体データの表示・保存           │
  └─────────────────────────────────────┘

  ディレクトリ構成（実装後）

  mobile-app/
  ├── app/                        # React Native (既存)
  ├── ios/                        # Expo prebuild で生成
  │   ├── mobileapp/              # iOS アプリ本体
  │   ├── Pods/
  │   │   └── MisoWatch Watch App/  # Watch App
  │   │       ├── MisoWatchApp.swift
  │   │       ├── ContentView.swift
  │   │       └── Assets.xcassets
  │   ├── mobileapp.xcworkspace   # Xcode で開くファイル
  │   ├── Podfile
  │   └── Podfile.lock
  └── android/                    # Android (今回は使用しない)

  ---
  2. 環境構築

  前提条件

  - Mac（Xcode が必須）
  - Xcode 15 以上
  - Apple Developer Program アカウント（実機テストに必要）
  - Node.js / Yarn

  2.1 Expo Development Build への移行

  Expo Managed Workflow では Apple Watch アプリを追加できないため、Development Build に移行する。

  # 依存関係のインストール
  yarn install

  # ネイティブプロジェクトの生成
  yarn expo prebuild --clean

  生成されるもの：
  - ios/ - iOS ネイティブプロジェクト
  - android/ - Android ネイティブプロジェクト

  2.2 Watch App ターゲットの追加（Xcode）

  1. Xcode でワークスペースを開く
  open ios/mobileapp.xcworkspace
  2. メニューから File → New → Target...
  3. watchOS タブ → App を選択 → Next
  4. 設定を入力：
  | 項目             | 値         |
  |----------------|-----------|
  | Product Name   | MisoWatch |
  | Language       | Swift     |
  | User Interface | SwiftUI   |

  5. Finish → Activate を選択

  ---
  3. Watch App の実装

  3.1 ファイル構成

  ios/Pods/MisoWatch Watch App/
  ├── MisoWatchApp.swift    # エントリーポイント
  ├── ContentView.swift     # メイン UI
  └── Assets.xcassets       # アセット

  3.2 エントリーポイント（MisoWatchApp.swift）

  import SwiftUI

  @main
  struct MisoWatch_Watch_AppApp: App {
      var body: some Scene {
          WindowGroup {
              ContentView()
          }
      }
  }

  3.3 メイン UI（ContentView.swift）

  import SwiftUI

  struct ContentView: View {
      // モックデータ（後で HealthKit から取得）
      @State private var heartRate: Int = 72
      @State private var oxygenLevel: Int = 98
      @State private var steps: Int = 4521

      var body: some View {
          ScrollView {
              VStack(spacing: 12) {
                  Text("Miso Health")
                      .font(.headline)
                      .foregroundColor(.cyan)

                  HealthCard(
                      icon: "heart.fill",
                      iconColor: .red,
                      title: "心拍数",
                      value: "\(heartRate)",
                      unit: "BPM"
                  )

                  HealthCard(
                      icon: "lungs.fill",
                      iconColor: .blue,
                      title: "血中酸素",
                      value: "\(oxygenLevel)",
                      unit: "%"
                  )

                  HealthCard(
                      icon: "figure.walk",
                      iconColor: .green,
                      title: "歩数",
                      value: "\(steps)",
                      unit: "歩"
                  )
              }
              .padding(.horizontal, 4)
          }
      }
  }

  // 再利用可能なヘルスカードコンポーネント
  struct HealthCard: View {
      let icon: String
      let iconColor: Color
      let title: String
      let value: String
      let unit: String

      var body: some View {
          HStack {
              Image(systemName: icon)
                  .font(.title2)
                  .foregroundColor(iconColor)
                  .frame(width: 30)

              VStack(alignment: .leading, spacing: 2) {
                  Text(title)
                      .font(.caption2)
                      .foregroundColor(.gray)

                  HStack(alignment: .lastTextBaseline, spacing: 2) {
                      Text(value)
                          .font(.title3)
                          .fontWeight(.bold)
                      Text(unit)
                          .font(.caption2)
                          .foregroundColor(.gray)
                  }
              }
              Spacer()
          }
          .padding(10)
          .background(Color.gray.opacity(0.2))
          .cornerRadius(10)
      }
  }

  3.4 SwiftUI と React Native の比較

  | SwiftUI                      | React Native                             |
  |------------------------------|------------------------------------------|
  | @State private var count = 0 | const [count, setCount] = useState(0)    |
  | VStack { }                   | <View style={{flexDirection: 'column'}}> |
  | HStack { }                   | <View style={{flexDirection: 'row'}}>    |
  | Text("Hello")                | <Text>Hello</Text>                       |
  | Image(systemName: "heart")   | <Icon name="heart" />                    |
  | ScrollView { }               | <ScrollView>                             |
  | .padding(10)                 | style={{ padding: 10 }}                  |
  | .foregroundColor(.red)       | style={{ color: 'red' }}                 |

  ---
  4. ビルドと実行

  Watch シミュレーターで実行

  1. Xcode 上部のスキームセレクターで MisoWatch Watch App を選択
  2. シミュレーターで Apple Watch Series 9 (45mm) などを選択
  3. ▶️ ボタン または Cmd + R で実行

  ---
  5. 次のステップ（未実装）

  5.1 HealthKit 統合

  - HealthKit Capability の追加
  - 権限リクエストの実装
  - 心拍数のリアルタイム取得
  - 血中酸素濃度の取得
  - 歩数の取得

  5.2 Watch Connectivity

  - Watch → iPhone のデータ送信
  - iPhone 側でのデータ受信

  5.3 React Native Bridge

  - Swift ネイティブモジュールの作成
  - React Native からのデータ利用

  ---
  6. Apple Watch で測定可能な生体情報

  | データ      | HealthKit 識別子          | 対応機種                |
  |----------|------------------------|---------------------|
  | 心拍数      | .heartRate             | 全モデル                |
  | 血中酸素濃度   | .oxygenSaturation      | Series 6 以降         |
  | 心電図（ECG） | .electrocardiogramType | Series 4 以降（地域制限あり） |
  | 歩数       | .stepCount             | 全モデル                |
  | 消費カロリー   | .activeEnergyBurned    | 全モデル                |
  | 睡眠データ    | .sleepAnalysis         | 全モデル                |

  注意： 血圧は Apple Watch では直接測定できません（センサー非搭載）

  ---
  7. 参考リンク

  - https://developer.apple.com/documentation/healthkit
  - https://developer.apple.com/documentation/swiftui
  - https://developer.apple.com/documentation/watchconnectivity
  - https://docs.expo.dev/develop/development-builds/introduction/

  ---
