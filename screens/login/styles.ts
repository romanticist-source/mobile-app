import { StyleSheet } from 'react-native';

const LOGO_SIZE = 180; // ロゴとテキスト全体を考慮したサイズ（必要に応じて調整）

export const logoStyles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80, // キャッチフレーズが上にあるため、ボタンまでの距離を調整
  },
  logoImage: {
    // ロゴ画像（テキスト含む）のサイズを調整
    width: LOGO_SIZE, 
    height: LOGO_SIZE,
    resizeMode: 'contain', // 画像の縦横比を維持してコンテナに収める
    marginBottom: 20, 
  },
  catchphraseContainer: {
    alignItems: 'center',
    marginBottom: 40, // ロゴとキャッチフレーズの間のスペース
  },
  catchphraseLine1: {
    fontSize: 14,
    color: 'white',
    // フォントの太さやスタイルを画像に合わせて調整
    marginBottom: 2, 
  },
  catchphraseLine2: {
    fontSize: 14,
    color: 'white',
    // フォントの太さやスタイルを画像に合わせて調整
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 画像の背景色に合わせて鮮やかな赤/ピンクを設定
    backgroundColor: '#FF3366', 
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50, // 画面全体の配置を微調整
  },
});