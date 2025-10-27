import { LogBox, StyleSheet, Text, View } from "react-native";
import Constants from "expo-constants";
import "expo-router/entry";
import { Link } from "expo-router";
LogBox.ignoreAllLogs();

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <button></button>
      <Link href="/test/notification/test">testページへ</Link>
    </View>
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