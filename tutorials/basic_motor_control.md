---
layout: page
title: Basic Motor Control
---

# Basic Motor Control

The aim of this tutorial is to get a motor turning with your kit.
To complete this tutorial, you'll need the following:

* The [Power Board](/docs/kit/power_board)
* A battery (charged, of course)
* A [Motor Board](/docs/kit/motor_board)
* 2 large (7.5mm) green _CamCon_ connectors to connect power between the Power Board and Motor Board
* 2 lengths of thicker gauge wire for powering the Motor Board from the Power Board (one should be black)
* A motor (see specification below)
* A small (5mm) green _CamCon_ connector to plug the motor into the Motor Board
* 2 lengths of a suitable gauge of wire for your motor
* 2 Micro USB cables
* A USB hub
* A USB A to B cable (used to connect to the USB hub to the brain)
* The memory stick
* A soldering Iron
* Some solder wire
* Wire strippers
* A small slotted/flat blade screwdriver (for the _CamCon_ screws)

You should be familiar with the setup for most of the above now, so it's just the motor-related parts that need explaining.
If you need help assembling the rest of the kit please look at the [guide]({{ site.baseurl }}/tutorials/assembly) on assembling the kit


## Motor Specification

There is a certain specification the motor(s) you use must meet.
The criteria are as follows:

* 12V motor
* A stall current of less than 10A (this is the current limit for the [Motor Boards](/docs/kit/motor_board))

<div class="info">
When designing your robot you should bear in mind that while each Motor Board can deliver 10A on each output, all the power needs to go through the Power Board, which is limited to a combined total of 30A.
This means that across all the outputs for all the motors (as well as the rest of your kit), you can only draw up to 30A at any time.
</div>


## Connecting a Motor

To plug the motor into the kit, you'll need to solder an appropriate gauge of wire to the terminals on the motor, and connect the other ends to the _CamCon_ connector.
Like so:

![Motor connected to CamCon]({{ site.baseurl }}/images/content/kit/motor_and_camcon.png)

<div class="info">
You may want to insulate the motor's terminals with some insulation tape (or heat shrink tubing if you've got it) like in the image above.
</div>

Now you need to connect the motor to one of your Motor Boards.
You'll need to connect the following:

* Your motor plugged into the motor 0 socket on the Motor Board
* The micro USB cable from the Motor Board to the USB hub
* The USB A to B cable from the USB hub to the Brain Board

This is almost ready, but the Motor Board also needs the power that it will be delivering to the motor.
This is done by connecting together the two larger _CamCon_ connectors, using the other two lengths of wire.
Be sure that the cable connects the positive output ("+") of the Power Board to the positive power input of the Motor Board, and likewise for the ground ("-") output &mdash;
see the [Power Board](/docs/kit/power_board) and [Motor Board](/docs/kit/motor_board) documentation to see which is which.

<div class="info">
You must always use black for ground (0V) connections (and only for these), so that it's clear which these are.
</div>

You can now connect this into the Power Board on one end, and the Motor Board power connection on the other.


## Some Code

<div class="warning">
You will want to ensure the motor is secured when testing.
A motor suddenly starting up during testing and moving across the table could cause a potential hazard.
</div>

The example program we'll write will do a number of things with the motor:
forwards and backwards, and different power settings, for example.
Let's begin.

To start off with, we'll just make a motor move forwards, then backwards, and then repeat.


### Forwards & Backwards

Doing this is actually very easy; the only thing you need to realise is that a positive number is forwards and a negative number is backwards.

<div class="info">
The actual direction of travel of a motor, when mounted on a robot, will depend on its orientation and the way in which the wires are connected to the Motor Board.
If the motor appears to be going in the wrong direction, just swap the motor's positive and negative wires over.
</div>

Here's the code:

~~~~~ python
from sr.robot3 import *
import time

robot = Robot()

while True:
    robot.motor_board.motors[0].power = 0.5
    time.sleep(3.0)

    robot.motor_board.motors[0].power = 0
    time.sleep(5)

    robot.motor_board.motors[0].power = -0.5
    time.sleep(3.0)

    robot.motor_board.motors[0].power = 0
    time.sleep(5)
~~~~~

