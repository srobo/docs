---
layout: page
title: Servos
---

Servos
======

<div class="info">
This documentation refers to a feature which is only available on the physical robot kits.
</div>

The `servo_board` object is used to control a collection of Servo Boards.

When a single Servo Board is connected to your robot, you can control it
using the `servo_board` object.

~~~~~ python
R.servo_board.something...
~~~~~

The serial number of each detected Servo Board is printed to the log when your robot starts.
It will look something like this:

~~~~~ not-code
sr.robot3.robot INFO - Found Student Robotics Servo Board v4 - srABC1
~~~~~

If you have more than one Servo Board attached, you need to specify which one you want to control. This is done using the serial number of the board. For example: if you had a board that was labelled "srABC1",

~~~~~ python
R.servo_boards["srABC1"].something...
~~~~~

<div class="warning" markdown="1">
  When you have more than one servo board connected to your kit,
  you must use `R.servo_boards` and index by serial number. This is so
  that the kit knows which servo board you want to control.
</div>

Setting servo positions
-----------------------

Each of the twelve servo outputs can be controlled separately. The servo outputs
are numbered 0-11, see the [Servo Board](/docs/kit/servo_board#connectors) docs
for details of which output is which.

The position of servos can range from `-1` to `1` inclusive:

~~~~~ python
# R.servo_board.servos[SERVO_NUMBER].position = POS

# set servo 1's position to 0.2
R.servo_board.servos[1].position = 0.2

# Set servo 2's position (on the Servo Board with serial number srABC) to -0.55
R.servo_boards["srABC"].servos[2].position = -0.55
~~~~~

You can read the last value a servo was set to using similar code:

~~~~~ python
# get the last setting of the second servo on the first Servo Board
last_setting = R.servo_board.servos[1].position
~~~~~

<div class="info" markdown="1">
While it is possible to retrieve the last position a servo was set to,
this does not guarantee that the servo is currently in that position.
</div>

[How the set position relates to the servo angle](#ServoAngle) {#ServoAngle}
-----------------------------------------------

<div class="warning">
You should be careful about forcing a servo to drive past its end stops.
Some servos are very strong and it could damage the internal gears.
</div>

The angle of an RC servo is controlled by the width of a pulse supplied to it periodically.
There is no standard for the width of this pulse and there are differences between manufacturers as to what angle the servo will turn to for a given pulse width.
To be able to handle the widest range of all servos our hardware outputs a very wide range of pulse widths which in some cases will force the servo to try and turn past its internal end-stops.
You should experiment and find what the actual limit of your servos are (it almost certainly won't be -1 and 1) and not drive them past that.
