---
redirect_from:
  - /competition-simulator
  - /programming/simulator
layout: page
title: Simulator
---

# Simulator

## Installation

### Prerequisites

You need to download and install [Webots](https://cyberbotics.com/#download) (the download is around 400MB). This is the platform we run our simulation in. We recommend version "R2021b" of Webots.

#### Python Version

You will also need Python installed.

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.7+ (64-bit)            |
| macOS    | 3.7+                     |
| Linux    | 3.7+                     |

There are a small number of [external libraries]({{ site.baseurl }}/programming/python/libraries)
which will be available to your robot code during the competition. Note that for
local development you will need to install these yourself.

### Installing the simulation

1. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/sr2021.10/competition-simulator-sr2021.10.zip), and unzip it somewhere on your computer.
2. Using the Webots IDE, open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

#### Changing your version of Python

If webots is picking up the incorrect version of Python, you'll need to change it.
This can be done using `Tools > Preferences > General > Python command`.
You'll need to ensure a matching version of Python is installed. If you're still
having problems, ask for help in [`#simulator-help`][simulator-help] in
[Discord][discord].

### Updates

Occasionally, we may release an update to the simulation. To update, you will need to delete the `competition-simulator-<version>` directory, and re-download it using the above link.

If you need a specific version of the simulator, or want to see what changes
have been made with each version, please see the
[list of releases](https://github.com/srobo/competition-simulator/releases).

[discord]: {{ site.baseurl }}/team_admin/discord
[programming-help]: https://discord.com/channels/900501415548579842/900501416269971457
[simulator-help]: https://discord.com/channels/900501415548579842/900501416269971458

## Overview

Within the Webots IDE, there are a few different panels:

- In the centre of your screen is the 3D simulated view of the arena
- On the left is a tree hierarchy of all elements in this "world"
- At the bottom is the console, where output from your robot code will be displayed
- At the top are your general controls which include the time controls. Press the centre play button to run the simulation at normal speed.

### Useful links

- [Camera Controls](https://www.cyberbotics.com/doc/guide/the-3d-window#navigation-in-the-scene)
- [Graphics settings](https://www.cyberbotics.com/doc/guide/preferences#opengl) (Useful if Webots is running slowly)

## Programming

Once you have the simulator installed you can begin [programming your robot](./programming) in the simulator.
