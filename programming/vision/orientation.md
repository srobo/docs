---
layout: page
title: Orientation
---

# Orientation

Orientation represents the rotation of a marker around its center.
The axis and rotations follow the [aircraft principal axis](https://en.wikipedia.org/wiki/Aircraft_principal_axes) as shown in the diagram below.

![Yaw Pitch Roll axis](https://upload.wikimedia.org/wikipedia/commons/c/c1/Yaw_Axis_Corrected.svg "Yaw Pitch Roll axis")

These properties can be accessed as follows:

yaw
:   A rotation about the vertical axis, in radians.
    Positive values indicate a rotation clockwise from the perspective of the marker.
    Zero values have the marker facing the camera square-on.

pitch
:   A rotation about the transverse axis, in radians.
    Positive values indicate a rotation upwards from the perspective of the marker.
    Zero values have the marker facing the camera square-on.

roll
:   A rotation about the longitudinal axis, in radians.
    Positive values indicate a rotation clockwise from the perspective of the marker.
    Zero values have the marker facing the camera square-on.

~~~~~ python
markers = robot.camera.see()

for marker in markers:
   print(marker.orientation.yaw)
   print(marker.orientation.pitch)
   print(marker.orientation.roll)
~~~~~


## Examples

The following images visually explains what positive and negative rotations represent.
The red arrow is not normally present on the marker but is used in these examples to indicate which way is up.

|Zero on all axis|
|---|
|![Orientation zero all axis]({{ site.baseurl }}/images/content/vision/orientation/all0.png "All axis zero")|

|       |&pi;/4 |-&pi;/4|
|-------|-------|-------|
|yaw    |![Yaw 45]({{ site.baseurl }}/images/content/vision/orientation/yaw45.png "Yaw 45")|![Yaw -45]({{ site.baseurl }}/images/content/vision/orientation/yaw-45.png "Yaw -45")|
|pitch  |![Pitch 45]({{ site.baseurl }}/images/content/vision/orientation/pitch45.png "Pitch 45")|![Yaw -45]({{ site.baseurl }}/images/content/vision/orientation/pitch-45.png "Pitch -45")|
|roll   |![Roll 45]({{ site.baseurl }}/images/content/vision/orientation/roll45.png "Yaw 45")|![Yaw -45]({{ site.baseurl }}/images/content/vision/orientation/roll-45.png "Roll -45")|
