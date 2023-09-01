---
layout: page
title: Motor Board API
---

Motor Board API
===============

The kit can control multiple motors simultaneously.
Each Motor Board can control two motors.
See the [Motor Board](/docs/kit/motor_board) hardware page for more details.


Accessing the Motor Board
-------------------------

If there is exactly one Motor Board connected to your robot, it can be accessed using the `motor_board` property of the `Robot` object.

~~~~~ python
from sr.robot3 import *
robot = Robot()

my_motor_board = robot.motor_board
~~~~~

If you have more than one Motor Board attached, you need to specify which one you want to control.
This is done using the serial number of the board.

The serial number is physically written on each board and the serial of any connected board will be printed to your log when the robot starts.
It will look something like this:

~~~~~ not-code
sr.robot3.robot - INFO - Found MotorBoard, serial: srABC1
~~~~~

You can then access the boards like this:

~~~~~ python
from sr.robot3 import *
robot = Robot()

my_motor_board = robot.motor_boards["srABC1"]
my_other_motor_board = robot.motor_boards["srXYZ1"]
~~~~~

<div class="warning" markdown="1">
  When you have more than one Motor Board connected to your kit, you can't use `robot.motor_board`.
  This is because the kit needs to know which Motor Board you want to control.
</div>


Setting motor power
-------------------

Control of your motors is achieved by setting a power output from one of the channels on your Motor Boards.
Valid values are between -1 and 1 inclusive.
Fractional values (such as 0.42) can be used to specify less than 100% power.
Negative values run the motor in the opposite direction.

The field to change the output power is `power`. As each Motor Board has two
outputs you will need to specify which output you want to control:

~~~~~ python
# motor board srABC1, channel 0 to full power forward
robot.motor_boards["srABC1"].motors[0].power = 1

# motor board srXYZ1, channel 0 to full power reverse
robot.motor_boards["srXYZ1"].motors[0].power = -1

# motor board srABC1, channel 1 to half power forward
robot.motor_boards["srABC1"].motors[1].power = 0.5
~~~~~

The Motor Board will continue to output the requested power until it is told
otherwise or until power to the board is removed (usually when your code ends and the robot turns
off).

Therefore to stop your motors you must explicitly set the power output to zero:

~~~~~ python
# Put motor board srABC1, channel 1 at 25% power for 2.5 seconds:
robot.motor_boards["srABC1"].motors[1].power = 0.25
time.sleep(2.5)       # wait for 2.5 seconds
robot.motor_boards["srABC1"].motors[1].power = 0
~~~~~

Since each output channel can be controlled separately, you can control several
motors at once.

~~~~~ python
# Set one motor to full power in one direction and
# another to full power in the other:
robot.motor_boards["srABC1"].motors[0].power = 1
robot.motor_boards["srABC1"].motors[1].power = -1

# Wait a while for the robot to move
time.sleep(3)

# Stop both motors
robot.motor_boards["srABC1"].motors[0].power = 0
robot.motor_boards["srABC1"].motors[1].power = 0
~~~~~

<div class="info" markdown="1">
  You will need to work out for your robot which values (positive or negative) result in it moving in each direction.
  If you want to swap the direction of a motor you can swap the wires connecting the motor to the Motor Board.
</div>


Getting the current motor power
-------------------------------

You can read the current power value for a motor using the same field:

~~~~~ python
# Print the output power of Motor Board srABC1, channel 0
print(robot.motor_boards["srABC1"].motors[0].power)
~~~~~


Special Values
--------------

In addition to the numeric values, there are two special constants that can be used:
- `BRAKE`
- `COAST`

`BRAKE` will stop the motors from turning, and thus stop your robot as quick as possible.

<div class="info" markdown="1">
  `BRAKE` does the same thing as setting the power to `0`.
</div>

~~~~~ python
# Stop the motor as quick as possible
robot.motor_boards["srABC1"].motors[0].power = BRAKE
~~~~~

`COAST` will stop applying power to the motors.
This will mean they continue moving under the momentum they had before and slowly come to a stop.

~~~~~ python
# Slowly coast to a stop
robot.motor_boards["srABC1"].motors[0].power = COAST
~~~~~


Motor currents
--------------

The Motor Board can also measure the current being drawn by each of the ports on the board.
This value is measured in amps.

~~~~~ python
# Print the current in amps of motor 0 on board srABC1
print(robot.motor_boards["srABC1"].motors[0].current)
~~~~~
