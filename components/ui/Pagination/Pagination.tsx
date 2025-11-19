import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from './styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
  totalItems?: number;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
}: PaginationProps) {
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

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Info text */}
      {itemsPerPage && totalItems && (
        <Text style={styles.infoText}>
          {(currentPage - 1) * itemsPerPage + 1} -{' '}
          {Math.min(currentPage * itemsPerPage, totalItems)} / {totalItems}件
        </Text>
      )}

      {/* Pagination controls */}
      <View style={styles.controlsContainer}>
        {/* Previous button */}
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentPage === 1 && styles.navigationButtonDisabled,
          ]}
          onPress={handlePrevious}
          disabled={currentPage === 1}
        >
          <Text
            style={[
              styles.navigationButtonText,
              currentPage === 1 && styles.navigationButtonTextDisabled,
            ]}
          >
            前へ
          </Text>
        </TouchableOpacity>

        {/* Page numbers */}
        <View style={styles.pageNumbersContainer}>
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <View key={`ellipsis-${index}`} style={styles.ellipsis}>
                  <Text style={styles.ellipsisText}>...</Text>
                </View>
              );
            }

            const pageNumber = page as number;
            const isActive = pageNumber === currentPage;

            return (
              <TouchableOpacity
                key={pageNumber}
                style={[
                  styles.pageButton,
                  isActive && styles.pageButtonActive,
                ]}
                onPress={() => onPageChange(pageNumber)}
                disabled={isActive}
              >
                <Text
                  style={[
                    styles.pageButtonText,
                    isActive && styles.pageButtonTextActive,
                  ]}
                >
                  {pageNumber}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Next button */}
        <TouchableOpacity
          style={[
            styles.navigationButton,
            currentPage === totalPages && styles.navigationButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={currentPage === totalPages}
        >
          <Text
            style={[
              styles.navigationButtonText,
              currentPage === totalPages && styles.navigationButtonTextDisabled,
            ]}
          >
            次へ
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
