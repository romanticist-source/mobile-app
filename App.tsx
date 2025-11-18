import { config as defaultConfig } from "@tamagui/config/v3";
import Constants from "expo-constants";
import { LogBox, StyleSheet, View } from "react-native";
import { createTamagui, TamaguiProvider } from "tamagui";
LogBox.ignoreAllLogs();

const config = createTamagui(defaultConfig);
type Conf = typeof config;
// make imports typed
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

function App() {
  return (
    <TamaguiProvider config={config}>
      <View style={styles.container}></View>
    </TamaguiProvider>
  );
}

let AppEntryPoint = App;

if (Constants.expoConfig.extra.storybookEnabled === "true") {
  AppEntryPoint = require("./.storybook").default;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AppEntryPoint;
