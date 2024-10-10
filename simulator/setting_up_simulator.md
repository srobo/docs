---
layout: page
title: Setting up the Simulator
---

Setting up the Simulator
========================

## Required Software

In order to use the simulator a few set-up steps need to be done.
First you need to install Python 3.8+ and Webots R2023b.

To install Python, you can download the latest version from the [Python website](https://www.python.org/downloads/). If you have already installed Python from a package manager, such as homebrew on MacOS, apt on Ubuntu, or the Windows store on Windows, you can skip this step.
![python download site]({{ site.baseurl }}/images/content/simulator/python-download.png)

We recommend using **Python 3.11** as it is the version which is used on your physical robot.

To install Webots, you can download the latest version from the [Webots website](https://cyberbotics.com/#download). Use the default settings when installing Webots.
![webots download site]({{ site.baseurl }}/images/content/simulator/webots-download.png)

## Simulator Bundle

Once you have installed these, you need to download our [simulator bundle](https://github.com/srobo/sbot_simulator/releases/download/2025.0.1/sbot-simulator-2025.0.1.zip).
This is a zip file containing the arena and the necessary files to allow the sr-robot3 library to be used in the simulator.

<div class="info" markdown="1">
The simulator bundle used for the [Pre-Kickstart Activities]({{ site.baseurl }}/docs/competitor_resources/pre_kickstart_activities) is available [here](https://github.com/srobo/sbot_simulator/releases/download/2025.0.1/sbot-simulator-2025.0.1.zip).
</div>

Once this has downloaded, extract the contents to an empty folder.
This folder will contain the arena as well as the code you will develop to control the robot.

<div class="info" markdown="1">
The contents of the folder should look like this:

![File contents of a release]({{ site.baseurl }}/images/content/simulator/release-contents.png)
</div>

- The `simulator` folder contains our code to support running your code in the simulator.
- The `zone_0` folder is where you will write your code, and it must contain a file called `robot.py`.
- The `setup.py` and `run_simulator.py` files are used to set up the environment and run the simulator respectively.
- The `readme.html` file contains a single page guide to using the simulator, similar to this one.

If the world supports multiple zones, you will see a `zone_1` folder, and so on.

<div class="info" markdown="1">
If you had previously downloaded the simulator, you can copy your code from the previous installation by copying just the `zone_0` folder from the old installation to the new one.
</div>

## Setting up the Environment

Now that you have downloaded and extracted the simulator, you need to set up the environment to run the simulator.
Since the simulator uses the sr-robot3 library, there are a series of python packages that need to be installed and Webots needs to be configured to use the correct version of Python.
We have provided a script that will set up this environment for you.

First, navigate to the folder you extracted the simulator into. This folder should contain a file called `setup.py`.
Run this script and it will set up the environment for you.
A terminal window will open and you will see the output of the script, if there are any errors displayed you should ask for help in [Discord][discord].

<div class="info" markdown="1">
In order to run the Python script, instead of opening the file you may need to right-click and select **Open with** &rarr; **Python**.

![Open with Python]({{ site.baseurl }}/images/content/simulator/open-with-python.png)
</div>

<div class="info">
On recent versions of macOS you may need to give Python permission to access the directory where you have extracted the simulation files.
</div>

This will create a contained python installation with the required libraries in a `venv` folder, this is called a virtual environment.
This also configures the Webots settings to use the correct version of Python.

## Updates

Occasionally, we may release an update to the simulation.
To update, download the new version of the simulator using the link above and extract it to an empty folder.
Then, run the `setup.py` script again to update the environment.

If you want to use code from a previous version of the simulator, you can copy the `zone_0` folder from the old installation to the new one.

If you need a specific version of the simulator, or want to see what changes have been made with each version, please see the [list of releases][release-list].

[discord]: {{ site.baseurl }}/tutorials/discord
[release-list]: https://github.com/srobo/sbot_simulator/releases
