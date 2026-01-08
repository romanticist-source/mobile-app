import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { HelperConnectWithDetails } from '@/_schema';
import { styles } from './styles';

interface RequestCardProps {
  request: HelperConnectWithDetails;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function RequestCard({ request, onApprove, onReject }: RequestCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleApprove = () => {
    console.log('[RequestCard] 承認ボタンがクリックされました', request.id);
    onApprove(request.id);
  };

  const handleReject = () => {
    console.log('[RequestCard] 拒否ボタンがクリックされました', request.id);
    onReject(request.id);
  };

  return (
    <View style={styles.card}>
      {/* User Info */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <MaterialIcons name="person" size={32} color="#FF6B6B" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{request.user?.name || '不明なユーザー'}</Text>
          <Text style={styles.email}>{request.user?.mail || request.userId}</Text>
        </View>
      </View>

      {/* Request Date */}
      <View style={styles.dateContainer}>
        <MaterialIcons name="schedule" size={16} color="#666666" />
        <Text style={styles.dateText}>
          リクエスト日時: {formatDate(request.createdAt)}
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.button, styles.rejectButton]}
          onPress={handleReject}
        >
          <MaterialIcons name="close" size={20} color="#FF3366" />
          <Text style={styles.rejectButtonText}>拒否</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.approveButton]}
          onPress={handleApprove}
        >
          <MaterialIcons name="check" size={20} color="#FFFFFF" />
          <Text style={styles.approveButtonText}>承認</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
