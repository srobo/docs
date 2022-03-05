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

If you have more than one Motor Board attached, you need to specify which one you want to control. This is done using the serial number of the board. For example: if you had a board that was detected as "srABC1",
you could do this instead:

~~~~~ python
R.motor_boards["srABC1"].something...
~~~~~

<div class="warning" markdown="1">
  When you have more than one Motor board connected to your kit,
  you must use `R.motor_boards` and index by serial number. This is so
  that the kit knows which Motor Board you want to control.
</div>


Setting motor power
-------------------

Control of your motors is achieved by setting a power output from one of the
channels on your motor boards. Valid values are between -1 and 1 inclusive.
Fractional values (such as 0.42) can be used to specify less than 100% power.
Negative values run the motor in the opposite direction.

The field to change the output power is `power`. As each Motor Board has two
outputs you will need to specify which output you want to control:

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
~~~~~

The motor board will continue to output the requested power until it is told
otherwise or until power to the board is removed (usually when the robot turns
off).

Therefore to stop your motors you must explicitly set the power output to zero:

~~~~~ python
# motor board srXYZ1, channel 0 stopped
R.motor_boards["srXYZ1"].motors[0].power = 0

# Put motor board srABC1, channel 1 at 25% power for 2.5 seconds:
R.motor_boards["srABC1"].motors[1].power = 0.25
time.sleep(2.5)       # wait for 2.5 seconds
R.motor_boards["srABC1"].motors[1].power = 0
~~~~~

Since each output channel can be controlled separately, you can control several
motors at once.

~~~~~ python
# Set one motor to full power in one direction and
# another to full power in the other:
R.motor_boards["srABC1"].motors[0].power = 1
R.motor_boards["srABC1"].motors[1].power = -1

# Wait a while (perhaps for the robot to move)
time.sleep(3)

# Stop both motors
R.motor_boards["srABC1"].motors[0].power = 0
R.motor_boards["srABC1"].motors[1].power = 0
~~~~~

<div class="info" markdown="1">
  You will need to work out for your robot which values (positive or negative)
  result in it moving in each direction. This will depend on how you have
  positioned your motors as well as how they have been wired to the motor board.
</div>

Getting the current motor power
-------------------------------

You can read the current power value for a motor using the same field:

~~~~~ python
# get the current output power of Motor Board srABC1, channel 0
target = R.motor_boards["srABC1"].motors[0].power
~~~~~

Stopping the motors
-------------------

When you set the motor power to 0, this signals the Motor Board to actively stop that motor from turning.

~~~~~ python
# store the motor in a local variable because
# typing it out gets really boring
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
