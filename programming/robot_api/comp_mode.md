---
layout: page
title: Competition Mode
---

# Competition Mode


## What is Comp Mode

During a competition match a Competition Mode USB is inserted into a spare USB port on your robot (See the [kit assembly guide]({{ site.baseurl }}/tutorials/assembly) for details on the spare USB port you need to leave).
This will instruct your robot that it is in competition mode and will enable a game timeout, disable the WiFi and update certain `robot` attributes.


## Effects of Comp Mode

* Enabling Game timeout

    When in competition mode the robot will automatically stop at the end of a match, where the duration of a match is defined in the [rules]({{ site.baseurl }}/tutorials/assembly).
    The duration of the match is defined from when the start button is pressed.

* Disabling of WiFi and Web interface

    During competition matches remote control of robots is forbidden ([rules]({{ site.baseurl }}/tutorials/assembly)), so the WiFi and web interface are disabled to ensure a fair game.

* Updating of match-specific `robot` attributes

    Certain robot attributes will change when in comp mode, these can be used to change your robot's behaviour.
    The affected attributes are:

    mode
    :   Whether the robot is running in competition mode.
        When in a competition match, this will be `COMP`, and at all other times this will be `DEV`.

    zone
    :   The number of the scoring zone that the robot is associated with.
        Between `0` and `3`.

        The zone you are in defines which arena markers are near your scoring zone.
        You can use the knowledge of your zone to compensate for this, so your robot behaves correctly in all starting positions.
        See the [rules]({{ site.baseurl }}/tutorials/assembly) for where the scoring zones and arena markers are positioned.
