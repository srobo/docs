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

1. [Download the simulator](), and unzip it somewhere on your computer.
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

### Updates

Occasionally, we may release an update to the simulator. To update, you will need to copy your code our of of the `competition-simulator-master` directory, delete the directory, and re-download it using the above link. Then you can replace the new `controllers/sr_controller/sr_controller.py` with your existing code.

## Programming Interface

**WIP**

Unless otherwise stated, the simulator’s API is the same as the real SR API described in the docs.

### Motors

Your robot has 2 motor boards attached, each with 2 motors. Board `0` has the left wheel in port `m0`, and the right wheel in `m1`. Board `1` has the gripper lift motor in `m0`, and the finger motors in `m1`.

### Ruggeduino

Your robot has 5 microswitches and 6 distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

#### Microswitches

The microswitches are attached to digital pins 0-4:

- Front
- Back
- Between gripper fingers
- Left gripper finger
- Right gripper finger

Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is current actuated.

#### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object.

- Front Left
- Front Right
- Left
- Right
- Back Left
- Back Right

The `analogue_read` method will return the distance in centimetres, however only measure up to 30cm.

### Camera

Your robot has a camera, which is attached to the top of your gripper. A live preview of what the camera sees is shown in the top-left corner

The [regular vision API]({{ site.baseurl }}/programming/sr/vision/) relied on seeing specific faces of tokens, and used fiducial markers to do so. This simulator's vision system sees tokens in their entirety.

The `see` method will return a list of visible tokens in the arena. Each token has the following attributes:

id
:   The id of the marker. These match the ids defined in the [rules]({{ site.baseurl }}/rules/).

type
:   The type of token. Either `TokenType.SILVER` or `TokenType.GOLD`.

size
:   The size of the token, which is always `0.2`

position
:   The position of the token relative to the camera. The units are metres.

orientation
:   The orientation of the marker. **Work in progress**
