---
redirect_from:
  - /simulator/programming/
layout: page
title: The Simulated Robot
---

The Simulated Robot
===================

There is a pre-built robot used in the simulator.
To allow this simulated robot to move around and sense its environment a set of motors and sensors have been connected as detailed below.

The simulator’s API is very similar to the real SR API described in the [programming docs]({{ site.baseurl }}/programming/).
The main differences are:

- the way that [time is handled]({{ site.baseurl }}/simulator/using_the_simulator#time),
- the simulated arduino only offering the plain SR Firmware interactions, and
- the simulated robot not having the Brain Board LEDs.

<div class="info">
  To more closely reflect reality, artificial noise has been added to simulated
  values such that sensors and actuators are not perfectly accurate, and may
  fluctuate slightly between measurements or operations.
</div>

## Motors

Your robot has one motor board attached, the left wheel is connected to the first port, and the right wheel to the second.

The motor board has the part code `srABC1`, since only a single motor board is attached it can be referenced as `robot.motor_board`.

## Servos

Your robot has one servo board attached, the jaws of the robot are controlled by a pair of servos:

| Servo | Location  |
|-------|-----------|
| 0     | Left Jaw  |
| 1     | Right Jaw |
| 2     | Lifter    |

Setting each servo to -1 fully opens the respective jaw, setting them to 1 fully opens them.

Setting the lifter to -1 fully lowers the lifter, setting it to 1 fully raises it.

The servo board has the part code `srXYZ2`, but since only a single servo board is attached it can be referenced as `robot.servo_board`.

## Arduino

Your robot has a microswitch and six distance sensors, attached to the digital and analog pins respectively. These are all attached to a single arduino.

The simulated arduino behaves like one with the ordinary SR Firmware and does not offer any of the extended or custom arduino behaviours.

Make sure you have set the correct [pin_mode]({{ site.baseurl }}/programming/arduino/sr_firmware#setting-pin-modes), depending on what device you're using.

### Microswitches

The rear of the robot has a wide microswitch.

The microswitch is attached to digital pin 2:

| Pin | Location | Required Mode |
|-----|----------|---------------|
| 2   | Back     | `INPUT`       |

This is shown as a red coloured block on the robot. Using the `digital_read`  method, you'll receive a `bool` telling you whether the switch is currently actuated.

### Distance Sensors

Analogous to ultrasound sensors, distance sensors allow you to retrieve the distance between your robot and an object. These are attached to analog pins A0-A5:

| Pin | Location    | Required Mode |
|-----|-------------|---------------|
| A0  | Front Left  | `INPUT`       |
| A1  | Front Right | `INPUT`       |
| A2  | Left        | `INPUT`       |
| A3  | Right       | `INPUT`       |
| A4  | Front       | `INPUT`       |
| A5  | Back        | `INPUT`       |

These are shown as blue boards with silver transceivers on the robot. The `analog_read` method will return the distance in metres. They can see in a narrow cone up to a maximum of about 2m away.
Since these sensors rely on echoes being reflected back from objects, if the angle of incidence between the sensor's pulse and the contacted surface exceeds 22.5 degrees then the sensor will be unable to detect the object.

### LEDs

The LEDs are attached to digital pins 3-4:

| Pin | Location      | Required Mode |
|-----|---------------|---------------|
| 3   | Red (lower)   | `OUTPUT`      |
| 4   | Green (upper) | `OUTPUT`      |

Using the `digital_write` method, you can set these to `True` (On) or `False` (Off).

## Vision

The simulated robot has a camera which provides position and orientation
information about other objects within the simulation. This simulates the
system of fiducial markers which the physical robot's camera can detect.

The simulated vision system matches the physical robot's
[vision API]({{ site.baseurl }}/programming/vision/), with small differences as
noted in the vision docs.
