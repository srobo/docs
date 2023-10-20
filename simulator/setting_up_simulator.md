---
layout: page
title: Setting up the Simulator
---

Setting up the Simulator
========================

# Prerequisites


## Webots

Our simulator runs in a program called Webots.
In order to run the simulation you first need to install Webots.
You need to download [Webots from here](https://cyberbotics.com/#download) and install it.

The current supported version is "R2023b".


## Python

You will also need Python installed.
If it is not already installed this can be downloaded and installed from the [Python website](https://www.python.org/).

| Platform | Supported Python Version |
|----------|--------------------------|
| Windows  | 3.8-3.11 (64-bit)        |
| macOS    | 3.8-3.11                 |
| Linux    | 3.8-3.11                 |


### Python libraries

There are a small number of [external libraries]({{ site.baseurl }}/kit/brain_board/python_libraries) which are available on the physical kit that may be useful in the simulator.
If you want to use these in your code you will need to install these yourself.

Once you have downloaded the simulation, the libraries can be installed with the following command in a terminal.

~~~~~bash
pip install -r competition-simulator-<version>/libraries.txt
~~~~~


## Installing the simulation

The simulation for the SR2024 competition will be released at Kickstart.

<!--

1. Create a directory, perhaps called `simulation` where you will store your robot code.
2. [Download the simulation](https://github.com/srobo/competition-simulator/releases/download/TODO/competition-simulator-TODO.zip), the latest version is TODO, released on TODO.
3. Unzip the simulation as a folder inside the folder you created in the first step:
    ```
    simulation
    ├── competition-simulator-<version>
    │   ├── ...
    │   └─ libraries.txt
    │   └─ worlds
    │       └── Arena.wbt
    └── robot.py
    ```
    If there is not an existing `robot.py` an example one will be created when the simulator first runs.

4. Open the Webots IDE, then use that to open the `worlds/Arena.wbt` file.

You may receive a warning about your computer's GPU not being good enough, which can be ignored.

-->

<div class="info">
On recent versions of macOS you may need to give Webots permission to access the directory where you have extracted the simulation files.
</div>


### Changing your version of Python

Sometimes Webots will not automatically detect your installed Python so we need to change it.
When this happens Webots will print errors to its console and your robot will not move.

You will need the full path to the version of Python that you want to use.
This will vary based on the system you have.
One way to find the path is by launching Python and running the following code:

~~~~~ python
import sys
print(sys.executable)
~~~~~

Once you have the path you need to enter this into the Webots settings.
To do this on Windows, open webots and go to the menu **Tools** &rarr; **Preferences** &rarr; **General** &rarr; **Python command** and enter the path in that box.
Your Python path is likely similar to `C:\Users\<USERNAME>\AppData\Local\Programs\Python\Python311\python.exe` when using Python 3.11, where `<USERNAME>` is your login.

On Mac you can set the path to the Python version to use via **Webots** &rarr; **Preferences** <kbd>⌘</kbd><kbd>,</kbd>.
Your Python path is likely similar to `/Library/Frameworks/Python.framework/Versions/3.11/bin/python3` when using Python 3.11.

If you're still having problems, ask for help in [`#simulator-help`][simulator-help] in [Discord][discord].


## Updates

Occasionally, we may release an update to the simulation.
To update, you will need to delete the `competition-simulator-<version>` folder and replace it with the new version that can be downloaded using the above link.

If you need a specific version of the simulator, or want to see what changes have been made with each version, please see the [list of releases][release-list].

[discord]: {{ site.baseurl }}/tutorials/discord
[programming-help]: https://discord.com/channels/900501415548579842/900501416269971457
[simulator-help]: https://discord.com/channels/900501415548579842/900501416269971458
[release-list]: https://github.com/srobo/competition-simulator/releases
