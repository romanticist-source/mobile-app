import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { EmergencyContact } from '@/_schema/emergency-contact';
import { makePhoneCall } from '@/_util/phoneHelper';
import { styles } from './styles';

interface EmergencyContactCardProps {
  contact: EmergencyContact;
  onPress: () => void;
  onDelete: () => void;
}

export function EmergencyContactCard({ contact, onPress, onDelete }: EmergencyContactCardProps) {
  const handlePhoneCall = () => {
    makePhoneCall(contact.phoneNumber, contact.name);
  };

  return (
    <View style={styles.contactCard}>
      <TouchableOpacity style={styles.contactContent} onPress={onPress}>
        <View style={styles.contactHeader}>
          <View style={styles.contactInfo}>
            <View style={styles.nameRow}>
              <Text style={styles.contactName}>{contact.name}</Text>
              {contact.isMain && (
                <View style={styles.mainBadge}>
                  <Text style={styles.mainBadgeText}>メイン</Text>
                </View>
              )}
            </View>
            <Text style={styles.contactRelationship}>{contact.relationship}</Text>
          </View>
          <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
            <MaterialIcons name="delete" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        </View>

        <View style={styles.contactDetails}>
          <View style={styles.detailRow}>
            <MaterialIcons name="phone" size={16} color="#666666" />
            <Text style={styles.detailText}>{contact.phoneNumber}</Text>
            <TouchableOpacity style={styles.callButton} onPress={handlePhoneCall}>
              <MaterialIcons name="phone" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          {contact.email && (
            <View style={styles.detailRow}>
              <MaterialIcons name="email" size={16} color="#666666" />
              <Text style={styles.detailText}>{contact.email}</Text>
            </View>
          )}
          {contact.address && (
            <View style={styles.detailRow}>
              <MaterialIcons name="location-on" size={16} color="#666666" />
              <Text style={styles.detailText}>{contact.address}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
