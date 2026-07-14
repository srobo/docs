---
layout: page
title: Robots 101 - Motors
---

# Robots 101 - Motors

Your robot will need to be able to move to score points. There are many different ways of doing this, but motors are the way to do it. Motors are controlled using the [motor board]({{ site.baseurl }}/kit/motor_board). Each motor board can control up to 2 motors.

The motor board gives you two axis of control. Not only can you control the speed the motor turns, but also the direction.

## Preparation

To start using your motor board, you'll need to [connect]({{ site.baseurl }}/tutorials/assembly) it to your robot.

When testing your motors, it's best to put your robot on the floor, or raise it above the table, to ensure it doesn't drive off and damage itself or something else.

Your code will need to initialise a `Robot` object, which allows you to control the connected motor boards:

~~~~~ python
from sr.robot3 import Robot

robot = Robot()
~~~~~

In this tutorial, we'll assume your robot has 2 drive motors, one on each side.

## Driving forwards

For your robot to drive forwards, both motors need to turn the same direction.

~~~~~ python
from sr.robot3 import Robot

robot = Robot()

robot.motor_board.motors[0].power = 0.5
robot.motor_board.motors[1].power = 0.5

# Drive for 10 seconds.
robot.sleep(10)
~~~~~

The above code will set both motors (`0` and `1`) to half speed forwards (`0.5`). If you run this code, your robot should drive forwards. If you want your robot to move faster or slower, just increase or decrease the speed.

<div class="info">
If your motors turn in opposite directions, it's often easier to swap the wires rather than adjusting your code.
</div>

When the robot runs out of code to run, the program terminates, and all motors and other components turn off. At the end of the program is `robot.sleep(10)`, which lets the program keep running for 10 seconds. For your actual program, your robot will likely have more to do after it moves.

### LEDs

As your motors are turning, you may notice some LEDs lighting up next to the outputs. The LEDs will light up either red or blue based on the direction the robot.

### Inaccuracies

Even though both your motors are turning at the same speed, your robot may not drive in a perfectly straight line. This is expected, and is usually down to manufacturing tolerances in the motors or wheels themselves.

To account for this, you'll need to change your code slightly. If one motor spins slower, give it a little more power:

~~~~~ python
MOTOR_0_MULTIPLIER = 1
MOTOR_1_MULTIPLIER = 0.9

robot.motor_board.motors[0].power = 0.5 * MOTOR_0_MULTIPLIER
robot.motor_board.motors[1].power = 0.5 * MOTOR_1_MULTIPLIER
~~~~~

If motor `1` spins faster than motor `0`, slow it down. The above code uses a multiplier to slow motor `1` down to 90% of the intended power. By tuning the multiplier correctly, you only need to think "move forward at half speed", and the multipliers handle the rest:

~~~~~ python
def drive_straight(speed):
  robot.motor_board.motors[0].power = speed * MOTOR_0_MULTIPLIER
  robot.motor_board.motors[1].power = speed * MOTOR_1_MULTIPLIER


drive_straight(0.5)
robot.sleep(1)
drive_straight(0)
~~~~~

Here, the `drive_straight` function can be used to drive your robot in a straight line. Your robot will drive forwards at half speed for 1 second, then stop. Setting your motor powers to `0` will stop your robot.

### Driving backwards

Your robot can drive backwards by both motors turning in reverse. Motors can spin backwards by setting them to a negative power:

~~~~~ python
robot.motor_board.motors[0].power = -0.5 * MOTOR_0_MULTIPLIER
robot.motor_board.motors[1].power = -0.5 * MOTOR_1_MULTIPLIER
~~~~~

The above code sets both motors to half speed backwards (`-0.5`), taking into account the multipliers.

## Turning

For your robot to turn, each motor needs to turn in a different direction.

If the left wheel drives forwards, and the right wheel drives backwards, your robot will turn clockwise about its centre.

~~~~~ python
robot.motor_board.motors[0].power = 0.5 * MOTOR_0_MULTIPLIER
robot.motor_board.motors[1].power = -0.5 * MOTOR_1_MULTIPLIER
~~~~~

If the left wheel drives forwards, and the right wheel remains stationary, your robot will turn about the right wheel.

~~~~~ python
robot.motor_board.motors[0].power = 0.5 * MOTOR_0_MULTIPLIER
robot.motor_board.motors[1].power = 0
~~~~~
