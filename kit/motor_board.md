---
layout: page
title: Motor Board
---

Motor Board
===========

<img src="{{ site.baseurl }}/images/content/kit/mcv4b.png" alt="A phot of an un-cased motor board" title="An un-cased motor board" class="right" />
The Motor Board can be used to control two 12V DC motors. Your kit contains two of these boards to allow you to control up to four motors. These can be used for moving your robot, although don't feel you are limited to using them for this purpose.

The speed and direction of the two outputs are controlled independently through the USB connection. The board also needs power delivered from a 12V port on the Power Board in order to drive the motors.

The motor board uses [pulse-width modulation][wiki-pwm] (PWM) to control the
amount of power that is sent to the motors.

You can control the motors using the [Motor Board API]({{ site.baseurl }}/programming/motors).

[wiki-pwm]: https://en.wikipedia.org/wiki/Pulse-width_modulation

Board Diagram
-------------

![motor board diagram]({{ site.baseurl }}/images/content/kit/mcv4b_board_diagram.png "The Motor Board")

Indicators
----------

| LED                    | Meaning                 | Initial power-up state
|------------------------|-------------------------|------------------------------
| Power                  | Green when powered correctly<br>Red when polarity is wrong for Power In | Green
| M{0,1} Speed/Direction | Brightness indicates speed, colour indicates direction | Off
| M{0,1} Output Status   | Blue indicates more than 50% load (5A)<br>Red indicates a motor driver fault | Off
| USB Power              | The USB interface is powered | On
| USB Data               | Data is being transferred to/from the board | Off

Case Dimensions
---------------

The case measures 70×84×20mm. Don't forget that the cables will stick out.

Specification
-------------

| Parameter                             | Value       |
|---------------------------------------|-------------|
| Nominal input voltage                 | 11.1V ± 15% |
| Absolute maximum input voltage        | 16V         |
| Minimum input voltage                 | 9V          |
| Output voltage                        | 11.1V ± 15% |
| Continuous output current per channel | 10A         |
| Peak output current [^1]              | 20A         |
| Serial connection voltage [^2]        | 3.3–5V      |

[^1]: Can be sustained for 1 second, on a single channel.
[^2]: If the board is controlled solely via the serial connection, this voltage must be supplied via the serial connector. We use the UART serial protocol.

Designs
-------

You can access the schematics and source code of the firmware on the motor board in the following places.
You do not need this information to use the board but it may be of interest to some people.

 * [Full Schematics]({{ site.baseurl }}/resources/kit/motor-schematic.pdf)
 * [Firmware Source](https://github.com/srobo/motor-v4-fw)
 * [Hardware Designs](https://github.com/srobo/motor-v4-hw)
