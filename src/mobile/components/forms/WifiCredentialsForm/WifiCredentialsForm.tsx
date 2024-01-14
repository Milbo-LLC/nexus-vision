import { FC, useState } from "react";
import { Text, View } from "react-native";
import { Button, Input } from "@rneui/base";
import { Device } from "react-native-ble-plx";
import { encode as base64Encode } from "base-64";

const SERVICE_UUID = `4fafc201-1fb5-459e-8fcc-c5c9c331914b`;
const CHARACTERISTIC_UUID = `beb5483e-36e1-4688-b7f5-ea07361b26a8`;

interface Props {
  device: Device;
}

const grabServicesAndCharacteristics = async (device: Device) => {
  const services = await device.services();
  console.log("services: ", services);
};

const WifiCredentialForm: FC<Props> = ({ device }) => {
  console.log("device: ", device);
  const [ssid, setSsid] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);

  console.log(
    "grabServicesAndCharacteristics: ",
    grabServicesAndCharacteristics(device)
  );

  const sendWifiCredentials = async (
    connectedDevice: Device,
    ssid: string,
    password: string
  ) => {
    try {
      // Ensure the device is connected
      if (!connectedDevice.isConnected()) {
        await connectedDevice.connect();
        await connectedDevice.discoverAllServicesAndCharacteristics();
      }

      // Encode WiFi credentials
      const credentials = `${ssid}:${password}`;
      const encodedCredentials = base64Encode(credentials);

      // Write the encoded credentials to the characteristic
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        encodedCredentials
      );

      console.log("WiFi credentials sent successfully");
    } catch (error) {
      console.error("Failed to send WiFi credentials:", error);
    }
  };

  return (
    <View>
      <Text>Wifi Credentials Form</Text>
      <Input
        label="SSID"
        onChangeText={(text) => setSsid(text)}
        value={ssid}
        placeholder="SSID"
        autoCapitalize={"none"}
      />
      <Input
        label="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
        placeholder="Password"
        autoCapitalize={"none"}
      />
      <Button
        title="Submit"
        disabled={loading || !ssid || !password}
        onPress={() => sendWifiCredentials(device, ssid, password)}
      />
    </View>
  );
};

export default WifiCredentialForm;
