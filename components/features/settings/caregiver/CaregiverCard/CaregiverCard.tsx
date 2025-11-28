import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { HelperDisplay } from '@/app/user/settings/caregiver/(hooks)/useHelperManagement';
import { styles } from './styles';

interface CaregiverCardProps {
  helper: HelperDisplay;
  onMenuPress: (helper: HelperDisplay) => void;
}

export function CaregiverCard({ helper, onMenuPress }: CaregiverCardProps) {
  return (
    <View style={styles.caregiverCard}>
      {/* Avatar and Basic Info */}
      <View style={styles.caregiverHeader}>
        <View style={styles.avatarContainer}>
          <View style={[styles.avatarCircle, { backgroundColor: helper.avatarColor }]}>
            <Text style={styles.avatarText}>{helper.avatar}</Text>
          </View>
        </View>

        <View style={styles.caregiverInfo}>
          <Text style={styles.caregiverName}>{helper.name}</Text>
          <Text style={styles.caregiverRole}>{helper.nickname}</Text>
          <Text style={styles.caregiverRelation}>{helper.relationship}</Text>
        </View>

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => onMenuPress(helper)}
        >
          <MaterialIcons name="more-vert" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <View style={styles.contactRow}>
          <MaterialIcons name="email" size={16} color="#666666" style={styles.contactIcon} />
          <Text style={styles.contactText}>{helper.email}</Text>
        </View>
        <View style={styles.contactRow}>
          <MaterialIcons name="phone" size={16} color="#666666" style={styles.contactIcon} />
          <Text style={styles.contactText}>{helper.phoneNumber}</Text>
        </View>
      </View>
    </View>
  );
}
