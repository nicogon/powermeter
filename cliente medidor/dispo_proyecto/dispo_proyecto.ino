#include <Wire.h>
// #include <ESP32WiFi.h>

#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <ArduinoOTA.h>

//#include "SSD1306.h" // alias for `#include "SSD1306Wire.h"'

#include <Adafruit_ADS1015.h>
#include "SSD1306.h"
SSD1306  display(0x3c, 5, 4);

WebServer server(80);

Adafruit_ADS1115 ads;     // Use this for the 16-bit version

const int alertPin = 2;

volatile bool continuousConversionReady = false;
float potenciaEficaz;
const char* ssid     = "nico5";
const char* password = "kokokokoko";


void handleRoot() {
  server.send(200, "text/plain", "{\"power\":\""+String(potenciaEficaz, 3)+"\"}");
}


void handleNotFound() {
  String message = "File Not Found\n\n";
  message += "URI: ";
  message += server.uri();
  message += "\nMethod: ";
  message += (server.method() == HTTP_GET) ? "GET" : "POST";
  message += "\nArguments: ";
  message += server.args();
  message += "\n";
  for (uint8_t i = 0; i < server.args(); i++) {
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);
}




void setup(void)
{
  pinMode(alertPin, INPUT);

  Serial.begin(115200);

  WiFi.mode(WIFI_STA);

  WiFi.begin(ssid, password);
  WiFi.setHostname("esp-cliente");


  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_16);


  display.clear();

  display.setColor(WHITE);
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.drawString(64, 15, "inicindo");
  display.display();


  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
    Serial.println("");
    Serial.print("Connected to ");
    Serial.println(ssid);
    Serial.print("IP address: ");
    Serial.println(WiFi.localIP());

    display.setColor(WHITE);
    display.setTextAlignment(TEXT_ALIGN_CENTER);
    display.clear();
    display.drawString(64, 15, WiFi.localIP().toString());
    display.display();

    if (MDNS.begin("esp32-cliente-medidor")) {
      Serial.println("MDNS responder started");
    }

    
  //update via wifi
  
  ArduinoOTA.onStart([]() {
    Serial.println("Start");
  });
  ArduinoOTA.onEnd([]() {
    Serial.println("\nEnd");
  });
  ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
    Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
  });
  ArduinoOTA.onError([](ota_error_t error) {
    Serial.printf("Error[%u]: ", error);
    if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
    else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
    else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
    else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
    else if (error == OTA_END_ERROR) Serial.println("End Failed");
  });
  ArduinoOTA.begin();

    server.on("/", handleRoot);

    server.on("/inline", []() {
      server.send(200, "text/plain", "this works as well");
    });

    server.onNotFound(handleNotFound);

    server.begin();
    Serial.println("HTTP server started");

  }
  // Serial.println("Hello!");

  // The ADC input range (or gain) can be changed via the following
  // functions, but be careful never to exceed VDD +0.3V max, or to
  // exceed the upper and lower limits if you adjust the input range!
  // Setting these values incorrectly may destroy your ADC!
  //                                                                ADS1015  ADS1115
  //                                                                -------  -------
  //  ads.setGain(GAIN_TWOTHIRDS);  // 2/3x gain +/- 6.144V  1 bit = 3mV      0.1875mV (default)
  ads.setGain(GAIN_ONE);        // 1x gain   +/- 4.096V  1 bit = 2mV      0.125mV
  // ads.setGain(GAIN_TWO);        // 2x gain   +/- 2.048V  1 bit = 1mV      0.0625mV
  // ads.setGain(GAIN_FOUR);       // 4x gain   +/- 1.024V  1 bit = 0.5mV    0.03125mV
  // ads.setGain(GAIN_EIGHT);      // 8x gain   +/- 0.512V  1 bit = 0.25mV   0.015625mV
  // ads.setGain(GAIN_SIXTEEN);    // 16x gain  +/- 0.256V  1 bit = 0.125mV  0.0078125mV

  //ads.begin(1,0);                // for ESP8266  SDA, SCL can be specified
  //ads.begin();


  //SDA SCL
  Wire.begin(5, 4);

  Serial.println("Starting continous mode on A0 at 8 SPS");
  ads.setSPS(ADS1115_DR_860SPS);
  ads.startContinuous_SingleEnded(0);
  //ads.startContinuous_SingleEnded(1);
  //ads.startContinuous_SingleEnded(2);
  //ads.startContinuous_SingleEnded(3);
  //ads.startContinuous_Differential_0_1();
  //ads.startContinuous_Differential_0_3();
  //ads.startContinuous_Differential_1_3();
  //ads.startContinuous_Differential_2_3();

  // delay(1
  attachInterrupt(digitalPinToInterrupt(alertPin), continuousAlert, FALLING);
}

void continuousAlert() {

  // Do not call getLastConversionResults from ISR because it uses I2C library that needs interrupts
  // to make it work, interrupts would need to be re-enabled in the ISR, which is not a very good practice.

  continuousConversionReady = true;
}
long ant;
int i = 0;
int rec = 0; int f;
float data[1000];
void loop(void)
{

  server.handleClient();


  if (continuousConversionReady) {

    data[i] = ((float) ads.getLastConversionResults()) * ads.voltsPerBit() * 5; //valor en corriente
    i++;
    continuousConversionReady = false;


    int sampleCount = 200;

    //tomo 200 mediciones q son como 1/4 de segundo
    if ((millis() - ant) > sampleCount) {

      int a;

      float valorEficaz = 0;
      for (a = 0; a < sampleCount; a++) {
        valorEficaz += data[a] * data[a] / sampleCount;
      }

      float corrienteEficaz = sqrt(valorEficaz) * 0.94;
      potenciaEficaz = corrienteEficaz * 220;


      display.clear();
      display.drawString(64, 15, String(potenciaEficaz, 3) + "w " +  String(corrienteEficaz, 3) + "a");
      display.display();



      i = 0;
      // Serial.println(millis()-ant);

      delay(4000);
      ant = millis();


      //  Serial.println(millis());
    }
  }


}
