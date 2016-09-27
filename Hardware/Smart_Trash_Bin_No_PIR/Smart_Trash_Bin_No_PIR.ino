
#include "Adafruit_FONA.h"
#include <SoftwareSerial.h>

#define FONA_RX 2
#define FONA_TX 3
#define FONA_RST 4
#define Trigger 9
#define Echo 10

SoftwareSerial fonaSS = SoftwareSerial(FONA_TX, FONA_RX);
SoftwareSerial *fonaSerial = &fonaSS;

// Fona instance
Adafruit_FONA fona = Adafruit_FONA(FONA_RST);
uint8_t type;

void setup() {
  // put your setup code here, to run once:

 
  while (!Serial);
  Serial.begin(115200);
  Serial.println(F("FONA basic test"));
  Serial.println(F("Initializing....(May take 3 seconds)"));

  fonaSerial->begin(4800);
  if (! fona.begin(*fonaSerial)) {
    Serial.println(F("Couldn't find FONA"));
    while (1);

  }

   type = fona.type();
  Serial.println(F("FONA is OK"));
  Serial.print(F("Found "));
  switch (type) {
    case FONA800L:
      Serial.println(F("FONA 800L")); break;
    case FONA800H:
      Serial.println(F("FONA 800H")); break;
    case FONA808_V1:
      Serial.println(F("FONA 808 (v1)")); break;
    case FONA808_V2:
      Serial.println(F("FONA 808 (v2)")); break;
    case FONA3G_A:
      Serial.println(F("FONA 3G (American)")); break;
    case FONA3G_E:
      Serial.println(F("FONA 3G (European)")); break;
    default: 
      Serial.println(F("???")); break;
  }

  // Print module IMEI number.
  char imei[15] = {0}; // MUST use a 16 character buffer for IMEI!
  uint8_t imeiLen = fona.getIMEI(imei);
  if (imeiLen > 0) {
    Serial.print("Module IMEI: "); Serial.println(imei);
  }


//Setup GPRS settings
//fona.setGPRSNetworkSettings(F("internet"));
fona.setGPRSNetworkSettings(F("internet.eplus.de"), F("eplus"), F("gprs"));

  
  Serial.println("Warte auf Stabilisierung des Mobilfunksignals");
  delay(10000); //Wait for cellular signal to stabalize

 // turn GPRS on
 Serial.println();
  Serial.println("Stelle Internetverbindung her");
        if (!fona.enableGPRS(true))
          Serial.println(F("Failed to turn on"));
      }

void loop() {


pinMode(Trigger, OUTPUT);
pinMode(Echo, INPUT);

    digitalWrite(Trigger, LOW);
    digitalWrite(Trigger, HIGH);

    Serial.println();
    Serial.println("Messe...");

  int Dauer, Abstand;

  Dauer = pulseIn(Echo, HIGH);
  Abstand = (Dauer / 2) / 29.1;

  if(Abstand > 0) {
    
    Serial.print(Abstand);
    Serial.println(" cm");
    
  delay(2000);

    Serial.println();
    Serial.println("Sende Daten...");
  
     // Post data to website
        uint16_t statuscode;
        int16_t length;

        char url[80]= "giv-project7.uni-muenster.de:5000/api/trash_bins/2/measurements";
            char data[100];
           sprintf(data,"{\"measured_distance\": %d}", Abstand);
           Serial.println(data);

        if (!fona.HTTP_POST_start(url, F("application/json"), (uint8_t *) data, strlen(data), &statuscode, (uint16_t *)&length)) {
          Serial.println("Failed!");
        
        }
        while (length > 0) {
          while (fona.available()) {
            char c = fona.read();

#if defined(__AVR_ATmega328P__) || defined(__AVR_ATmega168__)
            loop_until_bit_is_set(UCSR0A, UDRE0); /* Wait until data register empty. */
            UDR0 = c;
#else
            Serial.write(c);
#endif

            length--;
            if (! length) break;
          }
        }
        fona.HTTP_POST_end();

     }

else {
}

delay(5000);
    }
