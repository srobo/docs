---
redirect_from:
  - /programming/sr/
layout: page
title: Robot API
---

# Robot API

Student Robotics has written a module &mdash; `sr.robot3`  &mdash; which is used to interface with the hardware.
It handles all the low-level interactions so you don't have to.

For example, to set the power of output 0 on a Motor Board to 30%, you would write:

~~~~~ python
robot.motor_board.motors[0].power = 0.3
~~~~~

<div class="info" markdown="1">
See the [Motor Board]({{ site.baseurl }}/programming/motors) page for more details about this example.
</div>

To gain access to all of this functionality, all you need to do at the top of your code is the following:

~~~~~ python
from sr.robot3 import Robot
robot = Robot()
~~~~~

This imports the Student Robotics module that we've written to interface with our hardware.
We then use the `Robot` class from within the `sr.robot3` module, to create a `robot` object that sets up and gives you access to your robot's hardware.

Alongside `Robot`, other values are importable from `sr.robot3` which may be useful, such as `OUT_H0` or `A3`. It's best practice to only import the values you need, rather than `import *`. Most of these are available directly, or can be retrieved from the enums they're defined on (`PowerOutputPosition` and `AnalogPins` in these cases). If you need multiple values, you can import them all on one line:

~~~~ python
from sr.robot3 import Robot, OUT_H0, AnalogPins
~~~~

If you don't need a value, it's best not to import it, to avoid accidentally overriding it.

<div class="info" markdown="1">
Most examples in the documentation will assume you have created a `robot` object from the `Robot` class.
If you see `robot` in a code example, it is assumed you have run the two lines above.
</div>

Then, within your `robot` you can use the following attributes to access to the robot's hardware:

* [kch]({{ site.baseurl }}/programming/leds)
* [motor_board]({{ site.baseurl }}/programming/motors)
* [power_board]({{ site.baseurl }}/programming/power)
* [servo_board]({{ site.baseurl }}/programming/servos)
* [arduino]({{ site.baseurl }}/programming/arduino/)
* [camera]({{ site.baseurl }}/programming/vision/)

The functions of each board are described on their respective pages.

## Other Robot Attributes

As well as the attributes listed above, the `Robot` class also has the following attributes, which you may find useful:

zone
:   The number of the scoring zone that the robot is associated with.
    Between `0` and `3`.

    This attribute is only available after the start button is pressed and will throw an error if accessed before.
    The zone you are in defines which arena markers are near your scoring zone.
    You can use the knowledge of your zone to compensate for this, so your robot behaves correctly in all starting positions.
    See the [competition mode](./comp_mode) page for more information about this attribute.

mode
:   Whether the robot is running in competition mode.
    When in a competition match, this will be `COMP`, and at all other times this will be `DEV`.

    This attribute is only available after the start button is pressed and will throw an error if accessed before.
    See the [competition mode](./comp_mode) page for more information about this attribute.

    ~~~~~ python
    from sr.robot3 import Robot, COMP, DEV

    robot = Robot()

    if robot.mode == COMP:
        print("This is the competition!")
    elif robot.mode == DEV:
        print("This is development")
    ~~~~~

    `COMP` and `DEV` are aliases for `RobotMode.COMP` and `RobotMode.DEV`, which can also be imported from `sr.robot3`.

usbkey
:   A [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use) object containing the path to the USB stick.
    You can use this to easily read and write files on the USB stick itself.

    An example of how the `usbkey` attribute might be used to read a file called `my-file.txt` which is stored on the USB stick:

    ~~~~~ python
    from sr.robot3 import Robot
    import os

    robot = Robot()
    print("The path to the USB stick is:", robot.usbkey)
    print("My file on the USB contains:")
    with open(os.path.join(robot.usbkey, 'my-file.txt')) as file:
        print(file.read())
    ~~~~~

is_simulated
:   A boolean value indicating whether or not the code is running in the simulator.
    This value is `True` when in the simulator and `False` when on the robot.

