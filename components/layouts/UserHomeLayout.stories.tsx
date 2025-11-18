import type { Meta, StoryObj } from "@storybook/react";
import { UserHomeLayout } from "./UserHomeLayout";
import React from "react";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";

const meta: Meta<typeof UserHomeLayout> = {
  title: "Layouts/UserHomeLayout",
  component: UserHomeLayout,
  argTypes: {
    username: {
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof UserHomeLayout>;

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    marginBottom: 4,
  },
});

export const Default: Story = {
  args: {
    username: "ひらまつ",
    children: (
      <ThemedView>
        <ThemedText type="subtitle">Sample Content</ThemedText>
        <ThemedText>
          This is the default user home layout with some sample content.
        </ThemedText>
      </ThemedView>
    ),
  },
};

export const WithStats: Story = {
  args: {
    username: "田中太郎",
    children: (
      <ThemedView>
        <ThemedView style={styles.statsContainer}>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              24
            </ThemedText>
            <ThemedText>Tasks</ThemedText>
          </ThemedView>
          <ThemedView style={styles.statItem}>
            <ThemedText type="defaultSemiBold" style={styles.statValue}>
              12
            </ThemedText>
            <ThemedText>Completed</ThemedText>
          </ThemedView>
        </ThemedView>
      </ThemedView>
    ),
  },
};

export const WithLongUsername: Story = {
  args: {
    username: "とても長いユーザー名の例",
    children: (
      <ThemedView>
        <ThemedText>
          Testing the layout with a very long username to ensure proper handling.
        </ThemedText>
      </ThemedView>
    ),
  },
};

export const EmptyContent: Story = {
  args: {
    username: "User",
  },
};
