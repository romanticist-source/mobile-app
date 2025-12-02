import { getHelpers } from '@/api/helpers';
import type { Helper } from '@/_schema';
import { useHelper } from '@/contexts/HelperContext';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { styles } from './styles';

export function HelperHeader() {
  const { selectedHelperId, setSelectedHelperId, isLoading } = useHelper();
  const [helpers, setHelpers] = useState<Helper[]>([]);
  const [selectedHelper, setSelectedHelper] = useState<Helper | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // AsyncStorageの読み込みが完了するまで待つ
    if (isLoading) return;

    const fetchHelpers = async () => {
      try {
        const helperList = await getHelpers();
        setHelpers(helperList);

        // 保存されたヘルパーIDがあればそのヘルパーを選択、なければ最初のヘルパー
        if (selectedHelperId) {
          const savedHelper = helperList.find(h => h.id === selectedHelperId);
          if (savedHelper) {
            setSelectedHelper(savedHelper);
          } else if (helperList.length > 0) {
            // 保存されたヘルパーが見つからない場合のみ最初のヘルパーを設定
            setSelectedHelper(helperList[0]);
            setSelectedHelperId(helperList[0].id);
          }
        } else if (helperList.length > 0) {
          // 保存されたヘルパーIDがない場合のみ最初のヘルパーを設定
          setSelectedHelper(helperList[0]);
          setSelectedHelperId(helperList[0].id);
        }
      } catch (error) {
        console.error('Failed to fetch helpers:', error);
      }
    };
    fetchHelpers();
  }, [isLoading]);

  const handleSelectHelper = async (helper: Helper) => {
    setSelectedHelper(helper);
    await setSelectedHelperId(helper.id);
    setIsDropdownOpen(false);
  };

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <View style={styles.appIcon}>
          <Text style={styles.appIconText}>🤝</Text>
        </View>
        <View>
          <Text style={styles.appTitle}>介助者アプリ</Text>
          <Text style={styles.appSubtitle}>みまもりをサポート</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.headerRight}
        onPress={() => setIsDropdownOpen(true)}
      >
        <View style={styles.userIconContainer}>
          <Text style={styles.userIcon}>👨‍⚕️</Text>
        </View>
        <Text style={styles.userName}>{selectedHelper?.name ?? '介助者名'}</Text>
        <Text style={styles.dropdownArrow}>▼</Text>
      </TouchableOpacity>

      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsDropdownOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsDropdownOpen(false)}
        >
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownTitle}>介助者を選択</Text>
            <FlatList
              data={helpers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.dropdownItem,
                    selectedHelper?.id === item.id && styles.dropdownItemSelected,
                  ]}
                  onPress={() => handleSelectHelper(item)}
                >
                  <Text
                    style={[
                      styles.dropdownItemText,
                      selectedHelper?.id === item.id && styles.dropdownItemTextSelected,
                    ]}
                  >
                    {item.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
