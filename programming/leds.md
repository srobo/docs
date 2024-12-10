---
redirect_from:
  - /programming/sr/leds/
layout: page
title: Brain Board LED API
---

Brain Board LED API
===================

The KCH board provides diagnostic information about the state of your robot through a collection of preconfigured and user-controllable LEDs.
It is part of the [Brain Board](/docs/kit/brain_board) assembly and will be found attached to the top of the Raspberry Pi.

A number of the LEDs are controlled by the Robot's Operating system, the description of these is provided on the [Brain Board](/docs/kit/brain_board) page.
There are also three LEDs that you can control via the API.

The LEDs on the KCH can be accessed via the `kch` object:

~~~~~ python
robot.kch
~~~~~

The KCH board has three RGB (red/green/blue) LEDs: A, B and C.

The LEDs default to off, however once set they will hold their value even if your code exits.
This is potentially useful to understand the current state of your code as it runs or the final state of the code afterwards.

Each of the LEDs can be set to one of 8 colours:

~~~~~ python
# Set LED A to red
robot.kch.leds[LED_A].colour = Colour.RED

# Set LED B to cyan
robot.kch.leds[LED_B].colour = Colour.CYAN

# Turn LED C off
robot.kch.leds[LED_C].colour = Colour.OFF
~~~~~

The available colours are defined on the `Colour` enum:

~~~~~ python
Colour.OFF
Colour.RED
Colour.YELLOW
Colour.GREEN
Colour.CYAN
Colour.BLUE
Colour.MAGENTA
Colour.WHITE
~~~~~

Alternatively you can set the red, green and blue channels for a given LED separately:

~~~~~ python
# Turn on the blue segment of LED A
robot.kch.leds[LED_A].b = True

# Turn off the red segment of LED B
robot.kch.leds[LED_B].r = False

# Turn on the green segment of LED B
robot.kch.leds[LED_B].g = True
~~~~~

These values are all available from the `sr.robot3` module:

~~~~ python
from sr.robot3 import Colour, LED_A, LED_B, LED_C
~~~~
