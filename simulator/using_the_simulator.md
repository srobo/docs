---
layout: page
title: Using the Simulator
---

Using the Simulator
===================

## Overview

Within the Webots IDE, there are a few different panels:

- In the centre of your screen is the 3D simulated view of the arena
- On the left is a tree hierarchy of all elements in this "world"
- At the bottom is the console, where output from your robot code will be displayed
- At the top are your general controls which include the time controls. Press the centre play button to run the simulation at normal speed.

### Useful links

- [Camera Controls](https://www.cyberbotics.com/doc/guide/the-3d-window#navigation-in-the-scene)
- [Graphics settings](https://www.cyberbotics.com/doc/guide/preferences#opengl) (Useful if Webots is running slowly)

## Time

In the simulated environment, time advances only at the pace that the simulator
is run. The relation between this time and the real passage of time depends on a
couple of factors: the speed the simulation is configured to run at and the
ability of the computer running the simulation to process it fast enough.

You can configure and observe the speed the simulator is running at from the toolbar in webots:

![]({{ site.baseurl }}/images/content/simulator/speed-toolbar.png)

Here the simulation has run for 13.28 seconds, but is currently paused (the
speed multiplier shows 0.00×). You could choose to step a single time increment,
run the simulator at real speed (▶), or run the simulator at various faster
speeds (▶▶ and ▶▶▶).

### Programming for Simulated Time

As time in the simulator is part of the simulation itself, your code must be careful not to block for too long.

For example, if you have used Python before and have used `time.time` to determine the current time or `time.sleep` to wait for some duration, you will find these to be unreliable in the simulator.

Instead you must use `robot.time` and `robot.sleep`, which are provided as direct replacements of `time.time` and `time.sleep` respectively.
These methods are also available on the physical kits.

<div class="warning" markdown="1">

  Since the simulator does not simulate the time taken to execute your code, any loop or decision which needs an event to occur must be accompanied by a `robot.sleep` even if with a small value.
  **If in doubt add an `robot.sleep`**.
  If you find that the simulator freezes then this indicates that your code is reaching a loop which does not contain any `robot.sleep` and is expecting time to advance.

</div>

## Developing your code

On first run, the robot will execute an example program for convenience. This program will be copied to the directory `competition-simulator-<version>` is stored in:

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
└── robot.py
```

Your code should be developed in `robot.py`.

<div class="warning">
  Only your controller code will be present in the competition environment.
</div>

### Running multiple robots

To test how your robot behaves in each starting zone of the arena, you can copy your robot's code to run in each corner. Code can be placed in a `zone-<zone>` directory to run in starting zone `<zone>`:

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
├── zone-0
│   └── robot.py
└── zone-1
   └── robot.py
```

This will run two robots in the arena, each with different `robot.py`s. You can run as many or as few zones as you like, in any combination.
