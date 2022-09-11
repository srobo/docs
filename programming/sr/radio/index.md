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

Each territory in the arena transmits its identity and information about who has
claimed it several times per second.

Using the signal strength and bearing of the received radio signals, you are able to
determine the distance and direction of a transmitter in 2D space relative to
the radio. Therefore, if the robot can detect transmitters that is at a fixed
location in the arena, a robot can calculate its exact position in the arena.

The `sr.robot` library provides this through a `radio` attached to your `Robot`,
which is can perform a `sweep` to detect transmitters:

~~~~~ python
from sr.robot import *
R = Robot()
transmitters = R.radio.sweep()
~~~~~

When called, the `sweep` function uses the radio receiver to scan for nearby transmitters.
It returns a list of `Target` objects, each of which describes one of the transmitters that were found within range.
A detailed description of the attributes of `Target` objects is provided [later in this page](#Target).

Here's an example that will repeatedly print out the bearing and signal strength of each arena transmitter in range:

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

## [Claiming Territories](#claiming-territories) {#claiming-territories}

When your radio's antenna is within a territory, you are within range to claim it.
Claiming a territory requires your robot sending two signals to the tower,
two seconds apart. You must ensure that your robot is within the range of the
territory when both of the signals are sent.

There are two approaches to claiming a territory, depending upon how much
control you need over your robots behaviour while it is making a claim.

The simplest approach is to use the `claim_territory` method, which will take
care of sending the signals as well as ensuring that the proper amount of time
passes between them:

~~~~ python
R.radio.claim_territory()
~~~~

This function takes a couple of seconds to complete and you must stay within
range of the territory for the whole duration it is running for your claim to
succeed.

No information is returned from `claim_territory`.

Alternatively if you would like to be able to control your robot while also
making a territory claim, you can instead manage the claim signals directly:

~~~~ python
R.radio.begin_territory_claim()

# Do stuff here

R.radio.complete_territory_claim()
~~~~

Note that when using `begin_territory_claim` and `complete_territory_claim` you
are also responsible for ensuring that the proper amount of time (two seconds)
passes between the begin and the complete signals.

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
  <br>
  A bearing of `0` is in front of the robot. Positive bearings are to the robot's right.

### [`TargetInfo`](#TargetInfo) {#TargetInfo}

The `TargetInfo` object contains information about a transmitter.
It has the following attributes:

station_code
: The two character identifier of the transmitter.
  Valid values are members of the `StationCode` enum.
  ~~~~~ python
  from sr.robot import StationCode

  for station in StationCode:
      print(station)
  ~~~~~

owned_by
: The zone id of the robot that currently owns the stations territory. A `None` value indicates an unclaimed territory.
  <br>
  Remember that you can find out which zone your robot is in using <a href="/docs/programming/sr/#OtherRobotAttributes"><code>R.zone</code></a>.
