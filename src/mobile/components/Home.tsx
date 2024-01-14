import { FC, useState, useEffect } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { BleManager, Device, State } from "react-native-ble-plx";
import WifiCredentialForm from "./forms/WifiCredentialsForm/WifiCredentialsForm";

interface Props {
  bleManager: BleManager;
}

const Home: FC<Props> = ({ bleManager }) => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [connectedDevice, setConnectedDevice] = useState<Device | null>(null);

  // Function to handle device scanning
  const startScanning = () => {
    bleManager.startDeviceScan(null, null, (error, scannedDevice) => {
      if (error) {
        console.log(error);
        return;
      }

      // Handle device discovery
      if (scannedDevice && scannedDevice.name === "ESP32-CAM") {
        console.log("found device, connecting...");
        bleManager.stopDeviceScan();
        connectToDevice(scannedDevice);
      } else {
        setDevices((prevDevices: any) => {
          const deviceExists = prevDevices.some(
            (device: Device) => device.id === scannedDevice?.id
          );
          return deviceExists ? prevDevices : [...prevDevices, scannedDevice];
        });
      }
    });
  };

  // Function to connect to a device
  const connectToDevice = (device: Device) => {
    console.log(`Attempting to connect to ${device.name}...`);
    bleManager
      .connectToDevice(device.id)
      .then((connectedDevice) => {
        return connectedDevice.discoverAllServicesAndCharacteristics();
      })
      .then((discoveredDevice) => {
        setConnectedDevice(discoveredDevice);
        console.log(`Connected to device ${discoveredDevice.name}`);
      })
      .catch((error) => {
        console.error(`Failed to connect to device: ${error.message}`);
      });
  };

  useEffect(() => {
    // Subscribe to Bluetooth state changes
    const subscription = bleManager.onStateChange((state) => {
      if (state === State.PoweredOn) {
        console.log("Bluetooth is on. Starting scan...");
        startScanning();
      }
    }, true); // Passing true to subscribe to the initial state

    return () => {
      subscription.remove();
      bleManager.stopDeviceScan();
    };
  }, []);

  return (
    <View>
      {/* <FlatList
        data={devices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{`Device (ID: ${item.id}, Name: ${item.name})`}</Text>
        )}
      /> */}

      {connectedDevice ? (
        <View>
          <Text>{`Connected to device: ${connectedDevice.name}`}</Text>
          <WifiCredentialForm device={connectedDevice} />
        </View>
      ) : (
        <View>
          <Text>{`Scanning for Camera. Make sure it is powered on and nearby`}</Text>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default Home;
