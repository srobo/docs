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

You need to download and install [Webots](https://cyberbotics.com/#download) (the download is around 300MB).
This is the platform we run our simulation in.
Only version "R2022b" of Webots is supported.

#### Python Version

You will also need Python installed.

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.8-3.10 (64-bit)        |
| macOS    | 3.8-3.10                 |
| Linux    | 3.8-3.10                 |

### Installing the simulation

The simulation for SR2023 is not yet available, it will be made available during [Kickstart](https://studentrobotics.org/events/sr2023/southampton-kickstart/).

<!--

1. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/sr2022.2/competition-simulator-sr2022.2.zip), and unzip it somewhere on your computer.
2. Using the Webots IDE, open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

-->

#### Changing your version of Python

If webots is picking up the incorrect version of Python, you'll need to change it.
This can be done using **Tools** &rarr; **Preferences** &rarr; **General** &rarr; **Python command** (or **Webots** &rarr; **Preferences** <kbd>⌘</kbd><kbd>,</kbd> on a Mac).
You'll need to ensure a matching version of Python is installed. If you're still
having problems, ask for help in [`#simulator-help`][simulator-help] in
[Discord][discord].

On Windows your Python path is likely `C:\Users\<USERNAME>\AppData\Local\Programs\Python\Python39\python.exe` where `<USERNAME>` is your login.
On Mac your Python path is likely `/Library/Frameworks/Python.framework/Versions/3.9/bin/python3` when using Python 3.9.

Currently the simulator does not work properly on Apple M1 Macs.

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

These differences mean that your code will need to use a different mechanism to
find the current time or to sleep within the simulation. Find out more by
heading over to the [simulator programming docs](./programming).

## Programming

Once you have the simulator installed you can begin [programming your robot](./programming) in the simulator.
