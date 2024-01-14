import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
import Home from "./components/Home";

export default function App() {
  const bleManager = new BleManager();

  return (
    <View style={styles.container}>
      <Home bleManager={bleManager} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
