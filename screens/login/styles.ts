import { StyleSheet } from 'react-native';

const LOGO_SIZE = 180; // ロゴとテキスト全体を考慮したサイズ（必要に応じて調整）

export const logoStyles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoImage: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    resizeMode: 'contain',
  },
  catchphraseContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  catchphraseLine1: {
    fontSize: 15,
    color: 'white',
    fontWeight: '400',
    marginBottom: 4,
  },
  catchphraseLine2: {
    fontSize: 15,
    color: 'white',
    fontWeight: '400',
  },
});

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // 画像の背景色に合わせて鮮やかな赤/ピンクを設定
    backgroundColor: '#FF3366',
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    paddingBottom: 50,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    marginTop: 20,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  loginButtonText: {
    color: '#FF3366',
    fontSize: 16,
    fontWeight: '600',
  },
  registerButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});