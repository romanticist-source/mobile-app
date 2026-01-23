# Wear OS実機接続手順

このドキュメントでは、Wear OSデバイスを開発用に接続する手順を説明します。

## 目次
1. [初期設定（初回のみ）](#初期設定初回のみ)
2. [USB接続](#usb接続)
3. [Wi-Fi接続（オプション）](#wi-fi接続オプション)
4. [アプリのビルドとインストール](#アプリのビルドとインストール)
5. [トラブルシューティング](#トラブルシューティング)

---

## 初期設定（初回のみ）

### 1. 開発者モードの有効化

Wear OSデバイスで以下の操作を行います：

1. **設定** > **システム** > **デバイス情報** を開く
2. **ビルド番号**を7回連続でタップ
3. 「デベロッパーになりました」と表示されれば成功

### 2. ADBデバッグの有効化

1. **設定** > **システム** > **開発者向けオプション** を開く
2. 以下をONにする：
   - **ADBデバッグ**
   - **Wi-Fi経由でデバッグ**（Wi-Fi接続を使う場合）

### 3. ADBコマンドのPATH設定（Mac側）

ターミナルで以下を実行：

```bash
# .zshrcにPATHを追加
echo 'export PATH="$HOME/Library/Android/sdk/platform-tools:$PATH"' >> ~/.zshrc

# 設定を反映
source ~/.zshrc

# 動作確認
adb version
```

---

## USB接続

### 1. デバイスを接続

1. データ転送対応のUSBケーブルでWear OSデバイスとMacを接続
2. Wear OSデバイスに「USBデバッグを許可しますか?」というダイアログが表示される
3. **「常に許可する」にチェックを入れて「OK」**をタップ

### 2. 接続確認

```bash
# 接続されているデバイスを確認
adb devices
```

以下のように表示されればOK：
```
List of devices attached
XXXXXX  device
```

### 3. 接続されない場合

```bash
# ADBサーバーを再起動
adb kill-server
adb start-server

# 再度確認
adb devices
```

それでも表示されない場合は、[トラブルシューティング](#トラブルシューティング)を参照してください。

---

## Wi-Fi接続（オプション）

USB接続なしで開発できます。

### 前提条件
- MacとWear OSデバイスが**同じWi-Fiネットワーク**に接続されていること
- Wear OSデバイスで「Wi-Fi経由でデバッグ」がONになっていること

### 1. TCPIPモードに切り替え

**USB接続した状態で**以下を実行：

```bash
# TCPIPモードに切り替え（ポート5555を使用）
adb tcpip 5555
```

「restarting in TCP mode port: 5555」と表示されればOK。

### 2. Wear OSデバイスのIPアドレスを確認

Wear OSデバイスで：
1. **設定** > **接続** > **Wi-Fi**
2. 接続中のネットワークをタップ
3. **IPアドレス**をメモ（例: 192.168.0.20）

### 3. Wi-Fi経由で接続

```bash
# Wi-Fi接続（IPアドレスは実際のものに置き換え）
adb connect 192.168.0.20:5555
```

「connected to 192.168.0.20:5555」と表示されればOK。

### 4. 接続確認

```bash
adb devices
```

以下のように表示されればOK：
```
List of devices attached
192.168.0.20:5555  device
```

### 5. USBケーブルを外す

これでUSBケーブルなしで開発できます。

### Wi-Fi接続を切断する場合

```bash
adb disconnect 192.168.0.20:5555
```

---

## アプリのビルドとインストール

### 1. ビルドとインストール

```bash
# プロジェクトディレクトリで実行
./gradlew installDebug
```

### 2. アプリの起動

```bash
adb shell am start -n com.example.wearapp/.MainActivity
```

### 3. ログの確認

```bash
# アプリのログをリアルタイムで確認
adb logcat | grep -i "wearapp"

# エラーログのみを確認
adb logcat *:E
```

### 4. アプリの強制停止

```bash
adb shell am force-stop com.example.wearapp
```

---

## トラブルシューティング

### デバイスが認識されない（USB接続）

#### 原因1: USBケーブルの問題
- **対処**: データ転送対応のUSBケーブルを使用
- 充電専用ケーブルではADB接続できない

#### 原因2: ADBデバッグの許可がされていない
- **対処**: Wear OSデバイスで「USBデバッグを許可しますか?」ダイアログを確認
- ダイアログが表示されない場合は、USBケーブルを抜き差し

#### 原因3: ADBサーバーの問題
```bash
# ADBサーバーを再起動
adb kill-server
adb start-server
adb devices
```

#### 原因4: USBポートの問題
- **対処**: 別のUSBポートに接続してみる
- MacのUSB-Cポート → USBハブ経由の場合、直接接続を試す

#### 原因5: デバイスの再起動が必要
- **対処**: Wear OSデバイスを再起動

### Wi-Fi接続ができない

#### 原因1: TCPIPモードに切り替えていない
```bash
# USB接続した状態で実行
adb tcpip 5555
```

#### 原因2: 同じネットワークにいない
- **対処**: MacとWear OSデバイスが同じWi-Fiネットワークに接続されているか確認

#### 原因3: IPアドレスが間違っている
- **対処**: Wear OSデバイスの設定から正確なIPアドレスを確認

#### 原因4: ルーターのAP分離機能
- **対処**: ルーターの設定で「AP分離」「クライアント分離」がOFFになっているか確認

#### 原因5: ファイアウォール
- **対処**: Macのファイアウォール設定を確認
- システム環境設定 > セキュリティとプライバシー > ファイアウォール

### アプリがクラッシュする

```bash
# 詳細なエラーログを確認
adb logcat *:E

# 特定のタグでフィルタ
adb logcat -s AndroidRuntime
```

### 複数デバイスが接続されている場合

```bash
# デバイスを確認
adb devices

# 特定のデバイスを指定してコマンド実行
adb -s DEVICE_ID shell am start -n com.example.wearapp/.MainActivity

# 例: エミュレーターを指定
adb -s emulator-5554 shell am start -n com.example.wearapp/.MainActivity

# 例: Wi-Fi接続のデバイスを指定
adb -s 192.168.0.20:5555 shell am start -n com.example.wearapp/.MainActivity
```

### エミュレーターを停止したい場合

```bash
# エミュレーターを停止
adb -s emulator-5554 emu kill

# または、すべてのエミュレーターを停止
adb devices | grep emulator | cut -f1 | xargs -I {} adb -s {} emu kill
```

---

## よく使うコマンド一覧

```bash
# デバイス一覧
adb devices

# アプリをインストール
./gradlew installDebug

# アプリを起動
adb shell am start -n com.example.wearapp/.MainActivity

# アプリを停止
adb shell am force-stop com.example.wearapp

# ログを確認
adb logcat | grep -i "wearapp"

# Wi-Fi接続
adb tcpip 5555
adb connect [IPアドレス]:5555

# Wi-Fi切断
adb disconnect [IPアドレス]:5555

# ADB再起動
adb kill-server
adb start-server
```

---

## 参考リンク

- [Android Debug Bridge (adb) 公式ドキュメント](https://developer.android.com/studio/command-line/adb)
- [Wear OS デバッグガイド](https://developer.android.com/training/wearables/apps/debugging)
