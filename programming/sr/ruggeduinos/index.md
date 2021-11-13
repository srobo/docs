---
layout: page
title: IO (Ruggeduino)
---

IO (Ruggeduino)
===============

The [Ruggeduino](http://ruggedcircuits.com/html/ruggeduino.html)
provides a total of 18 pins for either digital input or output (labelled 2 to 13 and A0 to A5),
including 6 for analogue input (labelled A0 to A5).

When a single Ruggeduino is connected to your robot, you can control it
using the `ruggeduino` object.

~~~~~ python
R.ruggeduinos.something...
~~~~~

The serial number of each detected Ruggeduino is printed to the log when your robot starts.
It will look something like this:

~~~~~ not-code
sr.robot3.robot INFO - Found Ruggeduino - 752303138333517171B1
~~~~~

If you have more than one Ruggeduino attached, the `ruggeduinos` object
can be used to control a collection of Ruggeduinos. Similar to `motors`
and `servos`, `ruggeduinos` is a dictionary accessed by serial number.
For example, if you had a board whose serial number was "752303138333517171B1",
you could do this instead:

~~~~~ python
R.ruggeduinos["752303138333517171B1"].something...
~~~~~

<div class="warning" markdown="1">
  When you have more than one Ruggeduino board connected to your kit,
  you must use `R.ruggeduinos` and index by serial number. This is so
  that the kit knows which Ruggeduino you want to control.
</div>


[Setting pin modes](#pinmodes) {#pinmodes}
--------------------------------------------------------------------------

To use one of the pins on the Ruggeduino, you must first set whether you want it to behave as an input or as an output.
You can do this with the following code:

~~~~~ python
R.ruggeduino.pins[10].mode = MODE
~~~~~

The possible values for `MODE` are:

`INPUT`
:   set the pin to [input mode](#input)

`OUTPUT`
:   set the pin to [output mode](#output)

`INPUT_PULLUP`
:   set the pin to input mode with a [pull-up resistor](#pullup)

An example of how to use this is below:

~~~~~ python
# set Ruggeduino pin 2 to output
R.ruggeduino.pins[2].mode = OUTPUT
# set Ruggeduino pin 3 to input
R.ruggeduino.pins[3].mode = INPUT
# set Ruggeduino pin 4 to input and enable pull-up resistor
R.ruggeduino.pins[4].mode = INPUT_PULLUP
~~~~~

<div class="warning">You cannot use pins 0 and 1, as using these would disrupt communications between the Ruggeduino and the Power Board.</div>

[Input](#input) {#input}
-------

You can read a **digital** input pin with the following code:

~~~~~ python
# R.ruggeduinos[RUGGEDUINO_BOARD_NUMBER].pins[PIN_NO].digital_read()

# to read Ruggeduino's digital pin 3...
pin0 = R.ruggeduino.pins[3].digital_read()
~~~~~

`pin0` will now contain `True` or `False` depending on whether the pin was high (3.3v) or low (0v), respectively.

You can read an **analogue** input pin with the following code:

~~~~~ python
# R.ruggeduinos[RUGGEDUINO_BOARD_NUMBER].pins[PIN_NO].analogue_read()

# to read Ruggeduino's analogue pin A0...
pin0 = R.ruggeduino.pins[A0].analogue_read()
~~~~~

The analogue pin numbers are available as `A0`, `A1`, `A2`, `A3`, `A4`, and `A5` respectively.


[Output](#output) {#output}
--------

You can only set digital outputs (there's no analogue output, although you may feel free to modify the Ruggeduino's firmware to add the ability to output [PWM](https://wikipedia.org/wiki/Pulse-width_modulation "Pulse-width modulation") if you desire). To set a digital output pin, you would use the following:

~~~~~ python
# R.ruggeduinos[RUGGEDUINO_BOARD_NUMBER].pins[PIN_NO].digital_write(VALUE)

# to set Ruggeduinos pin 2 high:
R.ruggeduino.pins[2].digital_write(True)

# to set Ruggeduino's pin 2 low:
R.ruggeduino.pins[2].digital_write(False)
~~~~~

[Pull-up resistors](#pullup) {#pullup}
----------------------------------------------------------------------

The Ruggeduino possesses the ability to enable a built-in pull-up resistor on any input pin.
This takes a small amount of explanation.

Normally, input pins are not connected to anything - known as "floating".
In this state, they might read high or low, or different values depending on their environment.
This is obviously not good for consistent control.

Many pieces of off-the-shelf electronics that have some form of standard I/O output will connect this pin to 3.3V (high) and 0V (low) when required,
 so this is not a problem. However, for simple electronics, a microswitch for example,
 you would normally be required to connect a resistor between the input pin and 3.3V (a pull-up resistor),
 or between the input pin and 0V (a pull-down resistor) to keep the input in a known state until the switch overrides it by connecting directly to the opposite state.

However, the built-in pull-up resistor alleviates this need.
It essentially wires in a resistor connected to 3.3V, meaning that when this option is enabled, an input pin will "default" to being high.
This means you can simply connect a switch between the input pin and a ground pin without any need of resistors - when the switch is open, the pin will read high; when closed, it will read low.
