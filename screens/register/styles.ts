import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 32,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FF3366",
    marginTop: 24,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  required: {
    color: "#FF3366",
    fontSize: 14,
  },
  input: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  textArea: {
    height: 100,
    paddingTop: 14,
  },
  registerButton: {
    backgroundColor: "#FF3366",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  backButtonText: {
    color: "#666",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
