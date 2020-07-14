---
layout: page
title: Competition Simulator
---

# Competition Simulator

![]({{ site.baseurl }}/images/content/competition-simulator/arena.png)

For SR2020, a virtual competition will be run using a brand new simulator.

<div class="info">
  This is different to the <a href="/docs/programming/simulator/">regular simulator</a>.
</div>

## Installation

### Prerequisites

This simulation is based in [Webots](https://cyberbotics.com/#download), which will need to be downloaded and installed. The download is around 1.5GB.

#### Python Version

You will also need Python installed.

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.7 (64-bit)             |
| macOS    | >= 3.7                   |
| Linux    | >= 3.5                   |

In the competition, Python 3.7 will be used.

There are a small number of [external libraries]({{ site.baseurl}}/programming/python/libraries)
which will be available to your robot code during the competition. Note that for
local development you will need to install these yourself.

If there are other libraries you would like included, please let us know
[via the forums](/forum) and include a link to the package on [PyPI](https://pypi.org/).

### Installing the simulation

1. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/0.5.0/competition-simulator-0.5.0.zip), and unzip it somewhere on your computer.
2. Using the Webots IDE, open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

#### Changing your version of Python

If webots is picking up the incorrect version of Python, you'll need to change it. This can be done using `Tools > Preferences > General > Python command`. You'll need to ensure a matching version of Python is installed.

### Updates

Occasionally, we may release an update to the simulation. To update, you will need to delete the `competition-simulator-<version>` directory, and re-download it using the above link.

## Overview

Within the Webots IDE, there are a few different panels:

- In the centre of your screen is the 3D simulated view of the arena
- On the left is a tree hierarchy of all elements in this "world"
- At the bottom is the console, where output from your robot code will be displayed
- At the top are your general controls which include the time controls. Press the centre play button to run the simulation at normal speed.

### Useful links

- [Camera Controls](https://www.cyberbotics.com/doc/guide/the-3d-window#navigation-in-the-scene)
- [Graphics settings](https://www.cyberbotics.com/doc/guide/preferences#opengl) (Useful if Webots is running slowly)

## Robot

![]({{ site.baseurl }}/images/content/competition-simulator/robot-front.png)

This is the pre-built robot used in the simulator, with an interface [similar](./programming) to the SR API.

The robot has an array of sensors, a vision system, and a gripper to pick up tokens, all of which can be [programmed](./programming).

### Other robots

There are 3 other robots in the arena, all in their starting zones. By default, these robots will not move.

To control these robots, you will need to provide their code:

Create the robot code in `zone-x/robot.py`, where `x` is zone number `1`, `2` or `3`.
Your code at `robot.py` will be used for zone `0`, though you are encouraged to move your code to `zone-0/robot.py` when running multiple robots.
Robots which do not have any robot code in their `zone-x` directory will not do anything.

```
.
├── competition-simulator-<version>
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
├── zone-1
|   └─ robot.py
└── robot.py
```

## Time

In the simulated environment, time advances only at the pace that the simulator
is run. The relation between this time and the real passage of time depends on a
couple of factors: the speed the simulation is configured to run at and the
ability of the computer running the simulation to process it fast enough.

You can configure and observe the speed the simulator is running at from the toolbar in webots:

![]({{ site.baseurl }}/images/content/competition-simulator/speed-toolbar.png)

Here the simulation has run for 13.28 seconds, but is currently paused (the
speed multiplier shows 0.00×). You could choose to step a single time increment,
run the simulator at real speed (▶), or run the simulator at various faster
speeds (▶▶ and ▶▶▶).

These differences mean that your code will need to use a different mechanism to
find the current time or to sleep within the simulation. Find out more by
heading over to the [programming docs on time](./programming/time).
