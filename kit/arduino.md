---
redirect_from:
  - /kit/ruggeduino
layout: page
title: Arduino
---

Arduino
=======

The Arduino board allows you to connect the SR kit to your own electronics.
For the SR kit we use a special Arduino called a Ruggeduino.
This board acts the same as an Arduino Uno but comes with extra protection to stop it from being damaged.

We also provide some screw terminal headers that convert the pin headers on the Arduino into screw terminals.
This makes for easier connection of wires to the Arduino.

The Arduino only needs to be connected to the kit over USB as it uses this for both power and communication.

## Board Diagram

![Ruggeduino diagram]({{ site.baseurl }}/images/content/kit/ruggeduino_diagram.png "The Ruggeduino")

## Digital Pins

The Arduino has 14 digital I/O pins, these pins can either input or output a digital signal.
These pins operate at a 5V logic level, so any signals connected need to be 5V.

## Analog Pins

The board has 6 analog input pins, these pins can read an analog signal from 0 to 5V.
These pins also support the standard digital functions.

## Power Pins

The board has a 3.3V pin, a 5V pin and three 0V/ground pins which can be used to power external devices.
The power available on these pins is limited when compared to the power board, so only connect low power devices (sensors, LEDs, buttons).

## Indicators

| LED       | Meaning                           | Initial power-up state
|-----------|-----------------------------------|----------------------
| Power     | The board is powered              | On
| Data      | The board is transferring data    | Flashing
| Pin 13    | Pin 13 is outputting 5V           | Off

## Case Dimensions

The case alone measures 86✕68✕23mm(L✕W✕H) without the extra pin headers.
When the Ruggeduino is fitted with the screw terminal headers the whole unit measures 86✕84✕29mm; some screw heads may protrude from the bottom of the case by up to 2mm.
Don’t forget that the cables will also stick out.

## Specification

| Parameter                         | Value
|-----------------------------------|-------------
| Power Output Voltage              | 5V or 3.3V
| Maximum 5V Output Current         | 500mA
| Maximum 3.3V Output Current       | 350mA
| Maximum Current Per Output        | 30mA
| Output High Voltage               | 5V
| Output Low Voltage                | 0V
| Maximum Input Voltage             | 24V
| Maximum Measurable Input Voltage  | 5V
| Input Digital Threshold Voltage   | 2.5V

## Considerations

As protection the Ruggeduino has a 220ohm resistor connected to each of its pins.
This will need to be considered when attaching external components.
For example: Normally a current limiting resistor is needed in series with a standard LED,
when using the Ruggeduino to drive the LED a current limiting resistor is not required.

## Design

* [Schematic](https://web.archive.org/web/20140210003143/http://ruggedcircuits.com/AM010/am010.pdf)
* [Manufacturer's documentation](https://web.archive.org/web/20170317171649/https://www.rugged-circuits.com/ruggeduino)
