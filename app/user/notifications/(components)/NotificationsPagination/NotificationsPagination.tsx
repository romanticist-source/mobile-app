import React from 'react';
import { XStack, Text } from 'tamagui';

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

  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;

  return (
    <XStack
      justifyContent="space-between"
      alignItems="center"
      paddingHorizontal="$4"
      paddingVertical="$5"
    >
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        pressStyle={{ opacity: isPrevDisabled ? 1 : 0.7 }}
        onPress={isPrevDisabled ? undefined : handlePrevious}
      >
        <Text
          fontSize={14}
          fontWeight="600"
          color={isPrevDisabled ? "$borderColor" : "$color"}
        >
          ‹ 前へ
        </Text>
      </XStack>
      <Text fontSize={14} color="$colorSecondary">
        {currentPage} / {totalPages} ページ
      </Text>
      <XStack
        paddingHorizontal="$3"
        paddingVertical="$2"
        pressStyle={{ opacity: isNextDisabled ? 1 : 0.7 }}
        onPress={isNextDisabled ? undefined : handleNext}
      >
        <Text
          fontSize={14}
          fontWeight="600"
          color={isNextDisabled ? "$borderColor" : "$color"}
        >
          次へ ›
        </Text>
      </XStack>
    </XStack>
  );
}

