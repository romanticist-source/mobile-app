import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface NotificationsPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function NotificationsPagination({
  currentPage,
  totalPages,
  onPageChange,
}: NotificationsPaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        style={styles.paginationButton}
        disabled={currentPage === 1}
        onPress={handlePrevious}
      >
        <Text
          style={[
            styles.paginationButtonText,
            currentPage === 1 && styles.paginationButtonDisabled,
          ]}
        >
          ‹ 前へ
        </Text>
      </TouchableOpacity>
      <Text style={styles.pageInfo}>
        {currentPage} / {totalPages} ページ
      </Text>
      <TouchableOpacity
        style={styles.paginationButton}
        disabled={currentPage === totalPages}
        onPress={handleNext}
      >
        <Text
          style={[
            styles.paginationButtonText,
            currentPage === totalPages && styles.paginationButtonDisabled,
          ]}
        >
          次へ ›
        </Text>
      </TouchableOpacity>
    </View>
  );
}

