---
redirect_from:
  - /programming/sr/power
layout: page
title: Power Board API
---

Power Board API
===============

There are a few things that can be done with the power board, namely current and voltage sensing, and beeping.
See the [Power Board](/docs/kit/power_board) hardware page for more details.


[Accessing the Power Board](#access_power_board) {#access_power_board}
-------------------------

The power board can be accessed using the `power_board` property of the `Robot` object.

~~~~~ python
from sr.robot3 import *
robot = Robot()

my_power_board = robot.power_board
~~~~~


[Power Outputs](#outputs) {#outputs}
------------------------------------

Each of the power board's controllable outputs has a constant whose name closely matches the name of the output:

* H0 : `OUT_H0`
* H1 : `OUT_H1`
* L0 : `OUT_L0`
* L1 : `OUT_L1`
* L2 : N/A (Not Controllable - This port is used to power the Brain Board)
* L3 : `OUT_L3`
* 5V : `OUT_FIVE_VOLT`

Both of the 5V outputs are controlled together.

All the ports are turned on when your code starts running, you can then control whether each output is turned on or off like so:

~~~~~ python
# Turn output H0 off
robot.power_board.outputs[OUT_H0].is_enabled = False

# Turn output L0 on
robot.power_board.outputs[OUT_L0].is_enabled = True

# Find out whether L3 is enabled
print(robot.power_board.outputs[OUT_L3].is_enabled)

# Find the current (in Amps) being used by L3
print(robot.power_board.outputs[OUT_L3].current)
~~~~~

You can also control all the outputs together:

~~~~~ python
robot.power_board.outputs.power_off()
robot.power_board.outputs.power_on()
~~~~~

<div class="warning">
If you turn off the power output which is powering another one of your boards,
they will appear to be missing and your code will break if you try to control them.
</div>


[Battery Status](#battery) {#battery}
-------------------------------------

The power board can report both the battery voltage, in Volts, and the current being drawn from it, in Amps.
You can access these values like so:

~~~~~ python
# Print the battery voltage in volts
print(robot.power_board.battery_sensor.voltage)

# Print the battery current in amps
print(robot.power_board.battery_sensor.current)
~~~~~

- A fully charged battery will measure 12.6V.
- The power board will turn off and signal a low battery at 10.2V.
- The discharge curve is roughly linear between 11.4V and 10.4V.


[Beeping](#beeping) {#beeping}
------------------------------

The power board has a piezo buzzer which can beep.

The `buzz` function accepts multiple parameters, depending on what you want to play.
- The first argument is either the note you want to play, or the frequency of the buzzer in Hertz.
- The second argument is the duration of the beep, in seconds.

The `Note` enum provides notes in [scientific pitch notation](https://en.wikipedia.org/wiki/Scientific_pitch_notation) between `C6` and `C8`.
You can play other tones by providing a frequency.

The frequency on the buzzer is limited from 8Hz to 10,000Hz

<div class="info" markdown="1">
  Calling `buzz` is non-blocking, which means it doesn't actually wait for the piezo to stop buzzing before continuing with your code.
  If you want to wait for the buzzing to stop, use the `blocking` argument!
</div>

~~~~~ python
from sr.robot3 import Note

# Beep for 0.5s in D.
R.power_board.piezo.buzz(Note.D6, 0.5)

# Beep for 2s at 400Hz
R.power_board.piezo.buzz(400, 2)

# Beep for 3s at 250Hz and wait for it to finish
R.power_board.piezo.buzz(250, 3, blocking=True)
~~~~~


[Start Button](#start_button) {#start_button}
---------------------------------------------

You can manually wait for the start button to be pressed, not only at the start.

~~~~~ python
robot.wait_start()
~~~~~

This method will block until the start button is pressed.
This may be useful for testing, but be sure to remove it in the competition, as you won't be allowed to touch the start button after a match has begun!
