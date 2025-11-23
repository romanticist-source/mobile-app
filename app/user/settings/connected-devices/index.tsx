import { Stack, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface Device {
  id: string;
  name: string;
  type: "watch" | "phone";
  model: string;
  version: string;
  battery: number;
  isCharging: boolean;
  lastSync: string;
  isConnected: boolean;
}

export default function DeviceManagementScreen() {
  const router = useRouter();

  const [devices, setDevices] = useState<Device[]>([
    {
      id: "1",
      name: "Apple Watch Series 8",
      type: "watch",
      model: "Apple Watch",
      version: "10.1.1",
      battery: 78,
      isCharging: false,
      lastSync: "23分前",
      isConnected: true,
    },
    {
      id: "2",
      name: "Google Pixel Watch",
      type: "watch",
      model: "Pixel Watch",
      version: "3.2.0",
      battery: 45,
      isCharging: true,
      lastSync: "5分前",
      isConnected: true,
    },
    {
      id: "3",
      name: "iPhone 14 Pro",
      type: "phone",
      model: "iPhone",
      version: "iOS 17.1",
      battery: 92,
      isCharging: false,
      lastSync: "1分前",
      isConnected: true,
    },
  ]);

  const handleAddDevice = () => {
    console.log("Add device");
    // TODO: Navigate to add device screen
  };

  const handleSync = (deviceId: string) => {
    console.log("Sync device:", deviceId);
    // TODO: Implement device sync
  };

  const handleDisconnect = (deviceId: string) => {
    console.log("Disconnect device:", deviceId);
    // TODO: Implement device disconnect
    setDevices((prevDevices) =>
      prevDevices.map((device) =>
        device.id === deviceId ? { ...device, isConnected: false } : device
      )
    );
  };

  const handleDelete = (deviceId: string) => {
    console.log("Delete device:", deviceId);
    // TODO: Show confirmation dialog
    setDevices((prevDevices) =>
      prevDevices.filter((device) => device.id !== deviceId)
    );
  };

  const handleSave = () => {
    console.log("Save device settings");
    // TODO: API call to update device settings
    router.back();
  };

  const getBatteryColor = (battery: number) => {
    if (battery >= 60) return "#4CAF50";
    if (battery >= 30) return "#FF9800";
    return "#FF6B6B";
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
          <Text style={styles.headerTitle}>接続デバイス管理</Text>
          <View style={styles.headerRight} />
        </View>

        {/* Content */}
        <ScrollView style={styles.scrollContent}>
          <View style={styles.contentWrapper}>
            {/* Device Count and Add Button */}
            <View style={styles.topSection}>
              <Text style={styles.deviceCount}>
                接続済み: {devices.length}台
              </Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddDevice}
              >
                <Text style={styles.addButtonIcon}>+</Text>
                <Text style={styles.addButtonText}>デバイスを追加</Text>
              </TouchableOpacity>
            </View>

            {/* Device Cards */}
            {devices.map((device) => (
              <View key={device.id} style={styles.deviceCard}>
                {/* Device Header */}
                <View style={styles.deviceHeader}>
                  <View
                    style={[
                      styles.deviceIcon,
                      device.type === "watch"
                        ? styles.deviceIconWatch
                        : styles.deviceIconPhone,
                    ]}
                  >
                    <Text style={styles.deviceIconText}>
                      {device.type === "watch" ? "⌚" : "📱"}
                    </Text>
                  </View>

                  <View style={styles.deviceInfo}>
                    <View style={styles.deviceNameRow}>
                      <Text style={styles.deviceName}>{device.name}</Text>
                      {device.isConnected && (
                        <View style={styles.connectedBadge}>
                          <Text style={styles.connectedIcon}>📶</Text>
                          <Text style={styles.connectedText}>接続中</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.deviceModel}>
                      {device.model} • {device.version}
                    </Text>
                  </View>
                </View>

                {/* Battery and Sync Info */}
                <View style={styles.deviceStats}>
                  <View style={styles.batteryInfo}>
                    <Text style={styles.batteryIcon}>🔋</Text>
                    <Text style={styles.batteryText}>
                      {device.battery}%{device.isCharging && " (充電中)"}
                    </Text>
                  </View>
                  <Text style={styles.syncInfo}>
                    最終同期: {device.lastSync}
                  </Text>
                </View>

                {/* Battery Bar */}
                <View style={styles.batteryBarContainer}>
                  <View
                    style={[
                      styles.batteryBar,
                      {
                        width: `${device.battery}%`,
                        backgroundColor: getBatteryColor(device.battery),
                      },
                    ]}
                  />
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleSync(device.id)}
                  >
                    <Text style={styles.actionButtonIcon}>🔄</Text>
                    <Text style={styles.actionButtonText}>同期</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDisconnect(device.id)}
                  >
                    <Text style={styles.actionButtonIcon}>🚫</Text>
                    <Text style={styles.actionButtonText}>切断</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDelete(device.id)}
                  >
                    <Text style={styles.deleteButtonIcon}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* Troubleshooting Info */}
            <View style={styles.infoBox}>
              <Text style={styles.infoIcon}>⚙️</Text>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoTitle}>デバイスが見つからない場合</Text>
                <Text style={styles.infoText}>
                  • デバイスのBluetooth設定を確認してください{"\n"}•
                  デバイスとスマートフォンが近くにあることを確認してください
                  {"\n"}• デバイスを再起動してみてください
                </Text>
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
