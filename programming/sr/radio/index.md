---
layout: page
title: Radio
---

Radio
=====

<div class="info">
This documentation refers to a feature which is only available within the simulator.
</div>

The `sr.robot` library contains support for detecting radio transmitters with the simulated radio unit on the robot.
Radio transmitters are attached to various items in the Student Robotics arena.
Each transmitter encodes their identity in a machine-readable way, which means that robots can identify these objects.

Using the signal strength of received radio signals, the robot api is able to
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

When called, the `sweep` function uses the radio reciever as a secondary radio, searching for nearby transmitters.
It returns a list of `Transmitter` objects, each of which describes one of the transmitters that were found within range.
A detailed description of the attributes of Transmitter objects is provided [later in this page](#Transmitter).

Here's an example that will repeatedly print out the distance to each arena transmitter that the robot can see:

~~~~~ python
from sr.robot import *
R = Robot()

while True:
    transmitters = R.radio.sweep()
    print("I found", len(transmitters), "transmitters:")

    for tx in transmitters:
        if tx.info.transmitter_type == TransmitterType.BEACON:
            print(" - Transmitter #{0} is {1} metres away".format(
                tx.info.code,
                tx.dist,
            ))
~~~~~

[Definition of Axes](#axes) {#axes}
===================================

<!-- Note: these are the same as the camera. We should keep these in sync. -->

The radio system describes the transmitters it can see using three coordinate
systems. These are intended to be complementary to each other and contain the
same information in different forms.

The individual coordinate systems used are detailed below on the
[`Point`](#Point) object, which represents a point in space.

The axis definitions match those in common use, as follows:

x-axis
:   The horizontal axis running left-to-right in front of the robot.
    Rotation about this axis is equivalent to leaning towards or away from
    the robot.

y-axis
:   The vertical axis running top-to-bottom in front of the robot.
    Rotation about this axis is equivalent to turning on the spot,
    to the left or right.

z-axis
:   The axis leading away from the front of the robot to infinity.
    Rotation about this axis is equivalent to being rolled sideways.

[Objects of the Radio System](#radio_objects) {#radio_objects}
==============================

[`Transmitter`](#Transmitter) {#Transmitter}
----------
A `Transmitter` object contains information about a *detected* transmitter.
It has the following attributes:

info
:   A [`TransmitterInfo`](#TransmitterInfo) object containing information about the type of transmitter that was detected.

position
:   A [`Point`](#Point) describing the position of the transmitter.

dist
:   An alias for `position.polar.length`

rot_y
:   An alias for `position.polar.rot_y`

timestamp
:   The timestamp at which the sweep happened (a float).

[`TransmitterInfo`](#TransmitterInfo) {#TransmitterInfo}
--------------

The `TransmitterInfo` object contains information about a transmitter.
It has the following attributes:

code
:   The numeric code of the transmitter.

transmitter_type
:   The type of object that this transmitter represents.<br />
    The possible values of this are part of the `TransmitterType` enum:

    * `TransmitterType.BEACON`
    * `TransmitterType.TOWER`
    * `TransmitterType.ROBOT`

offset
:   The offset of the numeric code of the transmitter from the lowest numbered transmitter of its type.
    For example: transmitters 2 and 3, which are the lowest numbered transmitters that represent towers, have offsets of 0 and 1 respectively.

[`Point`](#Point) {#Point}
---------

<!-- Note: this is almost identical to the equivalent type in the vision system. We should keep these in sync. -->

A `Point` object describes a position in three different ways.
These are accessed through the following attributes:

<!-- Deliberately no `image` member -->

world
:   The [Cartesian coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) of the point in 3D space.
    This has three attributes: `x`, `y`, and `z`, each of which specifies a distance in metres.
    Positions in front of, to the right, or above the robot are positive.
    Positions to the left or below are negative.

polar
:   The [polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) of the point in 3D space.<br />
    This has three attributes:

    length
    :   The distance to the point.

    rot_x
    :   Rotation about the x-axis in degrees.
        Positions above the radio are positive.

    rot_y
    :   Rotation about the y-axis in degrees.
        Positions to the right of the radio are positive.

    For example, the following code displays the polar coordinate of a `Point` object `p`:

    ~~~~~ python
    print("length", p.polar.length)
    print("rot_x", p.polar.rot_x)
    print("rot_y", p.polar.rot_y)
    ~~~~~
