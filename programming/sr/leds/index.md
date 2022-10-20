---
layout: page
title: LEDs
---

LEDs
====

The KCH HAT provides diagnostic information about the state of your robot
through a collection of preconfigured and user-controllable LEDs. It is part of
the [Brain Board](/docs/kit/brain_board) assembly, however control of its LEDs
is provided through a distinct API.

The LEDs on the KCH can be accessed via the `kch` object:

~~~~~ python
R.kch.something...
~~~~~

The KCH HAT has three RGB LEDs: A, B and C. The LEDs default to off, however
once set they will hold their value even if your code exits. This is potentially
useful to understand the current state of your code as it runs or the final
state of the code afterwards.

Each of the LEDs can be set to a colour:

~~~~~ python
# Set LED A to red
R.kch[UserLED.A] = Colour.RED

# Set LED B to cyan
R.kch[UserLED.B] = Colour.CYAN

# Turn LED C off
R.kch[UserLED.C] = Colour.OFF
~~~~~

The available colours are:

~~~~~ python
OFF
RED
YELLOW
GREEN
CYAN
BLUE
MAGENTA
WHITE
~~~~~

Alternatively you can set the red, green and blue channels for a given LED separately:

~~~~~ python
# Turn on the blue segment of LED A
R.kch[UserLED.A].b = True

# Turn off the red segment of LED B
R.kch[UserLED.B].r = False

# Turn on green segment of LED B
R.kch[UserLED.B].g = True
~~~~~
