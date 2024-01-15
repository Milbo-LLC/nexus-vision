import { StyleSheet, View } from "react-native";
import { BleManager } from "react-native-ble-plx";
// import Home from "./components/Home";
import { NhostClient, NhostProvider, useAuth } from "@nhost/react";
import React from "react";
import AuthForm from "./components/auth/AuthForm";

const nhost = new NhostClient({
  subdomain: "sdonyrtjqhytgsmeuuzf",
  region: "us-east-1",
});

export default function App() {
  const bleManager = new BleManager();

  return (
    <NhostProvider nhost={nhost}>
      <View style={styles.container}>
        {/* <Home bleManager={bleManager} /> */}
        <AuthForm />
      </View>
    </NhostProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
