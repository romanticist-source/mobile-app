import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  paginationButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
  },
  paginationButtonDisabled: {
    color: '#CCCCCC',
  },
  pageInfo: {
    fontSize: 14,
    color: '#666666',
  },
});
