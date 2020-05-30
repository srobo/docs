---
layout: page
title: Competition Simulator
---

Competition Simulator
============

![]({{ site.baseurl }}/resources/competition-simulator/arena.png)

For SR2020, a virtual competition will be run using a brand new simulator.

<div class="info">
  This is different to the <a href="/docs/programming/simulator/">regular simulator</a>.
</div>

## Installation

### Prerequisites

This simulation is based in [Webots](https://cyberbotics.com/#download), which will need to be downloaded and installed.

You will also need Python installed. The simulator supports >=3.5. Additional external libraries are not supported.

### Installing the simulation

1. [Download the simulation](https://github.com/srobo/competition-simulator/archive/0.1.0.zip), and unzip it somewhere on your computer.
2. Using the Webots IDE, open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

#### Changing your version of Python

If webots is picking up the incorrect version of Python, you'll need to change it. This can be done using `Tools > Preferences > General > Python command`. You'll need to ensure a matching version of Python is installed.

## Overview

Within the Webots IDE, there are a few different panels:

- In the centre of your screen is the 3D simulated view of the arena
- On the left is a tree hierarchy of all elements in this "world"
- At the bottom is your console
- At the top are your general controls which include the time controls. Press the centre play button to run the simulation at normal speed.

### Useful links

- [Camera Controls](https://www.cyberbotics.com/doc/guide/the-3d-window#navigation-in-the-scene)
- [Graphics settings](https://www.cyberbotics.com/doc/guide/preferences#opengl) (Useful if Webots is running slowly)

## Developing your code

On first run, the robot will execute an example program for convenience. On first run, this will be copied to the directory `competition-simulator` is stored in:

```
.
├── competition-simulator
│   ├── ...
│   └─ worlds
│       └── Arena.wbt
└── robot.py
```

Your code should be developed in `robot.py`.


<div class="warning">
  Only your controller code will be present in the competition environment.
</div>

<div class="warning">
  You will be responsible for backing up and versioning your code, and collaborating with your fellow team members. The <a href="https://studentrobotics.org/ide/">IDE</a> is unsuitable for this simulator.
</div>

### Updates

Occasionally, we may release an update to the simulation. To update, you will need to delete the `competition-simulator-master` directory, and re-download it using the above link.

## Robot

![]({{ site.baseurl }}/resources/competition-simulator/robot-front.png)

This is the pre-built robot used in the simulator, which supports the SR API. Building robot chassis in Webots is complicated, and we expect teams to use the pre-built robot.

The robot has an array of sensors, a vision system, and a gripper to pick up tokens.

## Programming Interface

Unless otherwise stated, the simulator’s API is the same as the real SR API described in the [programming docs]({{ site.baseurl }}/programming/).

### Motors

Your robot has 2 motor boards attached, each with 2 motors. Board `0` has the left wheel in port `m0`, and the right wheel in `m1`. Board `1` has the gripper lift motor in `m0`, and the finger motors in `m1`.

### Ruggeduino

Your robot has 5 microswitches and 6 distance sensors, attached to the digital and analogue pins respectively. These are all attached to a single ruggeduino.

Because these sensors are pre-attached to the ruggeduino, you do not need to set its `pin_mode`.

#### Microswitches

The microswitches are attached to digital pins 2-6:

- Front
- Back
- Between gripper fingers
- Left gripper finger
- Right gripper finger

These are shown as red coloured blocks on the robot. Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is current actuated.

#### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object. These are attached to analogue pins 0-5:

- Front Left
- Front Right
- Left
- Right
- Back Left
- Back Right

These are shown as blue coloured blocks on the robot. The `analogue_read` method will return the distance in metres, however only measure up to 30cm.

### Camera

Your robot has a camera, which is attached to the top of your robot. A live preview of what the camera sees is shown in the top-left corner. The vision system uses Webots' object recognition, rather than [fiducial markers]({{ site.baseurl }}/programming/sr/vision/markers/).

The `see` method will return a list of visible markers in the arena, but doesn't allow a resolution argument. Each token is as described in the [vision docs]({{ site.baseurl }}/programming/sr/vision/), except:

- `Marker.info.marker_type` will be one of `MarkerType.SILVER`, `MarkerType.GOLD` or `MarkerType.ARENA`. `MarkerType` can be imported with `from sr.robot import MarkerType`
- The following attributes are not available:
  - `Marker.res`
  - `Point.image`
