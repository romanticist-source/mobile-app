import Constants from "expo-constants";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

// When Storybook is enabled, use Storybook as the entry point
// Otherwise, use expo-router's default entry which will load app/_layout.tsx
const AppEntryPoint =
  Constants.expoConfig?.extra?.storybookEnabled === "true"
    ? require("./.storybook").default
    : require("expo-router/entry").default;

export default AppEntryPoint;
