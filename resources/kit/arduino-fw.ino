#include <Arduino.h>

// We communicate with the Arduino at 115200 baud.
#define SERIAL_BAUD 115200

#define FW_VER 2

void setup() {
  Serial.begin(SERIAL_BAUD);
}

int read_pin() {
  // Convert the ASCII character to a pin number.
  // a -> 0, b -> 1, c -> 2, etc.
  while (!Serial.available());
  int pin = Serial.read();
  return (int)(pin - 'a');
}

void command_read() {
  int pin = read_pin();
  // Read from the expected pin.
  int level = digitalRead(pin);
  // Send back the result indicator.
  if (level == HIGH) {
    Serial.write('h');
  } else {
    Serial.write('l');
  }
}

void command_analog_read() {
  int pin = read_pin();
  int value = analogRead(pin);
  Serial.print(value);
}

void command_write(int level) {
  int pin = read_pin();
  digitalWrite(pin, level);
}

void command_mode(int mode) {
  int pin = read_pin();
  pinMode(pin, mode);
}

void command_ultrasound() {
  int pulse = read_pin();
  int echo = read_pin();

  // config pins to correct modes
  pinMode(pulse, OUTPUT);
  pinMode(echo, INPUT);

  // provide pulse to trigger reading
  digitalWrite(pulse, LOW);
  delayMicroseconds(2);
  digitalWrite(pulse, HIGH);
  delayMicroseconds(5);
  digitalWrite(pulse, LOW);

  // measure the echo time on the echo pin
  int duration = pulseIn(echo, HIGH, 60000);
  Serial.print(microsecondsToMm(duration));
}

long microsecondsToMm(long microseconds) {
  // The speed of sound is 340 m/s or 29 microseconds per centimeter.
  // The ping travels out and back, so to find the distance we need half
  // 10 x (us / 29 / 2)
  return (5 * microseconds / 29);
}

void loop() {
  // Fetch all commands that are in the buffer
  while (Serial.available()) {
    int selected_command = Serial.read();
    // Do something different based on what we got:
    switch (selected_command) {
      case 'a':
        command_analog_read();
        break;
      case 'r':
        command_read();
        break;
      case 'l':
        command_write(LOW);
        break;
      case 'h':
        command_write(HIGH);
        break;
      case 'i':
        command_mode(INPUT);
        break;
      case 'o':
        command_mode(OUTPUT);
        break;
      case 'p':
        command_mode(INPUT_PULLUP);
        break;
      case 'u':
        command_ultrasound();
        break;
      case 'v':
        Serial.print("SRcustom:");
        Serial.print(FW_VER);
        break;
      default:
        // A problem here: we do not know how to handle the command!
        // Just ignore this for now.
        break;
    }
    Serial.print("\n");
  }
}
