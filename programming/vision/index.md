---
layout: page
title: Vision
---

# Vision

Your robot is able to use a webcam to detect [fiducial markers](https://en.wikipedia.org/wiki/Fiducial_marker) and return their locations relative to the robot.

Specifically it can detect [AprilTags](https://april.eecs.umich.edu/software/apriltag), using the `36H11` marker set.
Each of these markers acts like a QR-code, encoding a number in a machine-readable way so the robot can identify them.

Using [Pose Estimation](https://en.wikipedia.org/wiki/3D_pose_estimation), it can calculate the orientation and position of the marker relative to the webcam.
Markers are attached to various items in the Student Robotics arena, in known locations.
Using the marker's poses and their locations, we can either calculate the location of object relative to the robot or the position of the robot relative to the arena.

For information on markers, see the [markers page](./markers).

## Camera

The interface to the vision system is through the camera, accessible through `robot.camera`, there are three functions available on the camera object:

see
:   Take a photo using the webcam, and return a list of [`Marker`](#marker) instances, each of which describes one of the markers that were found in the image.

Here's an example that will repeatedly print out the distance, in meters, to each marker that the robot can see:

~~~~~ python
from sr.robot3 import *
robot = Robot()

while True:
    markers = robot.camera.see()
    print("I can see", len(markers), "markers:")

    for marker in markers:
        print("Marker #{0} is {1} metres away".format(
            marker.id,
            marker.position.distance / 1000,
        ))
~~~~~

<div class="info">
Taking images while moving will cause them to be blurry, which will cause marker detection to fail.
Try pausing movement while taking an image.
</div>

save
:   Take a photo using the webcam, draw a box around the detected markers and save it to the provided location.

~~~~~ python
from sr.robot3 import *
robot = Robot()

# `robot.usbkey` is the path to your USB drive
robot.camera.save(robot.usbkey / "initial-view.jpg")
~~~~~

capture
:   Take a photo using the webcam, and return the image data as an OpenCV array.

~~~~~ python
import cv2
from sr.robot3 import *
robot = Robot()

frame = robot.camera.capture()

# Do some other vision algorithm with the OpenCV frame here
~~~~~


### Frame argument

The slowest part of marker detection is capturing the image.
You can use the output of the `capture` method with the other vision commands to avoid recapturing.
This may be useful if you wish to use both your own vision algorithms and our marker detection on the same frames.

~~~~~ python
from sr.robot3 import *
robot = Robot()

# Capture an OpenCV frame
frame = robot.camera.capture()

# Run marker detection on the captured frame
markers = robot.camera.see(frame=frame)

# Save the frame with marker annotation
robot.camera.save(robot.usbkey / "photo.jpg", frame=frame)

# Do some other vision algorithm with the OpenCV frame here
~~~~~


## Marker

A `Marker` object contains information about a detected marker.
It has the following attributes:

id
:   The id of the marker.

size
:   The physical size of the marker in millimetres, as the vision system expects it.

pixel_centre
:   A [`PixelCoordinates`](#pixel-coordinates) object describing the position of the centre of the marker in the image.

pixel_corners
:   A list of 4 [`PixelCoordinates`](#pixel-coordinates) objects, each representing the position of a corner of the marker in the image.

position
:   A `Position` object describing the position of the marker.
    See the [Position page](./position) for detailed definitions and diagrams.

    distance
    :   The distance between the camera and the centre of the marker, in millimetres.

    horizontal_angle
    :   Horizontal angle from the centre of the camera's view to the marker, in radians.
        Ranges -&pi; to &pi;.
        Directly in front is zero, positive to the right.

    vertical_angle
    :   Vertical angle from the centre of the camera's view to the marker, in radians.
        Ranges -&pi; to &pi;.
        Directly in front is zero, positive values upwards.

orientation
:   An `Orientation` instance describing the orientation of the marker.
    See the [Orientation page](./orientation) for detailed definitions and diagrams.

    yaw
    :   The yaw of the marker, a rotation about the vertical axis, in radians.
        Positive values indicate a rotation clockwise from the perspective of the marker.
        Zero values have the marker facing the camera square-on.

    pitch
    :   The pitch of the marker, a rotation about the transverse axis, in radians.
        Positive values indicate a rotation upwards from the perspective of the marker.
        Zero values have the marker facing the camera square-on.

    roll
    :   The roll of the marker, a rotation about the longitudinal axis, in radians.
        Positive values indicate a rotation clockwise from the perspective of the marker.
        Zero values have the marker facing the camera square-on.


### Pixel Coordinates

A named tuple of `x` and `y` coordinates for the point, in pixels relative to the top left of the image.

~~~~~ python
# Print the x and y coordinates of the pixel location
print(marker.pixel_centre.x, marker.pixel_centre.y)
~~~~~
