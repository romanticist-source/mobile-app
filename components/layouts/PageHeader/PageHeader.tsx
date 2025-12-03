import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { styles } from './styles';

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
}

export function PageHeader({ title, description, icon }: PageHeaderProps) {
  return (
    <View style={styles.pageHeader}>
      {icon && <View style={styles.headerIcon}>{icon}</View>}
      <Text style={styles.pageTitle}>{title}</Text>
      {description && <Text style={styles.pageDescription}>{description}</Text>}
    </View>
  );
}
