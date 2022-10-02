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

[LEDs](#leds) {#leds}
---------------------

The KCH HAT has three RGB LEDs: A, B and C. The LEDs default to off, however
once set they will hold their value even if your code exits. This is potentially
useful to understand the current state of your code as it runs or the final
state of the code afterwards.

Each channel of each LED acts independently, so you can either set them separately:

~~~~~ python
# Turn on the red channel of LED A
R.kch.a.red = 1

# Turn on the green channel of LED B
R.kch.b.green = 1

# Turn off the red channel of LED A
R.kch.a.red = 0
~~~~~

Alternatively you can set the red, green and blue channels for a given LED all together:

~~~~~ python
# Set LED C to a yellow colour
R.kch.c.rgb = (1, 1, 0)

# Set LED B to a light blue colour
R.kch.b.rgb = (0, 1, 1)
~~~~~
