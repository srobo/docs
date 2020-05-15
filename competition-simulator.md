---
layout: page
title: Competition Simulator
---

Competition Simulator
============

For SR2020, a virtual competition will be run using a brand new simulator.

<div class="info">
  This is not the same as the <a href="/docs/programming/simulator/">regular simulator</a>.
</div>

## Installation

### Prerequisites

This simulator is based off [Webots](https://cyberbotics.com/#download), which will need to be downloaded and installed.

You will also need Python installed. The simulator supports >=3.4.

### Installing the simulator

1. [Download the simulator](https://github.com/srobo/competition-simulator/archive/master.zip), and unzip it somewhere on your computer.
2. Using the Webots IDE, open the `worlds/Arena.wbt` file

## Overview

Within the IDE, there are a few different panels:

- In the centre of your screen is the 3D simulated view of the arena
- On the left is a tree hierarchy of all elements in this "world"
- On the right is your text editor for modifying the `example_controller` code for example
- At the bottom is your console
- At the top are your general controls which include the time controls. Press the centre play button to run the simulation at normal speed.

**Important:** Changes to the world must happen with the simulation paused at 0:00. If e.g. you move an object at a different time, rewinding back to the start will delete your changes.

### Useful links

- [Camera Controls](https://www.cyberbotics.com/doc/guide/the-3d-window#navigation-in-the-scene)
- [Graphics settings](https://www.cyberbotics.com/doc/guide/preferences#opengl) (Useful if Webots is running slowly)

## Developing your code

The code for your robot is `controllers/sr_controller/sr_controller.py`. An example skeleton code is provided for convenience.

<div class="warning">
  Please refrain from editing any code in the <code>sr</code> module directory. This contains the code which maps the SR API onto the webots API. Changes to this will not be carried forward into a competition environment.
</div>

## Programming Interface

Unless otherwise stated, the simulator’s API is the same as the real SR API described in the docs.

**WIP**
