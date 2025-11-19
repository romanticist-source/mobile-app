import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { View } from 'react-native';
import React, { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'UI/Pagination',
  component: Pagination,
  decorators: [
    (Story) => (
      <View style={{ padding: 20, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Pagination>;

// Interactive wrapper for Storybook
function PaginationWrapper(props: Omit<React.ComponentProps<typeof Pagination>, 'currentPage' | 'onPageChange'> & { initialPage?: number }) {
  const [currentPage, setCurrentPage] = useState(props.initialPage || 1);

  return (
    <Pagination
      {...props}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export const Default: Story = {
  render: () => (
    <PaginationWrapper
      totalPages={10}
      itemsPerPage={5}
      totalItems={50}
    />
  ),
};

export const FewPages: Story = {
  render: () => (
    <PaginationWrapper
      totalPages={3}
      itemsPerPage={5}
      totalItems={15}
    />
  ),
};

export const ManyPages: Story = {
  render: () => (
    <PaginationWrapper
      totalPages={20}
      itemsPerPage={5}
      totalItems={100}
    />
  ),
};

export const LastPage: Story = {
  render: () => (
    <PaginationWrapper
      initialPage={10}
      totalPages={10}
      itemsPerPage={5}
      totalItems={50}
    />
  ),
};

export const WithoutInfo: Story = {
  render: () => (
    <PaginationWrapper
      totalPages={10}
    />
  ),
};
