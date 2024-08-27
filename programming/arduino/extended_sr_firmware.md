---
layout: page
title: Arduino extended firmware
---

# Arduino with extended SR firmware

You may wish to extend the SR firmware with additional functionality.
This will allow you to continue using the commands already provided by the SR firmware (e.g. `digital_read()`),
which means any existing robot code you have won't need modifying very much.
When you extend the SR firmware, you'll be adding new commands to the firmware.
There are almost limitless possibilities of what your commands may do, but here are some examples to give you an idea:

* Talk to an SPI or I2C sensor.
* Read N input pins at the same instant in time.
* Time pulses received from an ultrasound sensor.

There are two steps that you will need to go through to implement and use your custom commands:


## Step 1: Add your command to the Arduino firmware

To extend the SR firmware, you will need to first download its [source code]({{ site.baseurl }}/resources/kit/arduino-fw.ino), and edit it in the Arduino IDE.
When the SR Arduino python library wants the Arduino to run a command, it sends it a single character to tell it which command to run.
You'll find a `switch` statement in the `loop()` function that processes this command character:

~~~~~ cpp
switch (selected_command) {
      case 'a':
        command_analog_read();
        break;
      case 'r':
        command_read();
        break;
      case 'l':
        command_write(LOW);
        break;

 // ... and so on ...
~~~~~

For example, you can see in the above code that when it receives an "a" character, it calls the `command_analog_read()` function.
This function does pretty much what it says on the tin: it reads an analog pin.

You will need to add your own entry into this `switch` statement for your new command.
This will need to be represented by a character that doesn't already appear in the switch statement.
Let's say you chose "s"; your entry would look like this:

~~~~~ cpp
switch (selected_command) {
      case 's':
        command_read_sensor();
        break;

 // ... all the original entries ...
~~~~~

You would then write your `command_read_sensor()` function, which would implement reading the sensor.
Your function can read additional data from the serial port if it requires additional information to operate.
It can also write a response back to the host (your Python code).
Have a look at the `command_read()` function to see how to do this.


## Step 2: Use your new command from Python

You can send a custom command from your Python code to the Arduino to read the sensor.

~~~~~ python
sensor_data = robot.arduino.command("s")
~~~~~

The `sensor_data` variable will contain any response from your firmware, if you sent one.

You're done!
You can now use your custom firmware that can read from a sensor.

If you have multiple Arduinos running custom firmware, you can keep track of which one is which by using the serial number.
