---
layout: page
title: Ruggeduino
---

# Ruggeduino

The Ruggeduino board allows you to connect the SR kit to your own electronics.
This board is very similar to an Arduino which you may have used before.

It has 14 digital I/O pins, these pins can either input or output a digital signal.
5V logic is used to interface with the Ruggeduino.

The board also has 6 analogue input pins, these pins can read an analogue signal from 0 to 5V.
The board has a 3.3V pin, a 5V pin and three 0V/ground pins which can be used to power external devices.
If for whatever reason the board does not seem to be working pressing the reset button will reset the Ruggeduino and may solve the problem.

The Ruggeduino needs only to be connected to the kit over USB as it uses this for both power and communication.

## Board Diagram

![Ruggeduino diagram](/images/content/kit/ruggeduino_diagram.png "The Ruggeduino")

## Indicators

| LED       | Meaning                           | Initial power-up state
|-----------|-----------------------------------|----------------------
| Power     | The board is powered              | On
| Data      | The board is transferring data    | Flashing
| Pin 13    | Pin 13 is outputting 5V           | Off

## Case Dimensions

The case alone measures 86✕68✕23mm(L✕W✕H) without the extra pin headers.
When the Ruggeduino is fitted the whole unit measures 86✕84✕29mm; some screw heads may protrude from the bottom of the case by up to 2mm.
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

* [Schematic](http://ruggedcircuits.com/AM010/am010.pdf)
* [Manufacturer's documentation](http://ruggedcircuits.com/html/ruggeduino.html)
