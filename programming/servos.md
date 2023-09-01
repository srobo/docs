---
layout: page
title: Servos Board API
---

Servos Board API
================

The kit can control multiple servos.
One servo board can control up to 12 servos.
See the [Servo Board](/docs/kit/servo_board) hardware page for more details about this board.


Accessing the Servo Board
-------------------------

The servo board can be accessed using the `servo_board` property of the `Robot` object.

~~~~~ python
from sr.robot3 import *
robot = Robot()

my_servo_board = robot.servo_board
~~~~~


Setting servo positions
-----------------------

Each of the twelve servo outputs can be controlled separately.
The servo outputs are numbered 0-11, see the [Servo Board](/docs/kit/servo_board#connectors) docs for details of which output is which.

This board object has an array containing the servos connected to it, which can be accessed as servos[0], servos[1], servos[2], etc.
The servo board is labelled so you know which servo is which.

The position of servos can range from `-1` to `1` inclusive:

~~~~~ python
# Set servo 0 position to 0.2
robot.servo_board.servos[0].position = 0.2

# Set servo 2 position to -0.55
robot.servo_board.servos[2].position = -0.55
~~~~~

You can read the last value a servo was set to using similar code:

~~~~~ python
# Print the last setting of servo number 1
print(robot.servo_board.servos[1].position)
~~~~~


Disabling servo outputs
-----------------------

Setting a position to `None` will disable an output.
This is the state all the servo outputs are in when the board turns on, where no servo pulses are being sent to the outputs.

~~~~~ python
# disable servo output 5
robot.servo_board.servos[5].position = None
~~~~~


Extended servo range
--------------------

For an RC servo the angle of rotation is determined by the width of an electrical pulse on the control wire.
A typical servo expects to see a pulse every 20ms, with a pulse width between 1ms and 2ms.
Our API will take the position provided (between -1 and 1) and map it to the correct pulse width.

However there is no standard for the width of this pulse and there are differences between manufacturers as to what angle the servo will turn to for a given pulse width.
The API can be used to change what the limits of pulse width are for each servo.
You should experiment and find what the actual limit of your servos are but be careful not drive them past that.

|     Parameter     |  Min value  |  Max value  |
|-------------------|-------------|-------------|
|Pulse width default|1000 &micro;s|2000 &micro;s|
|Pulse width limit  |500 &micro;s |4000 &micro;s|

This code to set the pulse width limits should be done before setting the position of the servo.

~~~~~ python
# set the range of servo output 7 between 500us and 2500us
robot.servo_board.servos[7].set_duty_limits(500, 2500)

# Then move the position of the servo to the upper position
# (pulse width = 2500us)
robot.servo_board.servos[7].position = 1
~~~~~

<div class="warning">
You should be careful about forcing a servo to drive past its end stops as this could damage the internal gears.
</div>
