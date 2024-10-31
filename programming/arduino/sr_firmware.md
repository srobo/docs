---
layout: page
title: Arduino SR firmware
---

# Arduino with SR firmware

The [Arduino]({{ site.baseurl }}/kit/arduino) provides a total of 18 pins for either digital input or output (labelled 2 to 13 and A0 to A5), pins A0 to A5 also support analog input.

<div class="warning">
Digital pins 0 and 1 are reserved for internal communication with the rest of our kit.
</div>

The kit can control multiple Arduinos at once, however we only provide one in the kit.
If there is exactly one Arduino connected to your robot, it can be accessed using the `arduino` property of the `Robot` object.

~~~~~ python
from sr.robot3 import *
robot = Robot()

my_arduino = robot.arduino
~~~~~

The serial number of each detected Arduino is printed to the log when your robot starts.
It will look something like this:

~~~~~ not-code
sr.robot3.robot INFO - Found Arduino: 752303138333517171B1
~~~~~

If you have more than one Arduino attached, you need to specify which one you want to control.
This is done using the serial number of the board and the `arduinos` attribute.

For example, if you had a board whose serial number was "752303138333517171B1", you need to do this instead:

~~~~~ python
my_arduino = robot.arduinos["752303138333517171B1"]
~~~~~

<div class="info" markdown="1">
When you have more than one Arduino connected to your kit, you can’t use `robot.arduino`.
This is because the kit needs to know which Arduino you want to control.
</div>


## Setting pin modes

To use one of the pins on the Arduino, you must first set whether you want it to behave as an input or as an output.
The possible modes for a pin are:

`INPUT`
:   set the pin to [input mode](#input)

`OUTPUT`
:   set the pin to [output mode](#output)

`INPUT_PULLUP`
:   set the pin to input mode with a [pull-up resistor](#pull-up-resistors)


An example of how to use this is below:

~~~~~ python
# set Arduino pin 2 to output
robot.arduino.pins[2].mode = OUTPUT

# set Arduino pin 3 to input
robot.arduino.pins[3].mode = INPUT

# set Arduino pin 4 to input and enable pull-up resistor
robot.arduino.pins[4].mode = INPUT_PULLUP
~~~~~


## Input

You can read a **digital** input pin with the following code:

~~~~~ python
# to read Arduino's digital pin 3...
value = robot.arduino.pins[3].digital_read()

# to read Arduino's digital pin 7...
value = robot.arduino.pins[7].digital_read()
~~~~~

`value` will now contain `True` or `False` depending on whether the pin was high (5V) or low (0V), respectively.

You can read an **analog** input pin with the following code:

~~~~~ python
# to read Arduino's analog pin A0...
value = robot.arduino.pins[A0].analog_read()

# to read Arduino's analog pin A4...
value = robot.arduino.pins[A4].analog_read()
~~~~~

The analog pin numbers are available as `A0`, `A1`, `A2`, `A3`, `A4`, and `A5` respectively.


## Output

You can only set digital outputs (there's no analog_write, although feel free to modify the Arduino's firmware to add the ability to output [PWM](https://wikipedia.org/wiki/Pulse-width_modulation) (Pulse-width modulation) if you desire).
To set a digital output pin, you would use the following:

~~~~~ python
# to set Arduino's pin 2 high:
robot.arduino.pins[2].digital_write(True)

# to set Arduino's pin 2 low:
robot.arduino.pins[2].digital_write(False)
~~~~~


## Pull-up resistors

The Arduino possesses the ability to enable a built-in pull-up resistor on any input pin.
This takes a small amount of explanation.

Normally, input pins are not connected to anything - known as "floating".
In this state, they might read high or low, or different values depending on their environment.
This is obviously not good for consistent control.

Many pieces of off-the-shelf electronics that have some form of standard I/O output will connect this pin to 5.0V (high) and 0V (low) when required, so this is not a problem.
However, for basic electronics, a microswitch for example, you would normally be required to connect a resistor between the input pin and 5.0V (a pull-up resistor) to keep the input in a known state until the switch overrides it by connecting directly to 0V.

However, the built-in pull-up resistor alleviates this need.
It essentially wires in a resistor connected to 5.0V, meaning that when this option is enabled, an input pin will "default" to being high.
This means you can connect a switch between the input pin and a ground pin without any need of resistors - when the switch is open, the pin will read high; when closed, it will read low.

## Ultrasound Sensors

You can also measure distance using an ultrasound sensor from the arduino. Ultrasound sensors return the distance of the closest object in mm.

To use this on your robot you will need use HC-SR04 ultrasound modules.

```python
# Trigger pin: 4
# Echo pin: 5

# Measure distance in mm
distance_mm = robot.arduino.ultrasound_measure(4, 5)
```

<div class="warning">
The ultrasound sensor can measure distances up to around 4 metres.
If the ultrasound signal has to travel further, the echo may not be detected. 
This will cause the sensor to timeout and return 0.
</div>
