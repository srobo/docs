---
layout: page
title: Power
---

Power
=====

There are a few things that can be done with the power board, namely current and voltage sensing, and beeping.
As there is only one power board, it is not accessed like a list like `motors` for example:

~~~~~ .python
R.power.something...
~~~~~

[Battery Status](#battery) {#battery}
-------

The power board can report both the battery voltage, in Volts, and the current being drawn from it, in Amps.
You can access these values like so:

~~~~~ .python
# Print the battery voltage and current to the log
print R.power.battery.voltage, R.power.battery.current
~~~~~

A fully charged battery will measure 12.6V.
The power board will turn off and signal a low battery at 10.2V.
The discharge curve is roughly linear between 11.4V and 10.4V.


[Power Outputs](#outputs) {#outputs}
-------

The power board has six power outputs, numbered `0` to `5`.
These map to the outputs labelled on the board as follows:

* `0` : H0
* `1` : H1
* `2` : L0
* `3` : L1
* `4` : L2
* `5` : L3

While they are all turned on when your code starts running,
 you can control whether each output is turned on or off like so:

~~~~~ .python
# Turn output H0 off
R.power.output[0] = False

# Turn output L0 on
R.power.output[2] = True
~~~~~

An exception is raised if you try to set an output index which doesn't exist.


[Beeping](#beeping) {#beeping}
-------

The power board has a piezo buzzer which can beep.

The beep function accepts 1 or 2 parameters, `duration` is compulsory and is measured in milliseconds. `note` is optional, but must be one string of `a-g` or `uc`. `frequency` is also optional, and should be an integer. One of `note` and `frequency`, must be given. If both are given, `note` is used.

~~~~~ .python
# Beep for 0.5s in D.
R.power.beep(500, note='d')

# Beep for 2s at 400Hz
R.power.beep(2000, frequency=400)
~~~~~

`ValueError` is raised if the note is not recognised or the frequency is not an integer.
