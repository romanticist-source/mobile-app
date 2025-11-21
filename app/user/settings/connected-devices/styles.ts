import {
  background,
  border,
  fontBase,
  fontLg,
  fontMd,
  fontSm,
  fontXxxxl,
  headerButton,
  md,
  radiusSm,
  sm,
  surface,
  textPrimary,
  textSecondary,
  xl,
  xs,
} from "@/styles/tokens";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: sm,
    paddingTop: xl,
    paddingBottom: sm,
    backgroundColor: surface,
    borderBottomWidth: 1,
    borderBottomColor: border,
  },
  backButton: {
    padding: xs,
    marginLeft: -xs,
  },
  backIcon: {
    fontSize: fontXxxxl,
    color: textPrimary,
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: fontLg,
    fontWeight: "600",
    color: textPrimary,
  },
  headerRight: {
    width: headerButton,
  },
  scrollContent: {
    flex: 1,
  },
  contentWrapper: {
    paddingHorizontal: sm,
    paddingVertical: md,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: md,
  },
  deviceCount: {
    fontSize: fontBase,
    fontWeight: "600",
    color: textPrimary,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6B6B",
    paddingVertical: xs,
    paddingHorizontal: sm,
    borderRadius: radiusSm,
  },
  addButtonIcon: {
    fontSize: 20,
    color: surface,
    marginRight: 4,
  },
  addButtonText: {
    fontSize: fontMd,
    fontWeight: "600",
    color: surface,
  },
  deviceCard: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: md,
    borderWidth: 1,
    borderColor: border,
  },
  deviceHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: sm,
  },
  deviceIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: sm,
  },
  deviceIconWatch: {
    backgroundColor: "#FFF0F0",
  },
  deviceIconPhone: {
    backgroundColor: "#F0F4FF",
  },
  deviceIconText: {
    fontSize: 24,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceNameRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  deviceName: {
    fontSize: fontBase,
    fontWeight: "600",
    color: textPrimary,
    marginRight: xs,
  },
  connectedBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: xs,
    paddingVertical: 2,
    borderRadius: 12,
  },
  connectedIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  connectedText: {
    fontSize: 11,
    color: "#4CAF50",
    fontWeight: "600",
  },
  deviceModel: {
    fontSize: fontSm,
    color: textSecondary,
  },
  deviceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: xs,
  },
  batteryInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  batteryIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  batteryText: {
    fontSize: fontSm,
    color: textPrimary,
    fontWeight: "600",
  },
  syncInfo: {
    fontSize: fontSm,
    color: textSecondary,
  },
  batteryBarContainer: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: sm,
  },
  batteryBar: {
    height: "100%",
    borderRadius: 3,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: xs,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: xs,
    borderRadius: radiusSm,
    borderWidth: 1,
    borderColor: border,
  },
  actionButtonIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  actionButtonText: {
    fontSize: fontSm,
    color: textPrimary,
    fontWeight: "600",
  },
  deleteButton: {
    flex: 0,
    paddingHorizontal: sm,
  },
  deleteButtonIcon: {
    fontSize: 18,
  },
  infoBox: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: radiusSm,
    padding: sm,
    marginTop: md,
  },
  infoIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: fontMd,
    fontWeight: "600",
    color: "#1976D2",
    marginBottom: 4,
  },
  infoText: {
    fontSize: fontSm,
    color: "#1976D2",
    lineHeight: 18,
  },
  footer: {
    backgroundColor: surface,
    paddingHorizontal: sm,
    paddingVertical: sm,
    borderTopWidth: 1,
    borderTopColor: border,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: sm,
    borderRadius: radiusSm,
  },
  saveButtonIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  saveButtonText: {
    fontSize: fontBase,
    fontWeight: "700",
    color: surface,
  },
});
