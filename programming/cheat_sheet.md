---
redirect_from:
  - /programming/sr/cheat_sheet
layout: page
title: API Quick Reference
---

# SR API Quick Reference

This page contains a quick guide to the `sr.robot3` API.

For more information, make sure you check the rest of the documentation.

## Import the API

In order to use the `sr.robot3` API you first need to import it into your code:

~~~~~ python
from sr.robot3 import *
~~~~~

## Initialising your robot

### Standard Initialisation

~~~~~ python
robot = Robot()
~~~~~

### Initialisation without waiting for the start button

~~~~~ python
robot = Robot(wait_for_start=False)

# Code here runs before the start button is pressed

robot.wait_start() # wait for the start button
~~~~~

### Initialisation with extra logging

You can also tell the robot to print extra logging information, although this will create a lot of logs.

~~~~~ python
robot = Robot(debug=True)
~~~~~

## Selecting which board to control

If you only have one board of a given type plugged into your robot, then you can use its singular name:

~~~~~ python
robot.power_board
robot.motor_board
robot.servo_board
robot.arduino
~~~~~

If you have multiple boards of a given type plugged into your robot, you must index them by serial number:

~~~~~ python
robot.motor_boards["srABC1"]
robot.arduinos["1234567890"]
~~~~~

## Power Board

The outputs on the power board will turn on when you initialise your robot and turn off when your code ends.

### Turn on and off the power outputs

~~~~~ python
# Turn all of the outputs on
robot.power_board.outputs.power_on()

# Turn all of the outputs off
robot.power_board.outputs.power_off()

# Turn a single output on
robot.power_board.outputs[OUT_H0].is_enabled = True

# Turn a single output off
robot.power_board.outputs[OUT_H0].is_enabled = False
~~~~~

### Reading voltage and current

~~~~~ python
# Read the current of an individual output
current = robot.power_board.outputs[OUT_H0].current

# Read the current and voltage from the LiPo battery
voltage = robot.power_board.battery_sensor.voltage
current = robot.power_board.battery_sensor.current
~~~~~

### Buzzer

The power board has an on-board piezoelectric buzzer.

~~~~~ python
# Play a standard note C6 -> C8 included for 0.5s
robot.power_board.piezo.buzz(Note.C6, 0.5)

# Play a tone at 1047Hz for 1 second
robot.power_board.piezo.buzz(1047, 1)

# Play a tone at 500Hz tone for 2 seconds and wait for it to finish
robot.power_board.piezo.buzz(500, 2, blocking=True)
~~~~~

## Motors

### Powering Motors

You can set the power of each motor on the board between -1 and 1.

If you change the power of your motor too rapidly, the overcurrent protection may be triggered.

~~~~~ python
robot.motor_board.motors[0].power = 1
robot.motor_board.motors[1].power = -1
~~~~~

### Special motor values

Setting a motor to `BRAKE` is equivalent to power level `0`.

~~~~~ python
# This is the same operation
robot.motor_board.motors[0].power = BRAKE
robot.motor_board.motors[0].power = 0
~~~~~

`COAST` will stop applying power to the motors. This will mean they continue moving under the momentum they had before and slowly come to a stop.

~~~~~ python
robot.motor_board.motors[0].power = COAST
~~~~~

## Servos

You can set the position of each servo output on the board between -1 and 1.

~~~~~ python
robot.servo_board.servos[0].position = -1
robot.servo_board.servos[1].position = 1
~~~~~

You can also set the position to `0`, which is the approximate centre.

## Camera

### Taking a photo

It can sometimes be useful to save a photo of what markers the robot can see:

~~~~~ python
robot.camera.save("my-photo.jpg")  # Save my-photo.jpg to the USB drive
~~~~~

### Capturing an openCV array

Take a photo using the webcam, and return the image data as an OpenCV array:

~~~~~ python
frame = robot.camera.capture()
~~~~~

### Looking for markers

You can take a photo with the camera and search for markers:

~~~~~ python
markers = robot.camera.see()
~~~~~

There are various bits of information available about visible markers:

~~~~~ python
for marker in markers:

    marker.id  # The ID of the marker
    marker.size  # Physical size of the marker in mm.

    marker.pixel_centre  # The co-ordinates of the centre of the marker
    marker.pixel_corners  # A list of corners of the marker

    # Position of the marker
    marker.position.distance  # Distance away from the camera in mm
    marker.position.horizontal_angle  # angle to the marker in radians
    marker.position.vertical_angle  # angle to the marker in radians

    # Orientation of the marker
    marker.orientation.yaw
    marker.orientation.pitch
    marker.orientation.roll
~~~~~

## Arduino

### Setting the mode of a pin

~~~~~ python
robot.ruggeduino.pins[4].mode = OUTPUT
robot.ruggeduino.pins[4].mode = INPUT
robot.ruggeduino.pins[4].mode = INPUT_PULLUP
~~~~~

### Digital Write

You can set the output for a pin of the Arduino:

~~~~~ python
robot.ruggeduino.pins[2].mode = OUTPUT

robot.ruggeduino.pins[2].digital_write(True)
robot.ruggeduino.pins[2].digital_write(False)
~~~~~

### Digital Read

You can read a digital value from the pins of the Arduino:

~~~~~ python
robot.ruggeduino.pins[3].mode = INPUT
robot.ruggeduino.pins[5].mode = INPUT_PULLUP

value = robot.ruggeduino.pins[3].digital_read()
value = robot.ruggeduino.pins[5].digital_read()
~~~~~

### Analogue Read

You can read an analogue value from the analogue pins of the Arduino:

~~~~~ python
robot.ruggeduino.pins[A0].mode = INPUT

value = robot.ruggeduino.pins[A0].analogue_read()
~~~~~

## Metadata

The API also makes some information about where your code is running

### Starting zone for a match

~~~~~ python
zone = robot.zone  # -> 0, 1, 2, or 3
~~~~~

### Robot mode

This is set to `COMP` when your robot is in a match.

~~~~~ python
robot_mode = robot.mode # -> DEV or COMP
~~~~~

### USB stick path

This is the path to where your USB stick is mounted.

You can use this to save files and information to the drive.

~~~~~ python
usb_key_path = robot.usbkey
~~~~~

### Is simulated

A boolean value indicating whether or not the code is running in the simulator.
This value is True when in the simulator and False when on the robot.

~~~~~ python
value = robot.is_simulated
~~~~~
