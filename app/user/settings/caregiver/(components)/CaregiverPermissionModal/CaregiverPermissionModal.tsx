import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { styles } from './styles';

interface CaregiverPermissions {
  location: boolean;
  health: boolean;
  alerts: boolean;
  emergencyContact: boolean;
}

interface CaregiverPermissionModalProps {
  visible: boolean;
  onClose: () => void;
  caregiverName: string;
  initialPermissions: CaregiverPermissions;
  onSave: (permissions: CaregiverPermissions) => void;
  onDelete: () => void;
}

export function CaregiverPermissionModal({
  visible,
  onClose,
  caregiverName,
  initialPermissions,
  onSave,
  onDelete,
}: CaregiverPermissionModalProps) {
  const [permissions, setPermissions] = useState<CaregiverPermissions>(initialPermissions);

  useEffect(() => {
    if (visible) {
      setPermissions(initialPermissions);
    }
  }, [visible, initialPermissions]);

  const handleToggle = (key: keyof CaregiverPermissions) => {
    setPermissions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    onSave(permissions);
    onClose();
  };

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{caregiverName}の権限設定</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeIcon}>✕</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.modalDescription}>
            この介助者が閲覧・操作できる情報を設定します
          </Text>

          {/* Permission Toggles */}
          <View style={styles.permissionsContainer}>
            {/* Location Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionLeft}>
                <View style={styles.permissionIconContainer}>
                  <Text style={styles.permissionIcon}>📍</Text>
                </View>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionLabel}>位置情報を共有</Text>
                  <Text style={styles.permissionDescription}>
                    リアルタイムで位置情報を閲覧可能
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.location}
                onValueChange={() => handleToggle('location')}
                trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                thumbColor={permissions.location ? '#FF6B6B' : '#F3F4F6'}
              />
            </View>

            {/* Health Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionLeft}>
                <View style={styles.permissionIconContainer}>
                  <Text style={styles.permissionIcon}>💚</Text>
                </View>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionLabel}>健康情報を共有</Text>
                  <Text style={styles.permissionDescription}>
                    バイタルデータや健康状態を閲覧可能
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.health}
                onValueChange={() => handleToggle('health')}
                trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                thumbColor={permissions.health ? '#FF6B6B' : '#F3F4F6'}
              />
            </View>

            {/* Alerts Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionLeft}>
                <View style={styles.permissionIconContainer}>
                  <Text style={styles.permissionIcon}>🚨</Text>
                </View>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionLabel}>アラートを受信</Text>
                  <Text style={styles.permissionDescription}>
                    緊急時や警報時の通知を受け取る
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.alerts}
                onValueChange={() => handleToggle('alerts')}
                trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                thumbColor={permissions.alerts ? '#FF6B6B' : '#F3F4F6'}
              />
            </View>

            {/* Emergency Contact Permission */}
            <View style={styles.permissionItem}>
              <View style={styles.permissionLeft}>
                <View style={styles.permissionIconContainer}>
                  <Text style={styles.permissionIcon}>📞</Text>
                </View>
                <View style={styles.permissionInfo}>
                  <Text style={styles.permissionLabel}>緊急連絡先として登録</Text>
                  <Text style={styles.permissionDescription}>
                    ヘルプ要請時に最優先で連絡
                  </Text>
                </View>
              </View>
              <Switch
                value={permissions.emergencyContact}
                onValueChange={() => handleToggle('emergencyContact')}
                trackColor={{ false: '#D1D5DB', true: '#FCA5A5' }}
                thumbColor={permissions.emergencyContact ? '#FF6B6B' : '#F3F4F6'}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
              <Text style={styles.deleteButtonIcon}>👤</Text>
              <Text style={styles.deleteButtonText}>削除</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}
