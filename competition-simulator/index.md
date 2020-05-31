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

You will also need [Python](https://www.python.org/downloads/) installed. The simulator supports >=3.5. Additional external libraries are not supported.

### Installing the simulation

1. [Download the simulation](https://github.com/srobo/competition-simulator/archive/0.1.0.zip), and unzip it somewhere on your computer.
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
