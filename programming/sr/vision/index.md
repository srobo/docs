---
layout: page
title: Vision
---

Vision
======

The `sr.robot` library contains support for detecting libkoki markers with the provided webcam.
Markers are attached to various items in the Student Robotics arena.
Each marker encodes a number in a machine-readable way, which means that robots can identify these objects.
For information on which markers codes are which, see the [markers page](/docs/programming/sr/vision/markers).

Using knowledge of the physical size of the different markers and the characteristics of the webcam,
 libkoki can calculate the position of markers in 3D space relative to the camera.
Therefore, if the robot can see a marker that is at a fixed location in the arena,
 a robot can calculate its exact position in the arena.

The `sr.robot` library provides all of this power through a single function, `R.see`:

~~~~~ python
from sr.robot import *
R = Robot()
markers = R.see()
~~~~~

When called, this function takes a photo through the webcam and searches for markers within it.
It returns a list of `Marker` objects, each of which describes one of the markers that were found in the image.
A detailed description of the attributes of Marker objects is provided [later in this page](#Marker).

Here's an example that will repeatedly print out the distance to each arena marker that the robot can see:

~~~~~ python
from sr.robot import *
R = Robot()

while True:
    markers = R.see()
    print("I can see", len(markers), "markers:")

    for m in markers:
        if m.info.marker_type == MARKER_ARENA:
            print(" - Marker #{0} is {1} metres away".format(m.info.code, m.dist))
~~~~~

[Choosing Resolution](#ChoosingResolution) {#ChoosingResolution}
-------------------

By default, the `R.see` function will take a photo at a resolution of 800x600.
The resolution that this image is taken at can be changed using the optional `res` argument:

~~~~~ python
# Take a photo at 1280 x 1024
markers = R.see( res=(1280,1024) )
~~~~~

There are currently two kinds of webcam issued with SR kit: the Logitech C500 and C270.
They support the following resolutions:

|   Resolution              | C500  | C270  |
|---------------------------|-------|-------|
|  160 x 120                | yes   | yes   |
|  176 x 144                | yes   | yes   |
|  320 x 176                |       | yes   |
|  320 x 240                | yes   | yes   |
|  352 x 288                | yes   | yes   |
|  432 x 240                |       | yes   |
|  544 x 288                |       | yes   |
|  640 x 360                | yes   |       |
|  640 x 400                | yes   |       |
|  640 x 480                | yes   | yes   |
|  752 x 416                |       | yes   |
|  800 x 448                |       | yes   |
| **800 x 600** (Default)   | yes   | yes   |
|  864 x 480                |       | yes   |
|  960 x 544                |       | yes   |
|  960 x 720                | yes   | yes   |
|  1024 x 576               |       | yes   |
|  1280 x 720               | yes   | yes   |
|  1280 x 800               | yes   |       |
|  1280 x 960               |       | yes   |
|  1280 x 1024              | yes   |       |

There are advantages and disadvantages to switching resolution.
Smaller images will process faster, but markers will be less likely to be detected within them.
Additionally, the act of changing resolution takes a significant amount of time.
The optimum resolution to use in a given situation is best determined through experiment.

The Logitech C500 has a [field of view][fov] of 72&deg; and the C270 has a field of view of 60&deg;.

[fov]: https://en.wikipedia.org/wiki/Field_of_view

[Definition of Axes](#axes) {#axes}
===================================

The vision system describes the markers it can see using three coordinate
systems. These are intended to be complementary to each other and contain
the same information in different forms.

The individual coordinate systems used are detailed below on the
[`Point`](#Point) object, which represents a point in space.
Both it and the [`Orientation`](#Orientation) object provide further
details about what measurements of rotation or position mean for their
attributes.

The axis definitions match those in common use, as follows:

x-axis
:   The horizontal axis running left-to-right in front of the camera.
    Rotation about this axis is equivalent to leaning towards or away from
    the camera.

y-axis
:   The vertical axis running top-to-bottom in front of the camera.
    Rotation about this axis is equivalent to turning on the spot,
    to the left or right.

z-axis
:   The axis leading away from the camera to infinity.
    Rotation about this axis is equivalent to being rolled sideways.

<div class="info">
Note that the axes are all defined relative to the camera. Since we have
no way to know how you've mounted your camera, you may need to account
for that in your usage of the vision system's data.
</div>

[Objects of the Vision System](#vision_objects) {#vision_objects}
==============================

[`Marker`](#Marker) {#Marker}
----------
A `Marker` object contains information about a *detected* marker.
It has the following attributes:

info
:   A [`MarkerInfo`](#MarkerInfo) object containing information about the type of marker that was detected.

centre
:   A [`Point`](#Point) describing the position of the centre of the marker.

vertices
:   A list of 4 [`Point`](#Point) instances, each representing the position of the black corners of the marker.

dist
:   An alias for `centre.polar.length`

rot_y
:   An alias for `centre.polar.rot_y`

orientation
:   An [`Orientation`](#Orientation) instance describing the orientation of the marker.

res
:   The resolution of the image that was taken from the webcam.
    A 2-item tuple: (width, height).

timestamp
:   The timestamp at which the image was taken (a float).

[`MarkerInfo`](#MarkerInfo) {#MarkerInfo}
--------------

The `MarkerInfo` object contains information about a marker.
It has the following attributes:

code
:   The numeric code of the marker.

marker_type
:   The type of object that this marker represents.<br />
    One of:

    * `MARKER_ARENA`
    * `MARKER_TOKEN_SILVER`
    * `MARKER_TOKEN_GOLD`

offset
:   The offset of the numeric code of the marker from the lowest numbered marker of its type.
    For example: markers 28 and 29, which are the lowest numbered markers that represent robots, have offsets of 0 and 1 respectively.

size
:   The size of the marker in metres.
    This is the length of the side of the main black body of the marker.

[`Point`](#Point) {#Point}
---------

A `Point` object describes a position in three different ways.
These are accessed through the following attributes:

image
:   The pixel coordinates of the point in the image, with the origin (0,0) in the top-left of the image.
    This has two attributes: `x` and `y`.

world
:   The [Cartesian coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) of the point in 3D space.
    This has three attributes: `x`, `y`, and `z`, each of which specifies a distance in metres.
    Positions in front of, to the right, or above the camera are positive.
    Positions to the left or below are negative.

polar
:   The [polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system) of the point in 3D space.<br />
    This has three attributes:

    length
    :   The distance to the point.

    rot_x
    :   Rotation about the x-axis in degrees.
        Positions above the camera are positive.

    rot_y
    :   Rotation about the y-axis in degrees.
        Positions to the right of the camera are positive.

    For example, the following code displays the polar coordinate of a `Point` object `p`:

    ~~~~~ python
    print("length", p.polar.length)
    print("rot_x", p.polar.rot_x)
    print("rot_y", p.polar.rot_y)
    ~~~~~

[`Orientation`](#Orientation) {#Orientation}
---------------

An `Orientation` object describes the orientation of a marker.  It has three attributes:

rot_x
:   Rotation of the marker about the x-axis.

    Leaning a marker away from the camera increases the value of `rot_x`, while
    leaning it towards the camera decreases it. A value of 0 indicates that the
    marker is upright.

rot_y
:   Rotation of the marker about the y-axis.

    Turning a marker clockwise (as viewed from above) increases the value of
    `rot_y`, while turning it anticlockwise decreases it. A value of 0 means
    that the marker is perpendicular to the line of sight of the camera.

rot_z
:   Rotation of the marker about the z-axis.

    Turning a marker anticlockwise (as viewed from the camera) increases the
    value of `rot_z`, while turning it clockwise decreases it. A value of 0
    indicates that the marker is upright.

<!---
It would be nice to be able to include here what happens to the values:
* what about if a marker is upside down but also leant forwards
* if a marker is seen at a side angle, but is also leant forwards, does
  the value of rot_x measure its lean _towards the camera_ or from its
  _own vertical_?
-->
