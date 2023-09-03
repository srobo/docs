---
layout: page
title: Vision
---

# Vision

Your robot is able to use a webcam to detect [fiducial markers](https://en.wikipedia.org/wiki/Fiducial_marker).
Specifically it can detect [AprilTags](https://april.eecs.umich.edu/software/apriltag), using the `36H11` marker set.

Each marker is unique and encodes a number in a machine-readable way, which means that robots can identify these objects.

Using [Pose Estimation](https://en.wikipedia.org/wiki/3D_pose_estimation), it can calculate the orientation and position of the marker relative to the webcam.
Markers are attached to various items in the Student Robotics arena, in known locations.
Using the marker poses and their locations, we can either calculate the location of object relative to the robot or the position of the robot relative to the arena.

For information on markers, see the [markers page](./markers).


## Camera

The interface to the vision system is through the camera, accessible through `R.camera`.

see
:   Take a photo through the webcam, and return a list of [`Marker`](#marker) instances, each of which describes one of the markers that were found in the image.

Here's an example that will repeatedly print out the distance, in meters, to each marker that the robot can see:

~~~~~ python
from sr.robot3 import *
robot = Robot()

while True:
    markers = robot.camera.see()
    print("I can see", len(markers), "markers:")

    for marker in markers:
        print(" - Marker #{0} is {1} metres away".format(marker.id, marker.distance / 1000))
~~~~~

<div class="info">
Taking images while moving will cause them to be blurry, which will cause marker detection to fail.
Try pausing movement while taking an image.
</div>

save
:   Take a photo through the webcam, and save it to the provided location.

~~~~~ python
from sr.robot3 import *
robot = Robot()

# `robot.usbkey` is the path to your USB drive
robot.camera.save(robot.usbkey / "initial-view.png")
~~~~~

capture
:   Take a photo through the webcam, and return the image data as an OpenCV array.

~~~~~ python
import cv2
from sr.robot3 import *
robot = Robot()

frame = robot.camera.capture()

# Flip the image with OpenCV
flipped = cv2.flip(frame, 0)
~~~~~


### Frame argument

The slowest part of vision is capturing the image.
You can use a frame with the other vision commands to avoid recapturing.
This may be useful if you wish to use both your own vision algorithms and our marker detection on the same frames.

~~~~~ python
from sr.robot3 import *
robot = Robot()

# Capture an OpenCV frame
frame = robot.camera.capture()

# Run marker detection on the captured frame
markers = robot.camera.see(frame=frame)

# Save the frame with marker annotation
robot.camera.save("photo.jpg", frame=frame)

# Do some other vision algorithm with the OpenCV frame here
~~~~~


### Field of View

The Logitech C500 has a [field of view][fov] of 72&deg; and the C270 has a field of view of 60&deg;.

[fov]: https://en.wikipedia.org/wiki/Field_of_view

<div class="info">
Note that the axes are all defined relative to the camera.
Since we have no way to know how you've mounted your camera, you may need to account for that in your usage of the vision system's data.
</div>


## Marker

A `Marker` object contains information about a *detected* marker.
It has the following attributes:

id
:   The id of the marker.

size
:   The physical size of the marker, as the vision system expects it.

pixel_centre
:   A [`PixelCoordinates`](#pixelcoordinates) describing the position of the centre of the marker in the image.

pixel_corners
:   A list of 4 [`PixelCoordinates`](#pixelcoordinates) instances, each representing the position of a corner of the marker in the image.

position
:   A `Position` instance describing the position of the marker.
    See the [Position page](./position) for detailed definitions and diagrams.

    distance
    :   The distance between the camera and the centre of the marker, in millimetres.

    horizontal_angle
    :   Horizontal angle from the camera to the marker, in radians.
        Ranges -&pi; to &pi;.
        Positive to the right.
        Directly in front is 0.

    vertical_angle
    :   Vertical angle from the camera to the marker, in radians.
        Ranges -&pi; to &pi;.
        Positive values upwards.
        Directly in front is 0.

orientation
:   An `Orientation` instance describing the orientation of the marker.
    See the [Orientation page](./orientation) for detailed definitions and diagrams.

    yaw
    :   The Yaw of the marker, a rotation about the vertical axis, in radians.
        Positive values indicate a rotation clockwise from the perspective of the marker.
        Zero values have the marker facing the camera square-on.

    pitch
    :   The Pitch of the marker, a rotation about the transverse axis, in radians.
        Positive values indicate a rotation upwards from the perspective of the marker.
        Zero values have the marker facing the camera square-on.

    roll
    :   The Roll of the marker, a rotation about the longitudinal axis, in radians.
        Positive values indicate a rotation clockwise from the perspective of the marker.
        Zero values have the marker facing the camera square-on.


### PixelCoordinates

A named tuple of `x` and `y` coordinates for the point, in pixels relative to the top left of the image.

~~~~~ python
# Print the x and y coordinates of the pixel location
print(marker.pixel_centre.x, marker.pixel_centre.y)
~~~~~
