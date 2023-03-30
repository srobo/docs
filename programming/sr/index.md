---
layout: page
title: SR Module
---

SR Module
=========

Student Robotics has written a module &mdash; `sr.robot3`  &mdash; which is used to interface with the hardware.
It handles all the low-level interactions so you don't have to.
To set the output power of output 0 of the first motor board to -30%, for example, you would simply write:

~~~~~ python
R.motor_board.motors[0].power = -0.3
~~~~~

`-0.3` would be backwards (depending upon which way you wired up the motor) &mdash; 30% power in reverse.

To gain access to all of this functionality, all you need to do is write:

~~~~~ python
from sr.robot3 import *
~~~~~

...at the top of your code (before you use any of its functionality, basically).
This imports the Student Robotics module that we've written to interface with our hardware.

Then, within the `sr.robot3` module, there is a `Robot` class that should be instantiated, as follows:

~~~~~ python
from sr.robot3 import *
R = Robot()
~~~~~

Within your `Robot` (`R` in this case), you then have access to the following attributes:

* [motors](/docs/programming/sr/motors/)
* [power](/docs/programming/sr/power/)
* [servos](/docs/programming/sr/servos/)
* [ruggeduinos](/docs/programming/sr/ruggeduinos/)
* [vision](/docs/programming/sr/vision/)

They can be used in your code just like the example above.
Note that `motors`, `ruggeduinos`, and `servos` are Python lists, and so should be accessed as such.
Here are some examples:

~~~~~ python
R.motor_board.motors[0].power = 0.5   # WILL work, if motor 0 exists
R.motor_board.motors[1].power = -0.2  # WILL work, if motor 1 exists
R.motor_board.motors.power = 0.42     # WON'T WORK

# the above is similar to the situation for 'ruggeduinos' and 'servos'
~~~~~

A number of examples in the documentation will assume you've instantiated the required `Robot` class and have called it `R`.
From here in, if you see a `R.something`, the requirement of the `sr.robot3` import line and the instantiation of `Robot` as `R` is implicit.

[Other Robot Attributes](#OtherRobotAttributes) {#OtherRobotAttributes}
----------------------

As well as the attributes listed above, the Robot class also has the following attributes, which you may find useful:

zone
:    The number of the zone that the robot is associated with. Between `0` and `3`.

mode
:   Whether the robot is running in competition mode.
    When in a competition match, this will be `RobotMode.COMP`, and at all other times this will be `RobotMode.DEV`.

    ~~~~~ python
    from sr.robot3 import *

    R = Robot()

    if R.mode == RobotMode.COMP:
      print("This is the competition!")
    ~~~~~

usbkey
:   The path to the USB memory stick.
    Your code is unzipped and run from a temporary directory, therefore files you create will be lost when the kit is turned off.
    You can use this to easily read from and write to files on the stick itself.
    Note that the USB memory stick is mounted synchronously, so any writes to it will block until complete and may slow down your code.

    An example of how the `usbkey` attribute might be used:

    ~~~~~ python
    from sr.robot3 import *
    import os

    R = Robot()
    print("The path to the USB key is:", R.usbkey)
    print("My file on the USB contains:")
    with open(os.path.join(R.usbkey, 'my-file.txt'), 'r') as f:
        print(f.read())
    ~~~~~

is_simulated
:   A boolean value indicating whether or not the code is running in the simulator.

[Custom Robot Object Initialisation](#CustomRobotInit) {#CustomRobotInit}
----------------------

Normally the Robot object is initialised with the following:

~~~~~ python
R = Robot()
~~~~~

However if you want to:

 * customise your Ruggeduino firmware
 * initialise some hardware or software before the start button is pressed

Then Robot initialisation can be broken up as follows (this example is equivalent to the previous code excerpt):

~~~~~ python
R = Robot(auto_start=True)

# Initialisation phase.
# Here you can perform hardware/software initialisation before start

R.wait_start()
~~~~~

During the initialisation phase, all hardware is accessible.
If you have any hardware which must be initialised before the start button is pressed,
 the initialisation phase is the time to do so.
