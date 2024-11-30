---
redirect_from:
  - /programming/sr/ruggeduinos/custom_firmware
layout: page
title: Arduino custom firmware
---

# Arduino with custom firmware

<div class="info" markdown="1">
On this page we talk specifically about Arduinos.
However this page is applicable to opening any device that shows up as a serial port.
</div>

## Ignoring a device

By default when the `robot` object is created it will try to communicate with all Arduinos and will expect them to respond in the way the SR firmware does.
If you want the API to not try connecting to a device we need to *ignore* the Arduino.

To configure a `Robot` object to ignore a Arduino with custom firmware, you will need to provide it with the Arduino's serial number.
The Arduino serial number is a string of numbers and letters, and is output in the robot log when you run a program on your robot with your Arduino connected.

You'll need the serial number later, so it's best to save it into a variable:

~~~~~ python
from sr.robot3 import Robot

# Replace this with the actual serial number of your board
ARDUINO_SN = "752303138333517171B1"

robot = Robot(ignored_arduinos=[ARDUINO_SN])

# The rest of your code
~~~~~


## Opening a serial port

If you need to communicate with a device, you will need to open its serial port.
If you want the `robot` object to do this and provide a serial port for your use, you will need to do the following.

~~~~~ python
from sr.robot3 import Robot

# Replace this with the actual serial number of your board
ARDUINO_SN = "752303138333517171B1"

# Set this to the baud rate that the device communicates with
SERIAL_BAUD_RATE = 115200

robot = Robot(
    ignored_arduinos=[ARDUINO_SN],
    raw_ports=[(ARDUINO_SN, SERIAL_BAUD_RATE)]
)

# The rest of your code
~~~~~

This opens the serial connection to the device and the serial port is now available under:

~~~~~ python
robot.raw_serial_devices[ARDUINO_SN]
~~~~~

<div class="info" markdown="1">
Note that all communications with the serial port is done with `bytes` rather than strings that you will be more familiar with.

You may need to convert from a string to bytes:

~~~~~ python
bytes_object = string_object.encode()
~~~~~

or bytes to a string:

~~~~~ python
string_object = bytes_object.decode()
~~~~~
</div>


### write

`write` is used to send data to the serial port, the function will send whatever you provide.
Putting a `b` in front of a string is a short hand way of creating a bytes object.

~~~~~ python
# This will send the message "data" over the serial port
# The b in front of the string is not a typo, this is a byte string
robot.raw_serial_devices[ARDUINO_SN].write(b"data")
~~~~~


### read

`read` is used to get some data from the serial port, the function will read the number of bytes specified.
If the port times out waiting for data, it may return less bytes that specified.

~~~~~ python
# This will read 5 bytes from the serial port
received_data = robot.raw_serial_devices[ARDUINO_SN].read(5)
~~~~~


### read until

`read_until` is used to get some data from the serial port, it will read data until it reads the specified terminator.
If the port times out waiting for the terminator, it may return less data without the terminator on the end.

For example this can be used to read in a single line of data, terminated with a newline character `\n`.

~~~~~ python
# This will read in data until we get to a new line character
received_data = robot.raw_serial_devices[ARDUINO_SN].read_until(b"\n")
~~~~~


### pyserial port

The `Robot` uses pyserial to open the serial connection to the board.
If you would prefer you can access the pyserial object directly, like so:

~~~~~ python
serial_port = robot.raw_serial_devices[ARDUINO_SN].port
~~~~~

Refer to the [pyserial documentation](https://pyserial.readthedocs.org/en/latest/) for more information on how to use pyserial.


## Finding other serial devices

If you are using your own serial device that you want to access via a [raw serial port](#opening-a-serial-port), you will need to know its serial number.
To do this we provide a helper function.
Running the below code example will print a list of all the devices connected to the system.

Once you have found your device, and copied the serial number, you can follow the guidance in the [opening a serial port](#opening-a-serial-port) section.
If you need help finding which device is yours contact us on Discord for help.

~~~~~ python
from sr.robot3 import list_ports

list_ports()
~~~~~
