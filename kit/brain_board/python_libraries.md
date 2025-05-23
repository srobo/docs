---
redirect_from:
  - /programming/python/libraries
layout: page
title: Available Python Libraries
---

<!-- Simulator libraries https://github.com/srobo/competition-simulator/blob/main/libraries.txt -->
<!-- Robot image libraries https://github.com/srobo/robot-image/blob/main/files/python/libraries.txt -->
<!-- Robot image requirements https://github.com/srobo/robot-image/blob/main/files/python/requirements.txt -->

# Available Python Libraries

Out of the box, Python 3.11 comes with a large number of built-in libraries (known as its [standard library](https://docs.python.org/3.11/library/index.html)), useful for a variety of different tasks. All modules in the standard library are available to use, both on the robotics kit and simulator.

## Additional Libraries

Python has a rich ecosystem of 3rd-party packages available for use outside the standard library, however these need to be installed manually. We've pre-selected a few useful libraries and made them available for use in your robot's software.

If you wish to use a library that isn't in the list, get in contact with us on Discord and have a chat with us about it.

<div class="info" markdown="1">
Note that for local development in the simulator you will need to install the libraries yourself.
Look at the guide on [setting up the simulator]({{ site.baseurl }}/simulator/setting_up_simulator) to find out how to do this.
</div>

### Robot Kit

The following python libraries are installed and available on the brain board:

<!-- cspell:disable -->
* [debugpy 1.7.0](https://pypi.org/project/debugpy)
* [flask 2.3.3](https://pypi.org/project/flask)
* [matplotlib 3.7.2](https://pypi.org/project/matplotlib)
* [networkx 3.1](https://pypi.org/project/networkx)
* [numpy 1.24.4](https://pypi.org/project/numpy)
* [opencv-python-headless 4.8.0.76](https://pypi.org/project/opencv-python-headless)
* [pandas 2.0.3](https://pypi.org/project/pandas)
* [pillow 10.0.0](https://pypi.org/project/pillow)
* [scikit-learn 1.3.0](https://pypi.org/project/scikit-learn)
* [scipy 1.10.1](https://pypi.org/project/scipy)
* [shapely 2.0.1](https://pypi.org/project/shapely)
* [sr-robot3 2024.0.1](https://pypi.org/project/sr-robot3)
<!-- cspell:enable -->


### Simulator differences

Generally we will try to keep the libraries available in the simulator the same as what is available on the physical robot.
However, the versions of the libraries differ slightly to allow for the simulator to run on a wider range of systems.
The list below outlines the libraries not available in the simulator:

<!-- cspell:disable -->
* `debugpy` is not available in the simulator
<!-- cspell:enable -->
