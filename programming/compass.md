---
layout: page
title: Compass
---

# Compass

<div class="info">
This documentation refers to a feature which is only available within the simulator.
</div>

The `sr.robot` library contains support for using a simulated compass unit on the robot. This allows robots to determine the direction it's facing in the arena.

~~~~~ python
from sr.robot import *
R = Robot()
heading = R.compass.get_heading()
~~~~~

When called, the `get_heading` method will return the heading of the robot in radians as a float. The heading is in the range 0 to tau (2π), where 0 is the robot facing directly North, and values increasing clockwise.
