---
layout: page
title: Competition Mode
---

# Competition Mode


## What is Comp Mode

During a competition match a Competition Mode USB is inserted into a spare USB port on your robot (See the [kit assembly guide]({{ site.baseurl }}/tutorials/assembly) for details on the spare USB port you need to leave).
This will instruct your robot that it is in competition mode and will have a number of effects, which are detailed below.


## Effects of Comp Mode

* Enabling Game timeout

    When in competition mode the robot will automatically stop at the end of a match, where the duration of a match is defined in the [rules]({{ site.baseurl }}/rules).
    The duration of the match is defined from when the start button is pressed.

* Disabling of WiFi and Web interface

    During competition matches remote control of robots is forbidden ([rules]({{ site.baseurl }}/rules)), so the WiFi and web interface are disabled to ensure a fair game.

* Updating of match-specific `robot` attributes

    Certain robot attributes will change when in comp mode, these can be used to change your robot's behaviour.
    The affected attributes are:

    - `robot.mode`
    - `robot.zone`

    See [other robot attributes]({{ site.baseurl }}/programming/robot_api/#other-robot-attributes) for further details of these attributes.
