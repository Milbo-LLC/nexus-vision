#include <Arduino.h>

// put function declarations here:
int myFunction(int, int);

void setup()
{
  Serial.begin(115200);
  while (!Serial)
  {
    /* code */
    // Wait for serial to connect
    delay(100);
  };
};

void loop()
{
  // put your main code here, to run repeatedly:
  Serial.println("Hello world!");
  delay(1000);
};