---
layout: page
title: Competition Simulator
---

# Competition Simulator

![]({{ site.baseurl }}/resources/competition-simulator/arena.png)

For SR2020, a virtual competition will be run using a brand new simulator.

<div class="info">
  This is different to the <a href="/docs/programming/simulator/">regular simulator</a>.
</div>

## Installation

### Prerequisites

This simulation is based in [Webots](https://cyberbotics.com/#download), which will need to be downloaded and installed. The download is around 1.5GB.

#### Python Version

You will also need Python installed. Additional external libraries are not supported.

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.7 (64-bit)             |
| macOS    | >= 3.7                   |
| Linux    | >= 3.5                   |

In the competition, Python 3.7 will be used.

### Installing the simulation

1. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/0.2.0/competition-simulator-0.2.0.zip), and unzip it somewhere on your computer.
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

![]({{ site.baseurl }}/resources/competition-simulator/robot-front.png)

This is the pre-built robot used in the simulator, with an interface [similar](./programming) to the SR API.

The robot has an array of sensors, a vision system, and a gripper to pick up tokens, all of which can be [programmed](./programming).

### Other robots

There are 3 other robots in the arena, all in their starting zones. By default, these robots will not move.

To control these robots, you will need to give them a controller:

1. Select the robot, and in the menu on the left, edit the controller field and select the `sr_controller` controller:

![]({{ site.baseurl }}/resources/competition-simulator/robot-controller.png)

2. Create the robot code in `zone-x/robot.py`, where `x` is zone number `1`, `2` or `3`.
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
