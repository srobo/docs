---
layout: page
title: Motors
---

Motors
======

The `motor_board` object is used to control a collection of Motor Boards.

When a single Motor Board is connected to your robot, you can control it
using the `motor_board` object.

~~~~~ python
R.motor_board.something...
~~~~~

The serial number of each detected Motor Board is printed to the log when your robot starts.
It will look something like this:

~~~~~ not-code
sr.robot3.robot INFO - Found Student Robotics Motor Board v4 - srABC1
~~~~~

If you have more than one Motor Board attached, the `motor_boards` object can be used to control a collection of Motor Board. It is a dictionary access via serial number, which is usually written on the board. For example, if you had a board whose serial number was "srABC1",
you could do this instead:

~~~~~ python
R.motor_boards["srABC1"].something...
~~~~~

<div class="warning">
    When you have more than one Motor board connected to your kit,
    you must use `R.motor_boards` and index by serial number. This is so
    that the kit knows which Motor Board you want to control.
</div>


Setting motor power
-------------------

Motor power is controlled using [PWM](https://en.wikipedia.org/wiki/Pulse-width_modulation) with 100% power being a [duty cycle](https://en.wikipedia.org/wiki/Duty_cycle) of 1. You set the power with an integer value between -100 and 100 inclusive (where a negative value puts the motor in reverse). The field to change the output power is `power`. As each Motor Board has two outputs you will need to specify which output you want to control:

~~~~~ python
from sr.robot3 import *
import time

R = Robot()

# motor board srABC1, channel 0 to full power forward
R.motor_boards["srABC1"].motors[0].power = 1

# motor board srXYZ1, channel 0 to full power reverse
R.motor_boards["srXYZ1"].motors[0].power = -1

# motor board srABC1, channel 1 to half power forward
R.motor_boards["srABC1"].motors[1].power = 0.5

# motor board srXYZ1, channel 0 stopped
R.motor_boards["srXYZ1"].motors[0].power = 0

# the following will put motor board srABC1, channel 1 at 25% power (forwards) for 2.5 seconds:
R.motor_boards["srABC1"].motors[1].power = 0.25
time.sleep(2.5)       # wait for 2.5 seconds
R.motor_boards["srABC1"].motors[1].power = 0
~~~~~

You can read the current power value for a motor using the same field:

~~~~~ python
# get the current output power of Motor Board srABC1, channel 0
currentTarget = R.motor_boards["srABC1"].motors[1].power
~~~~~

Stopping the motors
-------------------

When you set the motor power to 0, this signals the Motor Board to actively stop that motor from turning.

~~~~~ python
# store the motor in a local variable because typing it out gets really boring
molly = R.motor_boards["srABC1"].motors[1]

# set the power to 100% for a second, then stop immediately
molly.power = 1
time.sleep(1)
molly.power = 0
~~~~~

However, you may also want to allow the motors to gently coast to a halt.
This can be achieved by using the special `COAST` value.

~~~~~ python
# set the power to 100% for a second, then coast to a stop
molly.power = 1
time.sleep(1)
molly.power = COAST
~~~~~

When the power of the motor is set to `0`, it is equivalent to setting
the power to `BRAKE`.

~~~~~ python
# set the motor to brake
molly.power = BRAKE
~~~~~
