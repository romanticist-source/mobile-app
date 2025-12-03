import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { Helper, CreateHelper } from '@/_schema';
import { styles } from './styles';

interface HelperFormProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: CreateHelper) => Promise<void>;
  initialData?: Helper;
  isEditing?: boolean;
}

interface FormErrors {
  name?: string;
  nickname?: string;
  phoneNumber?: string;
  email?: string;
  relationship?: string;
}

export function HelperForm({
  visible,
  onClose,
  onSubmit,
  initialData,
  isEditing = false,
}: HelperFormProps) {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [relationship, setRelationship] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (visible && initialData) {
      setName(initialData.name);
      setNickname(initialData.nickname);
      setPhoneNumber(initialData.phoneNumber);
      setEmail(initialData.email);
      setRelationship(initialData.relationship);
    } else if (visible && !initialData) {
      setName('');
      setNickname('');
      setPhoneNumber('');
      setEmail('');
      setRelationship('');
    }
    setErrors({});
  }, [visible, initialData]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!name.trim()) {
      newErrors.name = '名前を入力してください';
    } else if (name.length > 100) {
      newErrors.name = '名前は100文字以内で入力してください';
    }

    if (!nickname.trim()) {
      newErrors.nickname = 'ニックネームを入力してください';
    } else if (nickname.length > 50) {
      newErrors.nickname = 'ニックネームは50文字以内で入力してください';
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = '電話番号を入力してください';
    } else if (!/^0\d{1,4}-?\d{1,4}-?\d{3,4}$/.test(phoneNumber)) {
      newErrors.phoneNumber = '有効な電話番号を入力してください';
    }

    if (!email.trim()) {
      newErrors.email = 'メールアドレスを入力してください';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = '有効なメールアドレスを入力してください';
    }

    if (!relationship.trim()) {
      newErrors.relationship = '関係性を入力してください';
    } else if (relationship.length > 50) {
      newErrors.relationship = '関係性は50文字以内で入力してください';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({
        name: name.trim(),
        nickname: nickname.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        relationship: relationship.trim(),
      });
      onClose();
    } catch (err) {
      console.error('Failed to submit helper:', err);
    } finally {
      setSubmitting(false);
    }
  };

  const isFormValid = name && nickname && phoneNumber && email && relationship;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {isEditing ? '介助者を編集' : '介助者を追加'}
            </Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSubmit}
              disabled={!isFormValid || submitting}
            >
              <Text
                style={[
                  styles.saveButtonText,
                  (!isFormValid || submitting) && styles.saveButtonDisabled,
                ]}
              >
                {submitting ? '保存中...' : '保存'}
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                名前 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                value={name}
                onChangeText={setName}
                placeholder="山田 花子"
                placeholderTextColor="#999999"
              />
              {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                ニックネーム/役割 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.nickname && styles.inputError]}
                value={nickname}
                onChangeText={setNickname}
                placeholder="訪問看護師"
                placeholderTextColor="#999999"
              />
              {errors.nickname && (
                <Text style={styles.errorText}>{errors.nickname}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                電話番号 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="090-1234-5678"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
              {errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                メールアドレス <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={email}
                onChangeText={setEmail}
                placeholder="example@email.com"
                placeholderTextColor="#999999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                関係性 <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={[styles.input, errors.relationship && styles.inputError]}
                value={relationship}
                onChangeText={setRelationship}
                placeholder="担当看護師"
                placeholderTextColor="#999999"
              />
              {errors.relationship && (
                <Text style={styles.errorText}>{errors.relationship}</Text>
              )}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!isFormValid || submitting) && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={!isFormValid || submitting}
            >
              <Text style={styles.submitButtonText}>
                {submitting ? '保存中...' : isEditing ? '更新する' : '追加する'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
