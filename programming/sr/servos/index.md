---
layout: page
title: Servos
---

Servos
======

<div class="info">
This documentation refers to a feature which is only available on the physical robot kits.
</div>

The `servos` object is used to control a collection of Servo Boards.
Similar to `motors` and `ruggeduinos`, `servos` can be used like a list.
To do something with the **first Servo Board**, you would use:

~~~~~ python
R.servos[0].something...
~~~~~

...because indexes are 0-based (counting starts from 0, not 1).

When you have more than one Servo Board connected to your kit
they will be ordered based upon their serial number.

The SR Part Code of each detected motor board is also printed to the log when your robot starts.
It will look something like this:

~~~~~ not-code
Found the following devices:
 - Servos:
    0: Servo( serialnum = "SR0LG31" )
~~~~~


However, like `motors` and `ruggeduinos`, `servos` is actually a dictionary.
As a result, in `servos` you can also use the SR Part Code of the Servo Board as a key.
For example, if you had a board that was labelled "SR0LG31",
you could do this instead:

~~~~~ python
R.servos["SR0LG31"].something...
~~~~~

Setting servo positions
-----------------------

The position of servos can range from `-100` to `100` inclusive:

~~~~~ python
# R.servos[SERVO_BOARD_ID][SERVO_NUMBER] = POS

# set servo 1's position (on the first Servo Board connected, board 0) to 20
R.servos[0][1] = 20
# Set servo 2's position (on the Servo Board with part code SRABC) to -55
R.servos["SRABC"][2] = -55
~~~~~

<div class="warning" markdown="1">
It is important that you use integers (whole numbers, such as `10` instead of
`10.0`) when specifying servo positions.
</div>

You can read the last value a servo was set to using similar code:

~~~~~ python
# get the last setting of the second servo on the first Servo Board
lastSetting = R.servos[0][1]
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
You should experiment and find what the actual limit of your servos are (it almost certainly won't be -100 and 100) and not drive them past that.