sleep(seconds)
:   A method, similar to the built-in [`time.sleep`](https://docs.python.org/3/library/time.html#time.sleep), which pauses the program's execution for a given number of seconds.

    ~~~~~ python
    from sr.robot3 import Robot

    robot = Robot()

    print("The robot just started.")

    robot.sleep(2.5)

    print("The robot has been running for 2.5 seconds.")
    ~~~~~

    This method is particularly useful in the simulator, where the simulation may be running faster than real-time. Whilst `time.sleep` will still work as expected on the physical robot, it's still recommended to use `robot.sleep` to ensure your code is portable.

    See [Simulation of Time]({{ site.baseurl }}/simulator/using_the_simulator#simulation-of-time) for more information.

time()
:   Returns the current time in seconds, measured since an [epoch](https://en.wikipedia.org/wiki/Epoch) (reference time). This method is similar to the built-in [`time.time`](https://docs.python.org/3/library/time.html#time.time) method.

    Whilst the exact time on the robot will not be correct (it won't match a clock), it will still progress as expected, making it useful to measure the duration between 2 points in time. The exact value of the time itself is meaningless.

    ~~~~~ python
    from sr.robot3 import Robot

    robot = Robot()

    start = robot.time()
    do_expensive_operation()
    end = robot.time()

    duration = end - start

    print(f"The expensive operation took {duration:.2f} seconds.")
    ~~~~~

## Custom Robot Object Initialisation

Normally the Robot object is initialised with the following:

~~~~~ python
from sr.robot3 import Robot
robot = Robot()
~~~~~

By default your robot will pause on this line waiting for the start button to be pressed.
However if you want to initialise some hardware or software before the start button is pressed then Robot initialisation can be broken up as follows.

~~~~~ python
from sr.robot3 import Robot
robot = Robot(wait_for_start=False)

# Initialisation phase.
# Here you can perform hardware/software initialisation before start

robot.wait_start()
~~~~~

This will not pause on the line which creates the `robot` but will instead pause on the `robot.wait_start()` line, until the start button is pressed.

## Enums

Many values from the robot API are "enums". Enums are sets of values with names.

Enums compare equal to each other:

~~~~~ python
from sr.robot3 import Colour

pump_output = PowerOutputPosition.H0

pump_output == PowerOutputPosition.H0  # True
pump_output == PowerOutputPosition.H1  # False
~~~~~

Enums are special values. They may look like strings or numbers, but they're not. An enum is a name for a special value. For example, the value for `PowerOutputPosition.H0` is `0`, whilst `RobotMode.COMP` is `"COMP"`. The inner value can be retrieved using `.value`.


~~~~~ python
from sr.robot3 import RobotMode

RobotMode.COMP == "COMP"  # False
RobotMode.COMP.value == "COMP"  # True
~~~~~

In general, the enum should be used and compared directly, rather than using its inner value.

## Creating your own helpers

The provided `Robot` object provides access to the boards provided with the kit. However, you may feel the urge to extend it to add your own methods to make development clearer.. However, this can introduce issues if the methods or properties you add interfere with the inner workings of the `Robot` object.

Instead, you can wrap the `Robot` object with your own class:

~~~~~ python
from sr.robot3 import Robot
import time

class MyRobot:
    def __init__(self):
        self.robot = Robot()

    def drive_forwards(self, seconds):
        """
        Drive forwards for a given number of seconds
        """
        robot.motor_boards["srABC1"].motors[0].power = 0.5
        robot.motor_boards["srABC1"].motors[1].power = 0.5
        time.sleep(seconds)
        robot.motor_boards["srABC1"].motors[0].power = 0
        robot.motor_boards["srABC1"].motors[1].power = 0

# Now, use your class instead
robot = MyRobot()
robot.drive_forwards(3)
~~~~~

This is not the only way to design your own robot API. You may instead want to define helper functions:

~~~~~ python
from sr.robot3 import Robot
import time

def drive_forwards(robot, seconds):
    """
    Drive forwards for a given number of seconds
    """
    robot.motor_boards["srABC1"].motors[0].power = 0.5
    robot.motor_boards["srABC1"].motors[1].power = 0.5
    time.sleep(seconds)
    robot.motor_boards["srABC1"].motors[0].power = 0
    robot.motor_boards["srABC1"].motors[1].power = 0

# Now, use your class instead
robot = Robot()
drive_forwards(robot, 3)
~~~~~

Both of these approaches are equally valid. Choosing which you want to use will likely come down to your own preferences.

<div class="warning" markdown="1">
Attempting to subclass the `Robot` class directly will raise an exception.

~~~~~ python
from sr.robot3 import Robot

# This is not supported nor recommended.
class MyRobot(Robot):
  ...
~~~~~

Subclassing like this can interfere with the general operating of the `Robot` object. Instead, we recommend using the examples above to wrap the existing `Robot` object.

</div>
