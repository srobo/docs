---
layout: page
title: Servo Board
---

Servo Board
===========

<a href="{{ site.baseurl }}/images/content/kit/sbv4.png">
	<img src="{{ site.baseurl }}/images/content/kit/sbv4.png" alt="A photo of a servo board" title="The Servo Board, click to view larger" width="250px" class="right" />
</a>
The Servo Board can be used to control up to 12 RC servos.
Many devices are available that can be controlled as servos, such as RC motor speed controllers, and these can also be used with the board.

Board Diagram
-------------
<img src="{{ site.baseurl }}/images/content/kit/servo_board_v4_diagram.png" alt="A diagram of a servo board" />

Indicators
----------

| LED                   | Meaning                                                                                          | Initial power-up state |
| --------------------- | ------------------------------------------------------------------------------------------------ | ---------------------- |
| Power <!-- DS1 -->    | The board is powered over USB.                                                                   | On                     |
| 5.5V On <!-- DS15 --> | There is 5.5V power on the board. This usually indicates that the 12V connector rail is powered. | Off                    |
| Aux On <!-- DS16 -->  | There is auxiliary power on the board.                                                           | On                     |
| STATUS\|ERROR <!-- DS10 --> | Blue when the board has successfully booted<br />Solid pink if an error has occurred (often 12V power being lost) | Blue |

Connectors
----------

There are 8 servo connections on the left-side of the board (numbers 0-7), and 4 on the right (numbers 8-11).
See the labels on the board (also visible in the photo above) for how these numbers map to the outputs.

Servo cables are connected vertically, with 0V (the black or brown wire) at the bottom of the board.

For the servo board to operate correctly, you must connect it to the 12V power
rail from the power board. A green LED will light next to the servo board 12V
connector when it is correctly powered.

Case Dimensions
---------------

The case measures 68×68×21mm. Don't forget that the cables will stick out.

Servo Control
-------------

Control of servos is often referred to as using
<a href="https://en.wikipedia.org/wiki/Pulse-width_modulation">pulse-width modulation (<abbr title="Pulse-width_modulation">PWM</abbr>)</a>
and while that is a useful way to convey the general idea it is unfortunately
not a technically precise description of either how the control protocol
operates nor how the Servo Board implements the control.

Instead RC servos typically to react to the duration of the pulse sent to them
and essentially ignore the gaps between the pulses. However this is not
universally the case and some servos do care about the time between pulses as
well.

The Servo Board is able to precisely control the duration of the pulses sent to
servos (based on the values you configure using the Python API), within the
ranges in the table below.

Conversely the time between pulses sent to a given servo is allowed a much wider
variation and in fact can vary even when that servo is not changing position.
For example this can happen if another servo's position changes from being a
longer pulse than the first to a shorter pulse. The range of possible gaps
quoted below represents the worst possible case that a servo may experience.

Specification
-------------

|  Parameter                               |   Value   |
|------------------------------------------|-----------|
| Number of servo channels                 | 12        |
| Nominal input voltage                    | 11.1V ± 15% |
| Output voltage                           | 5.5V      |
| Maximum total output current [^1]        | 10A       |
| Pulse range                              | 1ms — 2ms |
| Pulse precision                          | 5µs       |
| Min time between pulses                  | 16.075ms (62.208Hz) |
| Max time between pulses                  | 18.575ms (53.836Hz) |

[^1]: If the auxiliary input is connected, outputs 8-11 have an independent maximum current.

Designs
-------

You can access the schematics and source code of the firmware on the servo board in the following places.
You do not need this information to use the board but it may be of interest to some people.

* [Full Schematics]({{ site.baseurl }}/resources/kit/servo-schematic.pdf)
* [Firmware source](https://github.com/srobo/servo-v4-fw)
* [Hardware designs](https://github.com/srobo/servo-v4-hw)
