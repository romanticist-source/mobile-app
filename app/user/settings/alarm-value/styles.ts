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
  section: {
    backgroundColor: surface,
    borderRadius: radiusSm,
    padding: sm,
    marginBottom: md,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: xs,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: xs,
  },
  sectionTitle: {
    fontSize: fontBase,
    fontWeight: "700",
    color: textPrimary,
  },
  sectionDescription: {
    fontSize: fontSm,
    color: textSecondary,
    marginBottom: md,
    lineHeight: 18,
  },
  thresholdSection: {
    marginBottom: md,
  },
  thresholdHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: md,
  },
  thresholdIcon: {
    fontSize: 18,
    marginRight: xs,
  },
  thresholdTitle: {
    fontSize: fontMd,
    fontWeight: "600",
    color: textPrimary,
  },
  sliderContainer: {
    marginBottom: md,
  },
  sliderLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: xs,
  },
  sliderLabel: {
    fontSize: fontSm,
    color: textSecondary,
  },
  sliderValue: {
    fontSize: fontMd,
    fontWeight: "600",
    color: "#FF6B6B",
  },
  slider: {
    width: "100%",
    height: 40,
  },
  rangeDescription: {
    fontSize: fontSm,
    color: textSecondary,
    marginTop: xs,
  },
  noticeBox: {
    flexDirection: "row",
    backgroundColor: "#E3F2FD",
    borderRadius: radiusSm,
    padding: sm,
    alignItems: "center",
  },
  noticeIcon: {
    fontSize: 18,
    marginRight: xs,
  },
  noticeText: {
    flex: 1,
    fontSize: fontSm,
    color: "#1565C0",
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
