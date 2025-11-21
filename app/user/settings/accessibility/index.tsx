import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { styles } from './styles';

export default function AccessibilitySettingsScreen() {
  const router = useRouter();

  const [fontSize, setFontSize] = useState(50); // 0-100 scale
  const [boldText, setBoldText] = useState(false);
  const [largeButtons, setLargeButtons] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [colorBlindMode, setColorBlindMode] = useState('none');
  const [reduceMotion, setReduceMotion] = useState(false);
  const [hapticFeedback, setHapticFeedback] = useState(true);
  const [extendedTouchTime, setExtendedTouchTime] = useState(false);

  const colorBlindOptions = [
    { label: 'なし', value: 'none' },
    { label: '1型色覚(赤)', value: 'protanopia' },
    { label: '2型色覚(緑)', value: 'deuteranopia' },
    { label: '3型色覚(青)', value: 'tritanopia' },
  ];

  const getFontSizeLabel = () => {
    if (fontSize < 33) return '小';
    if (fontSize < 66) return '標準';
    return '大';
  };

  const handleSave = () => {
    console.log('Save accessibility settings:', {
      fontSize,
      boldText,
      largeButtons,
      highContrast,
      colorBlindMode,
      reduceMotion,
      hapticFeedback,
      extendedTouchTime,
    });
    // TODO: API call to update accessibility settings
    router.back();
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>アクセシビリティ設定</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Display and Text Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>T</Text>
                <Text style={styles.sectionTitle}>表示とテキスト</Text>
              </View>

              {/* Font Size */}
              <View style={styles.fontSizeControl}>
                <Text style={styles.fontSizeLabel}>文字サイズ</Text>
                <Text style={styles.fontSizeValue}>{getFontSizeLabel()}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={100}
                step={1}
                value={fontSize}
                onValueChange={setFontSize}
                minimumTrackTintColor="#FF6B6B"
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor="#FF6B6B"
              />

              {/* Sample Text */}
              <View style={styles.sampleTextBox}>
                <Text style={styles.sampleText}>
                  サンプルテキスト: これは見やすさを確認するためのテキストです。
                </Text>
              </View>

              {/* Bold Text Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>太字テキスト</Text>
                  <Text style={styles.toggleDescription}>
                    すべてのテキストを太字で表示
                  </Text>
                </View>
                <Switch
                  value={boldText}
                  onValueChange={setBoldText}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={boldText ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              {/* Large Buttons Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>大きなボタン</Text>
                  <Text style={styles.toggleDescription}>
                    タップしやすい大きめのボタンを使用
                  </Text>
                </View>
                <Switch
                  value={largeButtons}
                  onValueChange={setLargeButtons}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={largeButtons ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Visual Support Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>👁️</Text>
                <Text style={styles.sectionTitle}>視覚サポート</Text>
              </View>

              {/* High Contrast Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>ハイコントラスト</Text>
                  <Text style={styles.toggleDescription}>
                    コントラストを高めて見やすくする
                  </Text>
                </View>
                <Switch
                  value={highContrast}
                  onValueChange={setHighContrast}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={highContrast ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              {/* Color Blind Support */}
              <View style={styles.selectField}>
                <Text style={styles.selectLabel}>色覚サポート</Text>
                <TouchableOpacity style={styles.selectButton}>
                  <Text style={styles.selectValue}>
                    {colorBlindOptions.find((opt) => opt.value === colorBlindMode)?.label || 'なし'}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.selectDescription}>
                  色覚特性に合わせた配色に調整します
                </Text>
              </View>

              {/* Reduce Motion Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>アニメーションを減らす</Text>
                  <Text style={styles.toggleDescription}>
                    画面の動きや視覚効果を最小限にする
                  </Text>
                </View>
                <Switch
                  value={reduceMotion}
                  onValueChange={setReduceMotion}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={reduceMotion ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>

            {/* Audio Support Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🎤</Text>
                <Text style={styles.sectionTitle}>音声サポート</Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>スクリーンリーダー対応</Text>
                <Text style={styles.infoDescription}>
                  画面の内容を音声で読み上げる
                </Text>
              </View>

              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>音声ガイダンス</Text>
                <Text style={styles.infoDescription}>
                  操作時に音声で案内する
                </Text>
              </View>
            </View>

            {/* Operation Support Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>♿</Text>
                <Text style={styles.sectionTitle}>操作サポート</Text>
              </View>

              {/* Haptic Feedback Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>触覚フィードバック</Text>
                  <Text style={styles.toggleDescription}>
                    タップ時に振動で操作を確認
                  </Text>
                </View>
                <Switch
                  value={hapticFeedback}
                  onValueChange={setHapticFeedback}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={hapticFeedback ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>

              {/* Extended Touch Time Toggle */}
              <View style={styles.toggleContainer}>
                <View style={styles.toggleInfo}>
                  <Text style={styles.toggleLabel}>操作時間を延長</Text>
                  <Text style={styles.toggleDescription}>
                    ボタンの長押し時間を長くする
                  </Text>
                </View>
                <Switch
                  value={extendedTouchTime}
                  onValueChange={setExtendedTouchTime}
                  trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                  thumbColor={extendedTouchTime ? '#FF6B6B' : '#F3F4F6'}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Save Button */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonIcon}>💾</Text>
            <Text style={styles.saveButtonText}>保存</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
