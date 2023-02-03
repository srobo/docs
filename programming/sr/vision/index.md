---
layout: page
title: Vision
---

Vision
======

The `sr.robot3` library contains support for detecting fiducial markers with the provided webcam.
Markers are attached to various items in the Student Robotics arena.
Each marker encodes a number in a machine-readable way, which means that robots can identify these objects.
For information on which markers codes are which, see the [markers page](./markers).

Using knowledge of the physical size of the different markers and the characteristics of the webcam,
your robot can calculate the position of markers in 3D space relative to the camera.
Therefore, if the robot can see a marker that is at a fixed location in the arena,
 a robot can calculate its exact position in the arena.

Under the hood, the vision system is based on [Zoloto](https://zoloto.readthedocs.io/), a wrapper around [OpenCV's ArUco library](https://docs.opencv.org/4.5.4/d5/dae/tutorial_aruco_detection.html), using the `36H11` marker set from [April](https://april.eecs.umich.edu/software/apriltag).

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
        print(" - Marker #{0} is {1} metres away".format(m.id, m.distance / 1000))
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
:   A [`PixelCoordinates`](#PixelCoordinates) describing the position of the centre of the marker.

pixel_corners
:   A list of 4 [`PixelCoordinates`](#PixelCoordinates) instances, each representing the position of the corners of the marker.

distance
:   The distance between the camera and the centre of the marker, in millimetres.

orientation
:   An [`Orientation`](#Orientation) instance describing the orientation of the marker.

spherical
:   A [`SphericalCoordinate`](#SphericalCoordinate) instance describing the position relative to the camera.

cartesian
:   A [`CartesianCoordinates`](#CartesianCoordinates) instance describing the position of the marker relative to the camera.

<a id="Coordinate"/>

[`PixelCoordinates`](#PixelCoordinates) {#PixelCoordinates}
---------

A named tuple of `x` and `y` coordinates for the point, in pixels relative to the top left of the image.

~~~~~ python
print(marker.pixel_centre.x, marker.pixel_centre.y)
~~~~~

<a id="ThreeDCoordinate"/>

[`CartesianCoordinates`](#CartesianCoordinates) {#CartesianCoordinates}
---------

A named tuple of `x`, `y` and `z` coordinates for the point, in millimeters relative to the camera.
Increasing values are to the right, below and away from the camera respectively.

~~~~~ python
print(marker.cartesian.x, marker.cartesian.y, marker.cartesian.z)
~~~~~

[`Orientation`](#Orientation) {#Orientation}
---------------

<div class="info">
Orientation information is returned in different formats between the simulator and the physical robot kits.
One (possibly both) of them may change to resolve this.
</div>

An `Orientation` object describes the orientation of a marker.

rot_x
:   Rotation of the marker about the cartesian x-axis, in radians.

    Leaning a marker towards the camera increases the value of `rot_x`, while
    leaning it away from the camera decreases it. A value of π or -π indicates
    that the marker is upright.

rot_y
:   Rotation of the marker about the cartesian y-axis, in radians.

    Turning a marker clockwise (as viewed from above) decreases the value of
    `rot_y`, while turning it anticlockwise increases it. A value of 0 means
    that the marker is perpendicular to the line of sight of the camera.

rot_z
:   Rotation of the marker about the cartesian z-axis, in radians.

    Turning a marker anticlockwise (as viewed from the camera) increases the
    value of `rot_z`, while turning it clockwise decreases it. A value of π
    or -π indicates that the marker is upright.

roll
:   An alias for `rot_x`.

pitch
:   An alias for `rot_y`.

yaw
:   An alias for `rot_z`.

rotation_matrix
:   The rotation matrix represented by this orientation. A list of 3 lists, each with 3 items.

quaternion
:   The [Quarternion](https://kieranwynn.github.io/pyquaternion/#quaternion-features) instance represented by this orientation.

<a id="Spherical"/>

[`SphericalCoordinate`](#SphericalCoordinate) {#SphericalCoordinate}
---------------

The spherical coordinates system has three values to specify a specific point in space.

distance
:   The radial distance, the distance from the origin to the point, in millimetres.

theta
:   This is the angle from directly in front of the camera to the vector which
    points to the location in the horizontal plane. A positive value indicates a
    counter-clockwise rotation. Zero is at the centre of the image.

phi
:   The polar angle from the y-axis of the camera "down" to the vector which
    points to the location, in radians. Zero is directly upward.

Also available are two computed angles which express the same location slightly differently:

rot_x
:   Approximate rotation around the X-axis, in radians.
    This is the angle from the camera's horizontal plane to the vector which
    points to the location. Zero is at the centre of the image. Values increase
    towards the bottom of the image.

rot_y
:   Rotation around the Y-axis, in radians. This is similar to `theta`, however
    values increase towards the right of the image. Zero is at the centre of the image.

The camera is located at the origin, where the coordinates are (0, 0, 0).
