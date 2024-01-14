#include <Arduino.h>
#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>

// See the following function prototypes
void setupBLE();

// BLE Server
BLEServer *pServer = nullptr;

// BLE Service
BLEService *pService = nullptr;

// BLE Characteristic for WiFi credentials
BLECharacteristic *pCharacteristic = nullptr;

// UUIDs for BLE service and characteristic
#define SERVICE_UUID "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    delay(100);
  }

  Serial.println("Starting BLE work!");
  setupBLE();
}

void loop()
{
  // Your existing code
  Serial.println("Hello world!");
  delay(1000);
}

void setupBLE()
{
  BLEDevice::init("ESP32-CAM");

  // Create the BLE Server
  pServer = BLEDevice::createServer();

  // Create the BLE Service
  pService = pServer->createService(SERVICE_UUID);

  // Create a BLE Characteristic
  pCharacteristic = pService->createCharacteristic(
      CHARACTERISTIC_UUID,
      BLECharacteristic::PROPERTY_READ |
          BLECharacteristic::PROPERTY_WRITE);

  // Start the service
  pService->start();

  // Start advertising
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");
}
