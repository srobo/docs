---
layout: page
title: Vision
---

Vision
======

<div class="info">
This documentation refers to a feature which is only available on the physical robot kits.
</div>

The `sr.robot3` library contains support for detecting fiducial markers with the provided webcam.
Markers are attached to various items in the Student Robotics arena.
Each marker encodes a number in a machine-readable way, which means that robots can identify these objects.
For information on which markers codes are which, see the [markers page](./markers).

Using knowledge of the physical size of the different markers and the characteristics of the webcam,
your robot can calculate the position of markers in 3D space relative to the camera.
Therefore, if the robot can see a marker that is at a fixed location in the arena,
 a robot can calculate its exact position in the arena.

Under the hood, the vision system is based on [Zoloto](https://zoloto.readthedocs.io/), a wrapper around [OpenCV's ArUco library](https://docs.opencv.org/4.5.4/d5/dae/tutorial_aruco_detection.html), using the `36H11` marker set from [April](https://april.eecs.umich.edu/software/apriltag)

[Camera](#camera) {#camera}
===========================

The interface to the vision system is through the camera, accessible through `R.camera`.

see
:   Take a photo through the webcam, and return a list of [`Marker`](#Marker) instances, each of which describes one of the markers that were found in the image.

Here's an example that will repeatedly print out the distance to each arena marker that the robot can see:

~~~~~ python
from sr.robot3 import *
R = Robot()

while True:
    markers = R.camera.see()
    print("I can see", len(markers), "markers:")

    for m in markers:
        print(" - Marker #{0} is {1} metres away".format(m.id, m.distance))
~~~~~

see_ids
:   Take a photo through the webcam, and return a list of marker ids (**not** full `Marker` objects). This doesn't do the same [pose estimation](https://en.wikipedia.org/wiki/3D_pose_estimation) calculations as `see`, and so is much faster to run.

~~~~~ python
from sr.robot3 import *
R = Robot()

while True:
    marker_ids = R.camera.see_ids()

    if 0 in marker_ids:
        print("I can see marker 0!")
    else:
        print("I cannot see marker 0!")
~~~~~

save
:   Take a photo through the webcam, and save it to the provided location.

~~~~~ python
from sr.robot3 import *
R = Robot()

# `R.usbkey` is the path to your USB drive
marker_ids = R.camera.save(R.usbkey / "initial-view.png")
~~~~~

capture
:   Take a photo through the webcam, and return the image data as an OpenCV array.

<div class="info">
This feature is only available on version 2022.1.0 or later of the kit.
</div>

~~~~~ python
import cv2
from sr.robot3 import *
R = Robot()

frame = R.camera.capture()

# Flip the image with OpenCV
flipped = cv2.flip(frame, 0)
~~~~~

[Field of View](#fov) {#fov}
-------------------

The Logitech C500 has a [field of view][fov] of 72&deg; and the C270 has a field of view of 60&deg;.

[fov]: https://en.wikipedia.org/wiki/Field_of_view

[Definition of Axes](#axes) {#axes}
===================================

The vision system describes the markers it can see using three coordinate
systems. These are intended to be complementary to each other and contain
the same information in different forms.

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

The vision system is made up of a number of objects, the primary of which is the `Marker`:

[`Marker`](#Marker) {#Marker}
----------
A `Marker` object contains information about a *detected* marker.
It has the following attributes:

id
:   The id of the marker.

size
:   The physical size of the marker, as the vision system expects it.

pixel_centre
:   A [`Coordinate`](#Coordinate) describing the position of the centre of the marker.

pixel_corners
:   A list of 4 [`Coordinate`](#Coordinate) instances, each representing the position of the corners of the marker.

distance
:   The distance between the camera and the centre of the marker, in metres.

orientation
:   An [`Orientation`](#Orientation) instance describing the orientation of the marker.

spherical
:   A [`Spherical`](#Spherical) instance describing the position relative to the camera.

cartesian
:   A [`ThreeDCoordinates`][#ThreeDCoordinates] instance describing the absolute position of the marker relative to the camera.

[`Coordinate`](#Coordinate) {#Coordinate}
---------

A `Coordinate` object contains an `x` and `y` attribute. The exact meaning and unit of these attributes depends on its source.

[`ThreeDCoordinate`](#ThreeDCoordinate) {#ThreeDCoordinate}
---------

A `ThreeDCoordinate` object contains an `x`, `y` and `z` attribute. The exact meaning and unit of these attributes depends on its source.

[`Orientation`](#Orientation) {#Orientation}
---------------

An `Orientation` object describes the orientation of a marker.

![A visual representation of how the orientation axes work. Source: SourceBots]({{ site.baseurl }}/images/content/vision/yawpitchroll.png)

pitch
:   Rotation of the marker about the cartesian x-axis, in radians.

    Leaning a marker away from the camera increases the value of `rot_x`, while
    leaning it towards the camera decreases it. A value of 0 indicates that the
    marker is upright.

yaw
:   Rotation of the marker about the cartesian y-axis, in radians.

    Turning a marker clockwise (as viewed from above) increases the value of
    `rot_y`, while turning it anticlockwise decreases it. A value of 0 means
    that the marker is perpendicular to the line of sight of the camera.

roll
:   Rotation of the marker about the cartesian z-axis, in radians.

    Turning a marker anticlockwise (as viewed from the camera) increases the
    value of `rot_z`, while turning it clockwise decreases it. A value of 0
    indicates that the marker is upright.

rot_x
:   An alias for `pitch`.

rot_y
:   An alias for `yaw`.

rot_z
:   An alias for `roll`.

rotation_matrix
:   The rotation matrix represented by this orientation. A list of 3 lists, each with 3 items.

quaternion
:   The [Quarternion](https://kieranwynn.github.io/pyquaternion/#quaternion-features) instance represented by this orientation.

[`Spherical`](#Spherical) {#Spherical}
---------------

The spherical coordinates system has three values to specify a specific point in space.

![A visual representation of Spherical coordinates. Source: SourceBots]({{ site.baseurl }}/images/content/vision/spherical.png)

- r - The radial distance, the distance from the origin to the point, in metres.
- θ (theta) - The angle from the azimuth to the point, in radians.
- φ (phi) - The polar angle from the plane of the camera to the point, in radians.

rot_x
:   Rotation around the X-axis, in radians.

rot_y
:   Rotation around the Y-axis, in radians.

dist
:   Distance, in metres.

The camera is located at the origin, where the coordinates are (0, 0, 0).
