---
redirect_from:
  - /programming/sr/
layout: page
title: Robot API
---

# Robot API

Student Robotics has written a module &mdash; `sr.robot3`  &mdash; which is used to interface with the hardware.
It handles all the low-level interactions so you don't have to.

For example, to set the power of output 0 on a Motor Board to 30%, you would simply write:

~~~~~ python
robot.motor_board.motors[0].power = 0.3
~~~~~

<div class="info" markdown="1">
See the [Motor Board]({{ site.baseurl }}/programming/motors) page for more details about this example.
</div>

To gain access to all of this functionality, all you need to do at the top of your code is the following:

~~~~~ python
from sr.robot3 import *
robot = Robot()
~~~~~

This imports the Student Robotics module that we've written to interface with our hardware.
We then use the `Robot` class from within the `sr.robot3` module, to create a `robot` object that sets up and gives you access to your robot's hardware.

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
    See the [competition mode](./comp_mode) page for more information about this attribute.

mode
:   Whether the robot is running in competition mode.
    When in a competition match, this will be `COMP`, and at all other times this will be `DEV`.

    This attribute is only available after the start button is pressed and will throw an error if accessed before.
    See the [competition mode](./comp_mode) page for more information about this attribute.

    ~~~~~ python
    from sr.robot3 import *

    robot = Robot()

    if robot.mode == COMP:
        print("This is the competition!")
    elif robot.mode == DEV:
        print("This is development")
    ~~~~~

usbkey
:   A [`Path`](https://docs.python.org/3/library/pathlib.html#basic-use) object containing the path to the USB stick.
    You can use this to easily read and write files on the USB stick itself.

    An example of how the `usbkey` attribute might be used to read a file called `my-file.txt` which is stored on the USB stick:

    ~~~~~ python
    from sr.robot3 import *
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


## Custom Robot Object Initialisation

Normally the Robot object is initialised with the following:

~~~~~ python
from sr.robot3 import *
robot = Robot()
~~~~~

By default your robot will pause on this line waiting for the start button to be pressed.
However if you want to initialise some hardware or software before the start button is pressed then Robot initialisation can be broken up as follows.

~~~~~ python
from sr.robot3 import *
robot = Robot(wait_for_start=False)

# Initialisation phase.
# Here you can perform hardware/software initialisation before start

robot.wait_start()
~~~~~

This will not pause on the line which creates the `robot` but will instead pause on the `robot.wait_start()` line, until the start button is pressed.
