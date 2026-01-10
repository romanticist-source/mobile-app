import { Alert, Linking, Platform } from 'react-native';

/**
 * 電話アプリを起動して電話をかける
 * @param phoneNumber 電話番号（ハイフン付きでもOK）
 * @param name 相手の名前（確認ダイアログ用、オプション）
 */
export async function makePhoneCall(phoneNumber: string, name?: string): Promise<void> {
  if (!phoneNumber) {
    Alert.alert('エラー', '電話番号が設定されていません');
    return;
  }

  // ハイフンなどを除去して電話番号形式に整形
  const cleanedPhoneNumber = phoneNumber.replace(/[^0-9+]/g, '');

  // Web環境ではサポートしない
  if (Platform.OS === 'web') {
    Alert.alert('非対応', 'Web版では電話機能を使用できません');
    return;
  }

  const phoneUrl = `tel:${cleanedPhoneNumber}`;

  try {
    // 電話アプリが利用可能か確認
    const canOpen = await Linking.canOpenURL(phoneUrl);

    if (!canOpen) {
      Alert.alert('エラー', 'このデバイスでは電話機能を使用できません');
      return;
    }

    // 確認ダイアログを表示（名前がある場合）
    if (name) {
      Alert.alert(
        '電話をかける',
        `${name}さん (${phoneNumber}) に電話をかけますか?`,
        [
          {
            text: 'キャンセル',
            style: 'cancel',
          },
          {
            text: '電話する',
            onPress: () => Linking.openURL(phoneUrl),
          },
        ]
      );
    } else {
      // 確認ダイアログなしで直接発信
      Alert.alert('電話をかける', `${phoneNumber} に電話をかけますか?`, [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '電話する',
          onPress: () => Linking.openURL(phoneUrl),
        },
      ]);
    }
  } catch (error) {
    console.error('[PhoneHelper] Failed to make phone call:', error);
    Alert.alert('エラー', '電話の発信に失敗しました');
  }
}
