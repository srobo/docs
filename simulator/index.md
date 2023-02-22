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

Versions "R2022b" and "R2023a" of Webots are supported.
*Note*: versions of the simulation prior to sr2023.3 did not support Webots "R2023a".

#### Python Version

You will also need Python installed.

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.8-3.10 (64-bit)        |
| macOS    | 3.8-3.10                 |
| Linux    | 3.8-3.10                 |

There are a small number of [external libraries]({{ site.baseurl }}/programming/python/libraries#simulator)
which will be available to your robot code during the competition. Note that for
local development you will need to install these yourself.

### Installing the simulation

1. Create a directory, perhaps called `simulation` where you will store your robot code.
2. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/sr2023.5/competition-simulator-sr2023.5.zip), the latest version is sr2023.5, released on 2023-02-22.
3. Unzip the simulation as a subdirectory of the directory you created in the first step:
    ```
    simulation
    ├── competition-simulator-<version>
    │   ├── ...
    │   └─ worlds
    │       └── Arena.wbt
    └── robot.py
    ```
    If there is not an existing `robot.py` an example one will be created when the simulator first runs.

4. Using the Webots IDE, open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

<div class="info">
  On recent versions of macOS you may need to give Webots permission to access the directory where you have extracted the simulation files.
</div>

#### Changing your version of Python

If webots is not picking any version of Python or is picking up the wrong one then you'll need to change it.
When this happens Webots will print errors to its console and your robot will not move.

You will need the full path to the version of Python that you want to use.
This will vary based on the system you have.
One way to find the path is by launching the version of Python that you want to
use and running the following code:

~~~~~ python
import sys
print(sys.executable)
~~~~~

On Windows you can set the path to the Python version to use in Webots UI via
**Tools** &rarr; **Preferences** &rarr; **General** &rarr; **Python command**.
Your Python path is likely similar to `C:\Users\<USERNAME>\AppData\Local\Programs\Python\Python39\python.exe` when using Python 3.9, where `<USERNAME>` is your login.

On Mac you can set the path to the Python version to use via **Webots** &rarr; **Preferences** <kbd>⌘</kbd><kbd>,</kbd>.
Your Python path is likely similar to `/Library/Frameworks/Python.framework/Versions/3.9/bin/python3` when using Python 3.9.

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
