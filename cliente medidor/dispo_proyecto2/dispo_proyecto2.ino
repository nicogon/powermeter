#include <Wire.h>
// #include <ESP32WiFi.h>

#include <HTTPClient.h>

#include <WiFiClient.h>
#include <WebServer.h>
#include <ESPmDNS.h>
#include <Bridge.h>
// include library to read and write from flash memory
#include "SPIFFS.h"

File file;


// HttpClient client;

HTTPClient http;


int calibracion;

//#include "SSD1306.h" // alias for `#include "SSD1306Wire.h"'

#include <Adafruit_ADS1015.h>
#include "SSD1306.h"
SSD1306  display(0x3c, 5, 4);

WebServer server(80);

Adafruit_ADS1115 ads;     // Use this for the 16-bit version

const int alertPin = 13;

int sensibility;

const int buttonPin = 15;

int contadorMedicion = 0;


bool disableMediciones = false;
volatile bool continuousConversionReady = false;
const char* ssid     = "powermeter";
const char* password = "powermeter";
long ant;
int i = 0;
int rec = 0; int f;
float data[2001];


//tomo 200 mediciones q son como 1/4 de segundo
int sampleCount = 1500;

float anterior = 0;


String dispoId = "1234";

void handleRoot() {
  server.send(200, "It's alive");
}


void handleCalibracion() {
  String factor = server.arg(0);
  guardar("calibracion", factor.toInt());
  calibracion = factor.toInt();
  server.send(200, "text/plain", "Recibi:" + factor);
}

void handleId() {
  dispoId = server.arg(0);
  guardar("id", dispoId.toInt());
  server.send(200, "text/plain", "Recibi Id:" + dispoId);
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



void guardar(String archivo, int valor) {
  File file = SPIFFS.open("/" + archivo + ".txt", "w");
  if (!file) {
    Serial.println("file creation failed");
  } else {
    file.println(String(valor));
    file.flush();
  }
  file.close();
}

int  leer(String archivo) {
  file = SPIFFS.open("/" + archivo + ".txt", "r");
  if (!file) {
    Serial.println("no existe el archivo que queres abrir");
    file.close();
    return 30;
  } else {
    String temp = file.readStringUntil('\n');
    file.close();
    return temp == "\r" ? 99 : temp.toInt(); //aca porque archivo vacio devuelve \r
  }
}


void IRAM_ATTR continuousAlert() {
  continuousConversionReady = true;
}

void setup(void)
{
  pinMode(alertPin, INPUT);
  pinMode(buttonPin, INPUT);
  Serial.begin(115200);
  // Initialize SPIFFS
  if (!SPIFFS.begin(true)) {
    Serial.println("An Error has occurred while mounting SPIFFS");
    return;
  }

  sensibility = leer("sensor");
  calibracion = leer("calibracion");
  dispoId = String(leer("id"));
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
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

    server.on("/", handleRoot);
    server.on("/id", handleId);
    server.on("/calibracion", handleCalibracion);
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




void reportar(float potenciaEficaz) {
  Serial.println("about to fetch");
  http.begin("http://192.168.4.1/sensores/"+dispoId+"/report");
  http.setTimeout(500);
  http.addHeader("Content-Type", "application/json");
  int code = http.POST("{\"currentMedition\":" + String(potenciaEficaz, 1) + ",\"sensibility\":" + sensibility + ",\"dispoId\":\"" + dispoId + "\"}");
  http.writeToStream(&Serial);
  http.end();
  if (code == HTTPC_ERROR_CONNECTION_REFUSED)
    Serial.println("Server offline :(");
  Serial.println("fetched");

}

float calcularValorCorriente() {

  float valorEficaz = 0;
  for (int a = 0; a < sampleCount; a++) {
    valorEficaz += data[a] * data[a] / sampleCount;
  }
  float valor = sqrt(valorEficaz);
  return valor * 220 > (sensibility / 5) ? valor : 0;
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


void handleButton(void) {
  if (!digitalRead(buttonPin)) {
    Serial.println("click");
    if (leer("sensor") == 30) {
      sensibility = 5;
    } else {
      sensibility = 30;
    }
    guardar("sensor", sensibility);
    delay(100);
    display.clear();
    display.drawString(64, 10, "Sensor " + String(sensibility) + "A");
    display.setFont(ArialMT_Plain_24);
    display.display();
    while (!digitalRead(buttonPin)) {}
    delay(100);
  }

}

void loop(void)
{
  server.handleClient();
  handleButton();

  if (!disableMediciones && continuousConversionReady) {
    data[i % sampleCount] = ((float) ads.getLastConversionResults()) * ads.voltsPerBit() * sensibility * calibracion / 100; // * 0.90; //valor en corriente
    i++;
    continuousConversionReady = false;

    if ((millis() - ant) > sampleCount) {
      float corrienteEficaz = calcularValorCorriente();

      float band = 0.10;
      if (corrienteEficaz > ((1 - band)*anterior) && corrienteEficaz < ((1 + band)*anterior)) {
        corrienteEficaz = (anterior + corrienteEficaz) / 2;
      }
      anterior = corrienteEficaz;

      float potenciaEficaz = calcularValorPotencia(corrienteEficaz);
      Serial.println(potenciaEficaz);

      actualizarDisplay(potenciaEficaz, corrienteEficaz);
      i = 0;


      if (contadorMedicion == 2) {
        reportar(potenciaEficaz);
      } else {
        contadorMedicion++;
      }

      //delay(500);
      ant = millis();
    }
  }
}


