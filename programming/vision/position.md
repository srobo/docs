---
layout: page
title: Position
---

# Position

Position represents the location of a marker in 3D space, relative to the camera.

These properties can be accessed as follows:

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

~~~~~ python
markers = robot.camera.see()

for marker in markers:
   print(marker.position.distance)
   print(marker.position.horizontal_angle)
   print(marker.position.vertical_angle)
~~~~~


## Examples

|horizontal_angle|vertical_angle||
|-----|-----|---|
|0    |0    |![Position centre]({{ site.baseurl }}/images/content/vision/position/pos_centre.png "Position centre")|
|0    |0.12 |![Position up]({{ site.baseurl }}/images/content/vision/position/pos_up.png "Position up")|
|0.12 |0    |![Position right]({{ site.baseurl }}/images/content/vision/position/pos_right.png "Position right")|
|0    |-0.12|![Position down]({{ site.baseurl }}/images/content/vision/position/pos_down.png "Position down")|
|-0.12|0    |![Position left]({{ site.baseurl }}/images/content/vision/position/pos_left.png "Position left")|