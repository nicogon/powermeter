#include <Wire.h>
// #include <ESP32WiFi.h>

#include <HTTPClient.h>

#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <ArduinoOTA.h>
#include <Bridge.h>


// HttpClient client;

HTTPClient http;


//#include "SSD1306.h" // alias for `#include "SSD1306Wire.h"'

#include <Adafruit_ADS1015.h>
#include "SSD1306.h"
SSD1306  display(0x3c, 5, 4);

WebServer server(80);

Adafruit_ADS1115 ads;     // Use this for the 16-bit version

const int alertPin = 13;

bool disableMediciones = false;
volatile bool continuousConversionReady = false;
const char* ssid     = "powermeter";
const char* password = "powermeter";
long ant;
int i = 0;
int rec = 0; int f;
float data[1000];


//tomo 200 mediciones q son como 1/4 de segundo
int sampleCount = 200;


String dispoId = "1234";

void handleRoot() {
  server.send(200, "It's alive");
  // server.send(200, "text/plain", "{\"power\":\"" + String(potenciaEficaz, 3) + "\"}");
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
  WiFi.setHostname(("cliente-medidor-" + dispoId).c_str());

  display.init();
  display.flipScreenVertically();
  display.setFont(ArialMT_Plain_16);
  display.clear();
  display.setColor(WHITE);
  display.setTextAlignment(TEXT_ALIGN_CENTER);
  display.drawString(64, 15, "iniciando");
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
    display.drawString(64, 10, "Conectando...");

    display.drawString(64, 15 + 11, WiFi.localIP().toString());
    display.display();

    if (MDNS.begin(("cliente-medidor-" + dispoId).c_str())) {
      Serial.println("MDNS responder started");
    }

    //update via wifi

    ArduinoOTA.onStart([]() {
      disableMediciones = true;
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

    server.onNotFound(handleNotFound);

    server.begin();
    Serial.println("HTTP server started");

  }

  delay(1000);



  //  ads.setGain(GAIN_TWOTHIRDS);  // 2/3x gain +/- 6.144V  1 bit = 3mV      0.1875mV (default)
  ads.setGain(GAIN_ONE);        // 1x gain   +/- 4.096V  1 bit = 2mV      0.125mV
  // ads.setGain(GAIN_TWO);        // 2x gain   +/- 2.048V  1 bit = 1mV      0.0625mV
  // ads.setGain(GAIN_FOUR);       // 4x gain   +/- 1.024V  1 bit = 0.5mV    0.03125mV
  // ads.setGain(GAIN_EIGHT);      // 8x gain   +/- 0.512V  1 bit = 0.25mV   0.015625mV
  // ads.setGain(GAIN_SIXTEEN);    // 16x gain  +/- 0.256V  1 bit = 0.125mV  0.0078125mV

  Wire.begin(5, 4);

  ads.setSPS(ADS1115_DR_860SPS);
  ads.startContinuous_SingleEnded(0);

  attachInterrupt(digitalPinToInterrupt(alertPin), continuousAlert, FALLING);
}


void continuousAlert() {
  continuousConversionReady = true;
}

void reportar(float potenciaEficaz) {
  Serial.println("about to fetch");
  http.begin("http://192.168.4.1:3000/sensores/1234/report");
  http.setTimeout(500);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST("{\"currentMedition\":" + String(potenciaEficaz, 1) + ",\"sensibility\":35,\"dispoId\":\"" + dispoId + "\"}");
  http.writeToStream(&Serial);
  http.end();
  if(code == HTTPC_ERROR_CONNECTION_REFUSED) 
    Serial.println("Server offline :(");
  Serial.println("fetched");

}

float calcularValorCorriente() {

  float valorEficaz = 0;
  for (int a = 0; a < sampleCount; a++) {
    valorEficaz += data[a] * data[a] / sampleCount;
  }
  float valor = sqrt(valorEficaz) * 0.94;
  return valor*220 > 1 ? valor : 0;
}

float calcularValorPotencia(float corrienteEficaz) {
  return corrienteEficaz * 220;
}


void actualizarDisplay(float potenciaEficaz, float corrienteEficaz) {
  display.clear();
  display.setFont(ArialMT_Plain_24);
  display.drawString(64, 5, String(potenciaEficaz, 2) + "w");
  display.setFont(ArialMT_Plain_16);
  display.drawString(64, 32, String(corrienteEficaz, 2) + "a");
  display.display();
}


void loop(void)
{
  ArduinoOTA.handle();
  server.handleClient();

  if (!disableMediciones && continuousConversionReady) {
    data[i] = ((float) ads.getLastConversionResults()) * ads.voltsPerBit() * 5; //valor en corriente
    i++;
    continuousConversionReady = false;

    if ((millis() - ant) > sampleCount) {
      float corrienteEficaz = calcularValorCorriente();
      float potenciaEficaz = calcularValorPotencia(corrienteEficaz);
       Serial.println(potenciaEficaz);

      actualizarDisplay(potenciaEficaz, corrienteEficaz);
      i = 0;
      reportar(potenciaEficaz);
      delay(1000);
      ant = millis();
    }
  }
}


