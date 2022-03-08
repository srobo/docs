---
layout: page
title: Ruggeduino custom firmware
---

Custom firmware
===============

<div class="info">
This documentation refers to a feature which is only available on the physical robot kits.
</div>

The Ruggeduino that came as part of your kit was shipped with a firmware that provides the functionality outlined in the [Ruggeduino](/docs/programming/sr/ruggeduinos) page.
You may wish to extend the functionality of this firmware, or completely replace it.
The `sr.robot3` library provides support for three Ruggeduino firmware scenarios:

 1. Default SR firmware
 2. [Extended SR firmware](#extension): Firmwares that add commands to the default SR firmware.
 3. [Completely custom](#completely): Any firmware not derived from the SR firmware.

By default, the [`sr.robot3`](/docs/programming/sr/) library assumes that all connected Ruggeduinos are running the SR firmware
or firmware which is compatible with the SR Ruggeduino firmware.
If you're using completely custom firmware, you'll need to tell the kit to ignore the ruggeduino so that you're able to define your own setup logic.

[Extension of the SR firmware](#extension) {#extension}
------------------------------

You may wish to extend the SR firmware with additional functionality.
This will allow you to continue using the commands already provided by the SR firmware (e.g. `digital_read()`),
 which means any existing robot code you have won't need modifying very much.
When you extend the SR firmware, you'll be adding at least one new command to the firmware.
There are almost limitless possibilities of what your commands may do, but here are some examples to give you an idea:

 * Talk to an SPI or I2C sensor.
 * Read N input pins at the same instant in time.
 * Time pulses received from an ultrasound sensor.

There are three steps that you will need to go through to implement and use your custom commands:

### Step 1: Add your command to the Ruggeduino firmware

To extend the SR firmware, you will need to first download its [source code]({{ site.baseurl }}/resources/kit/ruggeduino-fw.ino), and edit it in the Arduino IDE.
When the SR ruggeduino python library wants the ruggeduino to run a command, it sends it a single character to tell it which command to run.
You'll find a `switch` statement in the `loop()` function that processes this command character:

~~~~~ cpp
switch (selected_command) {
      case 'a':
        command_analogue_read();
        break;
      case 'r':
        command_read();
        break;
      case 'l':
        command_write(LOW);
        break;

 // ... and so on ...
~~~~~

For example, you can see in the above that when it receives an "a" character, it calls the `command_analogue_read()` function.
This function does pretty much what it says on the tin: it reads an analogue pin.

You will need to add your own entry into this `switch` statement for your new command.
This will need to be represented by a character that doesn't already appear in the switch statement.
Let's say you chose "c"; your entry would look like this:

~~~~~ cpp
switch (selected_command) {
      case 'c':
        command_bake_cake();
        break;

 // ... all the original entries ...
~~~~~

You would then write your `command_bake_cake()` function.
Your command can read additional data from the serial port if it requires additional information to operate.
It can also write a response back to the host (your Python code).
Have a look at the `command_read()` function to see how to do this.

### Step 2: Use your new command from Python

You can send a custom command from your Python code to the Ruggeduino to control your cake-baking.

~~~~~ python
cake_result = R.ruggeduino.command("c")
~~~~~

The `cake_result` variable will contain any response from your firmware, if you sent one.

You're done!  You can now use your custom cake-baking firmware!

If you have multiple Ruggeduino running custom firmware, you can keep track of which one is which
by using the serial number.

[Completely custom firmware](#completely) {#completely}
----------------------------

When configured correctly, the `Robot` object will perform absolutely no serial communications with a completely custom firmware.
We refer to this as *ignoring* a Ruggeduino.
To configure a `Robot` object to ignore a Ruggeduino with custom firmware, you will need to provide it with the Ruggeduino's ID.

The Ruggeduino ID is a 20 character string of mostly numbers, and is output in the robot log when you run a program on your robot with your
Ruggeduino connected.

You'll need the ID later, so it's best to save it into a variable:

~~~~~ python
from sr.robot3 import *

RUGGEDUINO_ID = "752303138333517171B1" # Replace this with the actual ID

R = Robot(ignored_ruggeduinos=["752303138333517171B1"])

# The rest of your code
~~~~~

If you need to communicate with the Ruggeduino firmware, you will need its serial device path.

This is accessible from the `ignored_ruggeduinos` dictionary.

~~~~~ python
ruggeduino_device = R.ignored_ruggeduinos[RUGGEDUINO_ID]

# The rest of your code
~~~~~

The device path will look something like `/dev/ttyACM1`.

You may wish to use pyserial to communicate with the Ruggeduino, in which case you could open it like so:

~~~~~ python
import serial
from sr.robot3 import *

RUGGEDUINO_ID = "752303138333517171B1"

R = Robot(ignored_ruggeduinos=[RUGGEDUINO_ID])

ser = serial.Serial(R.ignored_ruggeduinos[RUGGEDUINO_ID])

~~~~~

Refer to the [pyserial documentation](http://pyserial.sourceforge.net/) for more information on how to use pyserial.
