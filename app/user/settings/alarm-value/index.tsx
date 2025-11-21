import Slider from "@react-native-community/slider";
import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function AlertThresholdScreen() {
  const router = useRouter();

  const [heartRateMin, setHeartRateMin] = useState(60);
  const [heartRateMax, setHeartRateMax] = useState(100);
  const [activityLevel, setActivityLevel] = useState(70);

  const handleSave = () => {
    console.log("Save alert threshold settings:", {
      heartRateMin,
      heartRateMax,
      activityLevel,
    });
    // TODO: API call to update alert threshold settings
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
          <Text style={styles.headerTitle}>アラート閾値</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Alert Threshold Section */}
            <View style={styles.section}>
              {/* Section Header */}
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionIcon}>🔔</Text>
                <Text style={styles.sectionTitle}>アラート閾値設定</Text>
              </View>

              <Text style={styles.sectionDescription}>
                バイタルデータが設定した閾値を超えた場合に通知します
              </Text>

              {/* Heart Rate Section */}
              <View style={styles.thresholdSection}>
                <View style={styles.thresholdHeader}>
                  <Text style={styles.thresholdIcon}>❤️</Text>
                  <Text style={styles.thresholdTitle}>心拍数</Text>
                </View>

                {/* Minimum Heart Rate */}
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabelRow}>
                    <Text style={styles.sliderLabel}>最小値</Text>
                    <Text style={styles.sliderValue}>{heartRateMin} bpm</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={40}
                    maximumValue={80}
                    step={1}
                    value={heartRateMin}
                    onValueChange={setHeartRateMin}
                    minimumTrackTintColor="#FF6B6B"
                    maximumTrackTintColor="#E5E7EB"
                    thumbTintColor="#FF6B6B"
                  />
                </View>

                {/* Maximum Heart Rate */}
                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabelRow}>
                    <Text style={styles.sliderLabel}>最大値</Text>
                    <Text style={styles.sliderValue}>{heartRateMax} bpm</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={80}
                    maximumValue={140}
                    step={1}
                    value={heartRateMax}
                    onValueChange={setHeartRateMax}
                    minimumTrackTintColor="#FF6B6B"
                    maximumTrackTintColor="#E5E7EB"
                    thumbTintColor="#FF6B6B"
                  />
                </View>

                <Text style={styles.rangeDescription}>
                  {heartRateMin}~{heartRateMax} bpmの範囲外で通知
                </Text>
              </View>

              {/* Activity Level Section */}
              <View style={styles.thresholdSection}>
                <View style={styles.thresholdHeader}>
                  <Text style={styles.thresholdIcon}>⚡</Text>
                  <Text style={styles.thresholdTitle}>活動レベル</Text>
                </View>

                <View style={styles.sliderContainer}>
                  <View style={styles.sliderLabelRow}>
                    <Text style={styles.sliderLabel}>警告レベル</Text>
                    <Text style={styles.sliderValue}>{activityLevel}%</Text>
                  </View>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={5}
                    value={activityLevel}
                    onValueChange={setActivityLevel}
                    minimumTrackTintColor="#FF6B6B"
                    maximumTrackTintColor="#E5E7EB"
                    thumbTintColor="#FF6B6B"
                  />
                </View>

                <Text style={styles.rangeDescription}>
                  {activityLevel}%を超えた場合に通知
                </Text>
              </View>

              {/* Health Indicators Section */}
              <View style={styles.thresholdSection}>
                <View style={styles.thresholdHeader}>
                  <Text style={styles.thresholdIcon}>📊</Text>
                  <Text style={styles.thresholdTitle}>健康指標</Text>
                </View>
              </View>
            </View>

            {/* Notice Box */}
            <View style={styles.noticeBox}>
              <Text style={styles.noticeIcon}>ℹ️</Text>
              <Text style={styles.noticeText}>
                アラート通知は本人と介助者の両方に送信されます
              </Text>
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
