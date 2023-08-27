---
layout: page
title: Power Board API
---

Power Board API
===============

There are a few things that can be done with the power board, namely current and voltage sensing, and beeping.
As there is only one power board, it is not accessed like a list like `motors` and is instead accessed directly, for example:

~~~~~ python
R.power_board.something...
~~~~~

[Power Outputs](#outputs) {#outputs}
-------

Each of the power board's controllable outputs has a constant whose name closely
 matches the name of the output:

* H0 : `OUT_H0`
* H1 : `OUT_H1`
* L0 : `OUT_L0`
* L1 : `OUT_L1`
* L2 : N/A (Not Controllable)
* L3 : `OUT_L3`
* 5V : `OUT_FIVE_VOLT`

Both of the 5V outputs are controlled simultaneously.

While they are all turned on when your code starts running,
 you can control whether each output is turned on or off like so:

~~~~~ python
from sr.robot3 import *

# Turn output H0 off
R.power_board.outputs[OUT_H0].is_enabled = False

# Turn output L0 on
R.power_board.outputs[OUT_L0].is_enabled = True

# Find out whether L3 is enabled
print(R.power_board.outputs[OUT_L3].is_enabled)

# Find the current (in Amps) being used by L3
print(R.power_board.outputs[OUT_L3].current)
~~~~~

An exception is raised if you try to set an output index which doesn't exist.

You can also control all the outputs together:

~~~~~ python
R.power_board.outputs.power_off()
R.power_board.outputs.power_on()
~~~~~

<div class="warning">
  If you turn off the power output which is powering another of your boards,
  then they will appear to be missing and your code will break if you try to
  control them.
</div>


[Battery Status](#battery) {#battery}
-------

The power board can report both the battery voltage, in Volts, and the current being drawn from it, in Amps.
You can access these values like so:

~~~~~ python
# Print the battery voltage and current to the log
print(
  R.power_board.battery_sensor.voltage,
  R.power_board.battery_sensor.current,
)
~~~~~

A fully charged battery will measure 12.6V.
The power board will turn off and signal a low battery at 10.2V.
The discharge curve is roughly linear between 11.4V and 10.4V.


[Beeping](#beeping) {#beeping}
-------

The power board has a piezo buzzer which can beep.

The `buzz` function accepts multiple parameters, depending on what you
want to play. The first argument is the duration of the beep, in
seconds. The later arguments are either the note you want to play, or
the frequency of the buzzer (in Hertz). You have to specify which of
note or frequency you're passing using a keyword argument, your code
will fail otherwise.

Theoretically, the piezo buzzer will buzz at any provided frequency, however
humans can only hear between [20Hz and 20000Hz][pitch-range].

The `Note` enum provides notes in [scientific pitch notation][pitch-notation]
between `C6` and `C8`. You can play other tones by providing a frequency.

<div class="info" markdown="1">
  Calling `buzz` is non-blocking, which means it doesn't actually wait
  for the piezo to stop buzzing before continuing with your code. If you
  want to wait for the buzzing to stop, use the <code>blocking</code> argument!
</div>

~~~~~ python
from sr.robot3 import Note

# Beep for 0.5s in D.
R.power_board.piezo.buzz(0.5, Note.D6)

# Beep for 2s at 400Hz
R.power_board.piezo.buzz(2, 400)

# Beep for 3s at 250Hz and wait for it to finish
R.power_board.piezo.buzz(3, 250, blocking=True)
~~~~~

`ValueError` is raised if the note is not recognised or the frequency is not an integer.


[pitch-range]: https://en.wikipedia.org/wiki/Hearing_range#Humans
[pitch-notation]: https://en.wikipedia.org/wiki/Scientific_pitch_notation