You're familiar with the first few lines; in fact, the only lines you may not be familiar with are the `robot.motor_board...` lines.
For a comprehensive reference to the `motor` object, see the `sr.robot3` module's [Motors]({{ site.baseurl }}/programming/motors) page.
But, to summarise:

<div class="info" markdown="1">
`robot.motor_board.motors[0].power = x` will set the power of the motor connected to output 0 on the first [Motor Board]({{ site.baseurl }}/kit/motor_board) to `x`, where `x` is a value between `-1` and `1`.
</div>

So, `robot.motor_board.motors[0].power = 0.5` sets the target power of the motor connected to output 0 to 50% forwards.

As you would expect, then, `robot.motor_board.motors[0].power = -0.5` will put the this motor into reverse at 50% power.

`robot.motor_board.motors[0].power = 0` will output no power to the motor and stop it.

So, if you put the above code on your robot, you should be able to see a motor spin forwards, stop, spin backwards, stop, and then repeat...

<div class="info" markdown="1">
If you find that the motor doesn't turn when you run the above code, check that you've got all the cables connected to the right places, in particular note that the Motor Board has _two_ outputs.
</div>


### Changing the Speed

Now we're going to modify the program to vary the ramp (go from 0% to 100% slowly) the speed of the motor.
Our aim is to do the forwards and backwards bit (as above), but, instead of setting the power to a fixed value we will ramp the power from 10% up to 50%, then back down to 10%, and then back to 0 (all in steps of 10%).

Here's the code:

~~~~~ python
from sr.robot3 import *
import time

robot = Robot()

while True:

    # ramp from 10% to 50%
    for pwr in range(20, 60, 10):
        robot.motor_board.motors[0].power = pwr / 100  # Convert from percentage
        time.sleep(0.1)

    # ramp from 50% to 10%
    for pwr in range(50, 0, -10):
        robot.motor_board.motors[0].power = pwr / 100  # Convert from percentage
        time.sleep(0.1)

    # set power to 0 for a second
    robot.motor_board.motors[0].power = 0
    time.sleep(1)
~~~~~

You have seen some of those bits of code before but the thing that may be new is the `for` loop.

The [`for`](https://docs.python.org/tutorial/controlflow.html#for-statements) loop accepts anything that Python can iterate over to get multiple values, such as a `list` (a `list`, when `print`ed, appears in square brackets like so: `[1, 2, 3]`).

For a comprehensive introduction to to `list`s, have a look at [this WikiBooks article](https://en.wikibooks.org/wiki/Python_Programming/Lists).
The `for` loop will iterate over the `list` (i.e. take each element in turn) and make it available in the loop's body as the variable after the the `for` keyword.
Here's an example:

~~~~~ python
for i in [1, 2, 3]:
    print(i)
~~~~~

The above would output:

~~~~~ not-code
1
2
3
~~~~~

Then there's the [`range()`](https://docs.python.org/3/library/stdtypes.html#typesseq-range) object.

`range()` objects represent a sequence of numbers.
They can be constructed with one, two or three arguments to describe what the sequence of numbers should be.

The general format is:
~~~~~ python
range(start, stop, step)
~~~~~
If only one argument is provided then two of the arguments have default values, the sequence starts at `0` and the step is set to `1`.
The provided argument only defines the stop point.

For example:
~~~~~ python
range(5)  # [0, 1, 2, 3, 4]
~~~~~

Taking `range(10, 60, 10)`, as a second example:

* Start at 10
* Go up in steps of 10
* For all values less than 60

Gives:
~~~~~ python
range(10, 60, 10) # [10, 20, 30, 40, 50]
~~~~~

Putting all of that together; in the motor control example we iterate over that sequence of numbers setting the motor power to each of those values in turn, with a delay of 100ms between.
This will give a slow ramp (~500ms) rather than a step in power straight to 50%.
You might want to run the code on your kit to see if it does what you expect it to.


## Next Steps

From here, you should be able to make your robot move about in a controlled manner.
See if you can make your robot drive forwards to a given point, stop, turn around and then return to its starting point.

You might also like to see if you can make the code example above more concise by creating functions for different types of movement, such as moving and turning.
[This](https://www.tutorialspoint.com/python3/python_functions.htm) tutorial is good if you want to learn about how functions work.
