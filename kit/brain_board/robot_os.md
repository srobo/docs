---
layout: page
title: Student Robotics OS
---


# Student Robotics OS

The Raspberry Pi runs a custom operating system that contains the Student Robotics software.
It's based on [Raspberry Pi OS](https://www.raspberrypi.com/documentation/computers/os.html) (`2023-05-03`).
The OS contains a set of pre-installed python libraries that you can use, the list of which can be found [here](./python_libraries).


## Updates

Keeping your kit up to date is very important, it enables us to fix bugs, as well as deploy new features.

Below is a list of the versions released, once you have downloaded the file you need, refer to the steps on the [tutorial page]({{ site.baseurl }}/tutorials/update_brain) to apply the update.

Each update file is a complete upgrade and contains all the changes of those before it.
If you need to jump up multiple versions, you can do so by just using the latest version.


## OS Versions

{% if site.data.kit_versions.size > 0 %}
{% include updates-list.html %}
{% else %}
There are currently no updates available.
{% endif %}
