---
layout: page
title: Radio
---

# Radio

<div class="info">
This documentation refers to a feature which is only available within the simulator.
</div>

The `sr.robot` library contains support for using a simulated radio unit on the robot.
Radio transmitters and receivers are attached to various items in the Student Robotics arena.
Each transmitter encodes their identity in a machine-readable way, which means that receivers can identify these objects.

## [Detecting other stations](#detecting-other-stations) {#detecting-other-stations}

Using the signal strength and bearing of the received radio signals, you are able to
determine the distance and direction of a transmitter in 3D space relative to
the radio. Therefore, if the robot can detect transmitters that is at a fixed
location in the arena, a robot can calculate its exact position in the arena.

The `sr.robot` library provides this through a `radio` attached to your `Robot`,
which is can perform a `sweep` to detect transmitters:

~~~~~ python
from sr.robot import *
R = Robot()
transmitters = R.radio.sweep()
~~~~~

When called, the `sweep` function uses the radio reciever to scan for nearby transmitters.
It returns a list of `Target` objects, each of which describes one of the transmitters that were found within range.
A detailed description of the attributes of `Target` objects is provided [later in this page](#Target).

Here's an example that will repeatedly print out the bearing and signal stength of each arena transmitter in range:

~~~~~ python
from sr.robot import *
R = Robot()

while True:
    transmitters = R.radio.sweep()
    print("I found", len(transmitters), "transmitter(s):")

    for tx in transmitters:
        print(" - Transmitter {0} Bearing: {1} with a signal strength of {2}".format(
            tx.target_info.station_code,
            tx.bearing,
            tx.signal_strength,
        ))
~~~~~

<!-- TODO: radio tranmission here -->

## [Objects of the Radio System](#radio_objects) {#radio_objects}

### [`Target`](#Target) {#Target}

A `Target` object contains information about a _detected_ transmitter.
It has the following attributes:

target_info
: A [`TargetInfo`](#TargetInfo) object containing information about the transmitter that was detected.

signal_strength
: The measured strength of the signal as a float.

bearing
: A float giving the angle to the `Target` in radians.

### [`TargetInfo`](#TargetInfo) {#TargetInfo}

The `TargetInfo` object contains information about a transmitter.
It has the following attributes:

station_code
: The two character identifier of the transmitter.

owned_by
: The zone id of the robot that currently owns the stations territory. A `None` value indicates an unclaimed territory.
  <br>
  Remember that you can find out which zone your robot is in using <a href="/docs/programming/sr/#OtherRobotAttributes"><code>R.zone</code></a>.
